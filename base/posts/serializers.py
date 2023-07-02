from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Post

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name')


class PostSerializer(serializers.ModelSerializer):
    likes = UserSerializer(many=True, read_only=True)
    # author = UserSerializer(many=False, read_only=False)
    author = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = ('id', 'body', 'likes', 'author', 'likes_count', 'is_liked')
        
    def create(self, validated_data):
        user = self.context["request"].user
        post = Post.objects.create(author=user, **validated_data)
        return post
        
    def get_author(self, obj):
        return obj.author.first_name + ' ' + obj.author.last_name
    
    def get_likes_count(self, obj):
        return len(obj.likes.all())
    
    def get_is_liked(self, obj):
        user = self.context['request'].user  # get user
        return True if user in obj.likes.all() else False
    