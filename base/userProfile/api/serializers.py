from rest_framework import serializers

from userProfile.models import User




class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for User model
    """
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email')
        write_only_fields = ('password',)
        read_only_fields = ('id', )
        
    def create(self, validated_data):
        user = User.objects.create(
            email = validated_data.get('email'),
            first_name = validated_data.get('first_name'),
            last_name = validated_data.get('last_name'),
            
        )
        user.set_password(validated_data.get('password'))
        user.save()
        
        return user