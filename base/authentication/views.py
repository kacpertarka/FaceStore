from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet 
from rest_framework.response import Response

from .models import User
from .serializers import UserRegisterSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
# Create your views here.


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class UserRegisterViewSets(ModelViewSet):
    """
    Views for User model - change to RegistrationSerializer?
    """
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    
    def create(self, request):
        """
        Create new user
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        serializer.save()
        
        return Response(serializer.data)
    