from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )
    class Meta:
        model  = UserProfile
        fields = [
            'user',
            'age',
            'gender',
            'health_goals',
            'dietary_restrictions',
            'budget_min',
            'budget_max',
            'known_allergies',
            'micronutrient_interests',
        ]
