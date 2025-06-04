# payments/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PaymentViewSet, home
from payments.views import PaymentViewSet, home


router = DefaultRouter()
router.register(r'payments', PaymentViewSet, basename='payment')

#urlpatterns = [
  #  path('admin/', admin.site.urls),
   # path('api/', include(router.urls)),
    #path('', home),  # default home page
#]

urlpatterns = [
    path('', include(router.urls)),
]
