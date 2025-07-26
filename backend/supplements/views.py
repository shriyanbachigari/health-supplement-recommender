from rest_framework import viewsets, filters
from .models import Supplement
from .serializers import SupplementSerializer
from rest_framework.permissions import IsAuthenticated

class SupplementViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Supplement.objects.all()
    serializer_class = SupplementSerializer


    filter_backends  = [filters.SearchFilter, filters.OrderingFilter]
    search_fields    = ['title', 'brand', 'category']
    ordering_fields  = ['price', 'avg_rating']
