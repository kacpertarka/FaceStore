from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import (
    UserRegisterViewSets, CustomTokenObtainPairView, 
    ActivateAccountView, RefreshActivateCodeView
)


router = DefaultRouter()
router.register(r'user', UserRegisterViewSets, basename='user')


urlpatterns = [
    path('', include(router.urls)),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/activate/<activation_token>/', ActivateAccountView.as_view(), name='activate-user'),
    path('user/activate/refresh/<str:email>/', RefreshActivateCodeView.as_view(), name='refresh-activate-code'),
]