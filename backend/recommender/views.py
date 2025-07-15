from rest_framework.views import APIView
from rest_framework.response import Response
from supplements.models import Supplement
from supplements.serializers import SupplementSerializer

class RecommendAPIView(APIView):
    def get(self, request):
        # read ?n= from the URL, default to 5
        try:
            n = int(request.GET.get('n', 5))
        except ValueError:
            n = 5

        # simple “recommendation”: highest-rated n supplements
        top_n = Supplement.objects.order_by('-avg_rating')[:n]
        data  = SupplementSerializer(top_n, many=True).data
        return Response({'recommendations': data})
