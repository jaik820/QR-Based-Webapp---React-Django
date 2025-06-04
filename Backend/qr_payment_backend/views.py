# qr_payment_backend/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def create_payment(request):
    if request.method == "POST":
        data = json.loads(request.body)
        merchant_name = data.get('merchant_name', '')
        amount = data.get('amount', 0)
        # In real app: create a Payment object in the DB
        return JsonResponse({"status": "success", "merchant_name": merchant_name, "amount": amount})
    return JsonResponse({"error": "Invalid request"}, status=400)
