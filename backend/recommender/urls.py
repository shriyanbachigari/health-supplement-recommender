from django.urls import path
from .views import RecommendAPIView
from .views import OnboardAPIView

urlpatterns = [
    path('onboard/', OnboardAPIView.as_view(), name='onboard'),
    path('recommend/', RecommendAPIView.as_view(), name='recommend'),
]


app_name = "recommender"

