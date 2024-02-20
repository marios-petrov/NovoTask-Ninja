from django.urls import path
from . import views

urlpatterns = [
    # Backend-Heavy Pages
    path('todo/', views.todo, name='todo'),
    path('cycreq/', views.cycreq, name='cycreq'),

    # Frontend-Heavy Pages
    path('home/', views.home, name='home'),
    path('timer/', views.timer, name='timer'),
    path('ncfhours/', views.ncfhours, name='ncfhours'),
    path('surprise/', views.surprise, name='surprise'),
]

