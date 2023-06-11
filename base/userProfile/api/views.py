from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

from .serializers import UserSerializer
from userProfile.models import User


class UsersViewSet(viewsets.ModelViewSet):
    """
    Temporary ViewSet with all users
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def create(self, request):
        """
        Create new user
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        serializer.save()
        return Response(serializer.data)
    