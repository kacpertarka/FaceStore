from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer
import jwt

User = get_user_model()

# Create your views here.
class PostViewset(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
    @action(methods=['POST'], detail=True) # detail - ze konkretny obiekt, akcja dla konkretnego endpointa
    def like_post(self, request, pk):
        post = self.get_object()
        print(post)
        # add logic later

    def get(self):
        posts = self.queryset
        serializer = self.serializer_class(posts, many=True)
        
        data = serializer.serialize()
        
        return Response(data)
    
    def create(self, request):
        # token = request.headers.get('Authorization')
        data = request.data
        serializer = self.get_serializer(data=data)  
        serializer.is_valid(raise_exception=True)
        
        
        serializer.save()
        
        return Response({"message": "post added"}, status=status.HTTP_201_CREATED)
        