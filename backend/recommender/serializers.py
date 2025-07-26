from rest_framework import serializers
from .models import UserProfile, HEALTH_GOAL_CHOICES, MICRONUTRIENT_CHOICES, DIETARY_RESTRICTION_CHOICES

class UserProfileSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )
    health_goals = serializers.ListField(
        child=serializers.ChoiceField(choices=HEALTH_GOAL_CHOICES),
        allow_empty=True
    )
    micronutrient_interests = serializers.ListField(
        child=serializers.ChoiceField(choices=MICRONUTRIENT_CHOICES),
        allow_empty=True
    )
    dietary_restrictions = serializers.ListField(
        child=serializers.ChoiceField(choices=DIETARY_RESTRICTION_CHOICES),
        allow_empty=True,
        required=False
    )
    known_allergies = serializers.ListField(
        child=serializers.CharField(max_length=50),
        allow_empty=True,
        required=False
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
