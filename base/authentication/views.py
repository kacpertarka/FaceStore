from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.generics import UpdateAPIView

from user_profile.models import Profile
from .models import User
from .serializers import (
    UserRegisterSerializer, CustomTokenObtainPairSerializer, 
    ActivateAccountSerializer, RefreshActivateCodeSerializer    
    )
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
        
        serializer.save() # create function from serializer
        
        return Response(serializer.data)
    
    
class ActivateAccountView(APIView):
    """
    Activate account
    """
    serializer_class = ActivateAccountSerializer
    
    def post(self, request, activation_token):
        """
        Activate user
        """        
        try:
            profile = Profile.objects.get(activate_code=activation_token)
        except Profile.DoesNotExist:
            return Response({'message': 'Error, user does not found'}, status=400)
        
        user = profile.user
        
        serializer = self.serializer_class(user,  request.data)
        if serializer.is_valid():
            serializer.update(instance=user, data=None)
            return Response(serializer.data)
        
        return Response({'message': 'Error, active code is incorrect'}, status=400)
    
class RefreshActivateCodeView(APIView):
    """
    Regenerate code for user 
    """    
    serializer_class = RefreshActivateCodeSerializer
    
    def patch(self, request, email):
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'message': 'Error, user does not found'}, status=400)
        
        profile = user.profile
        serializer = self.serializer_class(data=request.data)
        print("SERIALIZER: ",serializer)
        print("IS_VALID: ", serializer.is_valid())
        if not serializer.is_valid():
            serializer.update(profile, request.data)
            return Response(serializer.data)
        return Response({'message': 'Error, new activate code generation failed'}, status=400)
    
