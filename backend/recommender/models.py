from django.db import models
from django.conf import settings
from django.db import models
from django.contrib.postgres.fields import ArrayField

class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, 
                                on_delete=models.CASCADE, 
                                related_name='profile')
    age = models.IntegerField()
    gender = models.CharField(max_length=10)
    health_goals = ArrayField(models.CharField(max_length=50), default=list)
    dietary_restrictions = ArrayField(models.CharField(max_length=50), default=list)
    budget_min = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    budget_max = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    known_allergies = ArrayField(models.CharField(max_length=50), default=list, blank=True)
