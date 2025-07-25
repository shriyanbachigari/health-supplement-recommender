from django.urls import path
from .views import RecommendAPIView
from .views import OnboardAPIView
from .views import UserProfileAPIView

urlpatterns = [
    path('onboard/', OnboardAPIView.as_view(), name='onboard'),
    path('recommend/', RecommendAPIView.as_view(), name='recommend'),
    path('profile/', UserProfileAPIView.as_view(), name='profile'),
]


app_name = "recommender"

