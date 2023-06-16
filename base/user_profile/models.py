from django.db import models

from django.contrib.auth import get_user_model

import time
import threading
# Create your models here.

User = get_user_model()

class Profile(models.Model):
    
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    birth_date = models.DateField(blank=True, null=True)
    
    activate_code = models.CharField(max_length=6, blank=True, null=True)
    
    """
    images
    prifile_image
    .
    .
    .
    """
    def __str__(self):
        return str(self.user)
    
    def null_activate_code(self, time_to_sleep: int):
        """
        Sleep 5 minutes - then check if user.is_active equals True and nullable activate_code field
        
        time: int - minute
        
        ewxpfqsedcijuxxi
        """
        print('ZACZYNAM ODLICZANIE')
        time_to_sleep = 60 * time_to_sleep
        time.sleep(time_to_sleep)
        
        self.activate_code = None
        self.save()
        print('SKONCZYLEM - CODE WYZEROWANY')
    
    
    
    