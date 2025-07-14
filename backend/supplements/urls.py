from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter
from .views import SupplementViewSet

router = DefaultRouter()
router.register(r'supplements', SupplementViewSet)

urlpatterns = router.urls
app_name = "supplements"
