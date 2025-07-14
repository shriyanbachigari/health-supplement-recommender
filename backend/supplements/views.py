from rest_framework import viewsets, filters
from .models import Supplement
from .serializers import SupplementSerializer

class SupplementViewSet(viewsets.ModelViewSet):
    queryset = Supplement.objects.all()
    serializer_class = SupplementSerializer


    filter_backends  = [filters.SearchFilter, filters.OrderingFilter]
    search_fields    = ['title', 'brand', 'category']
    ordering_fields  = ['price', 'avg_rating']
