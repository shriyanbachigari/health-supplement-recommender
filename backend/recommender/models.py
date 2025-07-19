from django.db import models
from django.conf import settings
from django.db import models
from django.contrib.postgres.fields import ArrayField

MICRONUTRIENT_CHOICES = [
    ('',           'None'),
    ('vitamin a',  'Vitamin A'),
    ('vitamin b1', 'Vitamin B1'),
    ('vitamin b6', 'Vitamin B6'),
    ('vitamin b12','Vitamin B12'),
    ('vitamin c',  'Vitamin C'),
    ('vitamin d',  'Vitamin D'),
    ('vitamin e',  'Vitamin E'),
    ('vitamin k',  'Vitamin K'),
    ('calcium',    'Calcium'),
    ('zinc',       'Zinc'),
    ('iron',       'Iron'),
    ('magnesium',  'Magnesium'),
    ('potassium',  'Potassium'),
    ('omega 3',    'Omega 3'),
    ('prebiotic',  'Prebiotic'),
    ('probiotic',  'Probiotic'),
    ('fiber',      'Fiber'),
    ('collagen',   'Collagen'),
    ('creatine',   'Creatine'),
]

HEALTH_GOAL_CHOICES = [
    ('immunity',       'Immunity'),
    ('muscle',         'Muscle Building'),
    ('bone',          'Bone Health'),
    ('heart',         'Heart Health'),
    ('skin',          'Skin Health'),
    ('sleep',        'Sleep Support'),
]

class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, 
                                on_delete=models.CASCADE, 
                                related_name='profile')
    age = models.IntegerField()
    gender = models.CharField(max_length=10)
    health_goals = ArrayField(
                                   models.CharField(
                                     max_length=50,
                                     choices=HEALTH_GOAL_CHOICES
                                   ),
                                   default=list,
                                   blank=True,
                                   help_text="Select one or more health goals"
                               )
    dietary_restrictions = ArrayField(models.CharField(max_length=50), default=list)
    budget_min = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    budget_max = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    known_allergies = ArrayField(models.CharField(max_length=50), default=list, blank=True)
    micronutrient_interests = ArrayField(
    models.CharField(max_length=20, choices=MICRONUTRIENT_CHOICES),
        default=list,
        blank=True,
        help_text="Select one or more micronutrients to prioritize"
    )
