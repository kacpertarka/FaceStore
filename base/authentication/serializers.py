from rest_framework import serializers, status
from rest_framework.response import Response
from django.contrib.auth.hashers import  make_password
from django.db import IntegrityError
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Serializers for login and getting token
    """
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['email'] = user.email
        return token
    

class UserRegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for User model
    """
    password = serializers.CharField(write_only=True)
    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'password', 'first_name', 'last_name')
        
    def create(self, data):
        try:
            user = self.Meta.model.objects.create(
                email = data.get('email'),
                first_name = data.get('first_name'),
                last_name = data.get('last_name')
            )
            password = data.get('password')
            user.set_password(password)
            
            user.save()
            return user
        except IntegrityError:
            return Response({'message': 'Email is already taken'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response({'message': 'An error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    