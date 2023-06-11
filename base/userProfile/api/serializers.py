from rest_framework import serializers

from userProfile.models import User




class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for User model
    """
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email')