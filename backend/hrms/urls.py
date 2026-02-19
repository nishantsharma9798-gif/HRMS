from rest_framework.routers import DefaultRouter
from .views import AttendanceViewSet, EmployeeViewSet

router = DefaultRouter()
router.register(r'employees', EmployeeViewSet, basename='employee')
router.register(r'attendance', AttendanceViewSet, basename='attendance')

urlpatterns = router.urls
