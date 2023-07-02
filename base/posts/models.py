from django.db import models

from django.contrib.auth import get_user_model
# Create your models here.
User = get_user_model()

class Post(models.Model):
    """
    Post class
    """
    body = models.TextField()
    likes = models.ManyToManyField(User, blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='author')
    
    def __str__(self):
        return str(self.author) + ' - ' + self.body[:5]
