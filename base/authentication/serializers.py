import threading
from smtplib import SMTPException
from rest_framework import serializers, status
from rest_framework.response import Response
from django.db import IntegrityError
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from user_profile.models import Profile
from authentication.utils import send_activate_code, gen_activate_code

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
    activate_code = serializers.CharField(default=None)
    class Meta:
        model = User
        fields = ('email', 'password', 'first_name', 'last_name', 'activate_code')
        
    def create(self, data):
        try:
            user = User(
                email = data.get('email'),
                first_name = data.get('first_name'),
                last_name = data.get('last_name')
            )
            password = data.get('password')
            user.set_password(password)
            user.is_active = False
            user.save()
            code = gen_activate_code()
            
            data['activate_code'] = code
            
            profile = Profile(user=user)
            profile.activate_code = code
            profile.save()
            
            # sendEmail
            try:
                send_activate_code(user, code)
            except SMTPException:
                print(SMTPException)
                # TODO 
            ### TODO wywołaj wywołaj funckje do usuwania tokenu
            thred_to_nullable_code = threading.Thread(target=profile.null_activate_code, args=[5,])
            thred_to_nullable_code.start()
            return data
        
        ##### TODO --- nie mozna zwracac Response ---- popraw
        except:
            raise serializers.ValidationError("User has not been created.")
        

class ActivateAccountSerializer(serializers.Serializer):
    """
    Serializer for activate account - change is_active field
    """
    activate_code = serializers.CharField(write_only=True)
    email = serializers.CharField()
        
    def update(self, instance, data):  
        """Chang is_active field to True"""
        instance.is_active = True
        instance.save()
        return instance
    
    def validate_activate_code(self, value):
        """Validate activate code"""
        user_email = self.initial_data['email']
        user = User.objects.get(email=user_email)
        profile = user.profile
        if not profile.activate_code == value:
            raise serializers.ValidationError()
        return value
        


class RefreshActivateCodeSerializer(serializers.ModelSerializer):
    """
    
    """
    class Meta: 
        model = User
        fields = ('email',)
    
    def update(self, instance, data):
        """
        Refresh activate code - generate new, send mail
        """
        code = gen_activate_code()
        
        instance.activate_code = code
        user = instance.user
        try:
            send_activate_code(user, code)
        except SMTPException:
            raise serializers.ValidationError(SMTPException)
        instance.save()
        thred_to_nullable_code = threading.Thread(target=instance.null_activate_code, args=[1,])
        thred_to_nullable_code.start()
        return instance
    
