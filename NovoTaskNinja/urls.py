from django.urls import path
from . import views

urlpatterns = [

    # Backend-Heavy Pages
    path('todo/', views.todo, name='todo'),
    path("bilgestodo/", views.bilgestodo, name='bilgestodo'),
    path('cycreq/', views.cycreq, name='cycreq'),
    path('dontkillmefood/', views.dontkillmefood, name='dontkillmefood'),

    # Frontend-Heavy Pages
    path('', views.calendar, name='calendar'),
    path('timer/', views.timer, name='timer'),
    path('ncfhours/', views.ncfhours, name='ncfhours'),
    path('surprise/', views.surprise, name='surprise'),

]

