from django.contrib import admin
from .models import Payment

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('id', 'merchant_name', 'amount', 'status')
    search_fields = ('merchant_name', 'id')
