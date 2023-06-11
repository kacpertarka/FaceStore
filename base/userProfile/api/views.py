from rest_framework import viewsets

from .serializers import UserSerializer
from userProfile.models import User


class UsersViewSet(viewsets.ModelViewSet):
    """
    Temporary ViewSet with all users
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer