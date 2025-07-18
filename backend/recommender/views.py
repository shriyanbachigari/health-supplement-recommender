from rest_framework.views import APIView
from rest_framework.response import Response
from supplements.models import Supplement
from supplements.serializers import SupplementSerializer
from .serializers import UserProfileSerializer
from rest_framework.permissions import IsAuthenticated

class RecommendAPIView(APIView):
    def get(self, request):
        # read ?n= from the URL, default to 5
        profile = request.user.profile
        qs = Supplement.objects.all()
        for dr in profile.dietary_restrictions:
            qs = qs.filter(metadata__suitable_for__contains=[dr])
        
        if profile.budget_min is not None:
            qs = qs.filter(price__gte=profile.budget_min)
        if profile.budget_max is not None:
            qs = qs.filter(price__lte=profile.budget_max)
            
        
        
        '''try:
            n = int(request.GET.get('n', 5))
        except ValueError:
            n = 5

        # simple “recommendation”: highest-rated n supplements
        top_n = Supplement.objects.order_by('-avg_rating')[:n]
        data  = SupplementSerializer(top_n, many=True).data
        return Response({'recommendations': data})
        '''
class OnboardAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = UserProfileSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        profile = serializer.save()
        return Response(serializer.data, status=201)