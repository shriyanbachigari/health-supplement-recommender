from django.urls import path
from .views import RecommendAPIView, OnboardAPIView, UserProfileAPIView, UserRegimenView, UserRegimenDeleteView

urlpatterns = [
    path('onboard/', OnboardAPIView.as_view(), name='onboard'),
    path('recommend/', RecommendAPIView.as_view(), name='recommend'),
    path('profile/', UserProfileAPIView.as_view(), name='profile'),
    path('regimen/', UserRegimenView.as_view(), name='regimen'),
    path('regimen/<int:pk>/', UserRegimenDeleteView.as_view(), name='regimen-delete'),
]


app_name = "recommender"

