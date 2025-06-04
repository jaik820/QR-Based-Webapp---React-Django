# payments/views.py
import json
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.http import JsonResponse, HttpResponse
from .models import Payment
from .serializers import PaymentSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

def home(request):
    return HttpResponse("Hello! Django is working fine.")

@method_decorator(csrf_exempt, name='dispatch')
class PaymentViewSet(viewsets.ModelViewSet):
    """
    ViewSet to handle Payment-related operations:
    - create (POST /payments/) → Create payment link
    - retrieve (GET /payments/{id}/) → Get payment status
    - partial_update (PATCH /payments/{id}/) → Proceed payment
    """
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    lookup_field = 'id'  # Use UUID

    def create(self, request, *args, **kwargs):
        # Create payment link
        return super().create(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        # Get payment status
        return super().retrieve(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        # Proceed payment logic
        payment = self.get_object()
        if payment.status != 'pending':
            return Response({'message': 'Payment already processed!'}, status=status.HTTP_400_BAD_REQUEST)
        payment.status = 'completed'
        payment.save()
        return Response({'message': 'Payment successful!'}, status=status.HTTP_200_OK)

@csrf_exempt
def create_payment(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            merchant_name = data.get('merchant_name', '')
            amount = data.get('amount', 0)

               # Save to DB!
            payment = Payment.objects.create(
            merchant_name=merchant_name,
            amount=amount,
            status='pending'  # or your default status
            )

            return JsonResponse({"status": "success", "id": str(payment.id), "merchant_name": merchant_name, "amount": amount})
        except Exception as e:
            return JsonResponse({"error": f"Failed to create payment: {str(e)}"}, status=500)

    return JsonResponse({"error": "Invalid request"}, status=400)
