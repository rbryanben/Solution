from django.urls import path
from . import views

urlpatterns = [
    path('v1/health/', views.health),
    path('v1/employee/',views.employee),
    path('v1/uploads/csv/',views.employeesCSV)
]
