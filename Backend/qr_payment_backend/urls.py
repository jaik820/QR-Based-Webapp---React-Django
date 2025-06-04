from django.contrib import admin
from django.urls import path, include
from payments.views import home
from django.http import HttpResponse


def home(request):
    return HttpResponse("Hello! Django is working fine.")



#urlpatterns = [
 #   path('admin/', admin.site.urls),
  #  path('', home, name='home'),
   # path('api/payments/', include('payments.urls')),
    #path('api/payments/create/', create_payment, name='create_payment'),
#]



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('payments.urls')),  # payments app API
    path('', home),  # home page
]