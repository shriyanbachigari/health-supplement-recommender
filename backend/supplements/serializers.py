from rest_framework import serializers
from .models import Supplement

class SupplementSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Supplement
        fields = '__all__'
