from rest_framework.views import APIView
from rest_framework.response import Response
from supplements.models import Supplement
from supplements.serializers import SupplementSerializer
from .serializers import UserProfileSerializer
from rest_framework.permissions import IsAuthenticated
from .models import UserProfile
from rest_framework.status import HTTP_201_CREATED, HTTP_200_OK
from django.db.models import Q
import math
from rest_framework.generics import RetrieveAPIView
from django.http import Http404

class RecommendAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        # read ?n= from the URL, default to 5
        profile = request.user.profile
        qs = Supplement.objects.all()
        for dr in profile.dietary_restrictions:
            qs = qs.filter(metadata__suitable_for__contains=[dr])
        #budget filters
        if profile.budget_min is not None:
            qs = qs.filter(price__gte=profile.budget_min)
        if profile.budget_max is not None:
            qs = qs.filter(price__lte=profile.budget_max)
        

        for allergen in profile.known_allergies:
            term = allergen.lower()
            qs = qs.exclude(
                Q(title__icontains=term) |
                Q(highlights__icontains=term)
            )
        
        selected_micro = profile.micronutrient_interests or []
        selected_goals = profile.health_goals or []
        MAX_RATING = 5.0

        candidates = []
        for s in qs:
            text = f"{s.category} {s.title} {s.highlights}".lower().replace('-', ' ')

            micro_matches = sum(1 for m in selected_micro if m in text)
            micro_score   = micro_matches / len(selected_micro) if selected_micro else 0.0
        
            goal_matches = sum(
                    1 for g in selected_goals
                    if g in text
                )
            goal_score = goal_matches / len(selected_goals) if selected_goals else 0.0

            rating_score = float(s.avg_rating or 0) / MAX_RATING
            #used log to normalize and remove skewness
            rcount_score = math.log(s.rating_count + 1) / math.log(197945 + 1) if s.rating_count else 0.0

            score = (3.5 * micro_score) + (2 * goal_score) + (1 * rating_score) + (1 * rcount_score)

            candidates.append((s, score))

        
            
        n = int(request.GET.get('n', 5))
        top_n = sorted(candidates, key=lambda x: x[1], reverse=True)[:n]
        recommendations = []
        for supp, sc in top_n:
            recommendations.append({
                'id':           supp.id,
                'title':        supp.title,
                'brand':        supp.brand,
                'category':     supp.category,
                'price':        supp.price,
                'avg_rating':   supp.avg_rating,
                'rating_count': supp.rating_count,
                'product_url':  supp.product_url,
                'highlights':   supp.highlights,
                'score':        round(sc, 2),
            })

        return Response({
            'recommendations': recommendations,
        })
    
class OnboardAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        
        try:
            profile = UserProfile.objects.get(user=request.user)
            created = False
            serializer = UserProfileSerializer(
                profile,
                data=request.data,
                context={'request': request}
            )
        except UserProfile.DoesNotExist:
            created = True
            serializer = UserProfileSerializer(
                data=request.data,
                context={'request': request}
            )
        
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            serializer.data,
            status=HTTP_201_CREATED if created else HTTP_200_OK
        )

class UserProfileAPIView(RetrieveAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # simply return the profile for the logged‑in user
        try:
            return self.request.user.profile
        except UserProfile.DoesNotExist:
            raise Http404("Profile not found")
    
    def retrieve(self, request, *args, **kwargs):
        # Get the standard profile response
        response = super().retrieve(request, *args, **kwargs)
        
        # Add user information to the response
        response.data['user'] = {
            'username': request.user.username,
            'email': request.user.email,
            'first_name': request.user.first_name,
            'last_name': request.user.last_name,
        }
        
        return response