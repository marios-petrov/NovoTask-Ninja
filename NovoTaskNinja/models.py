from django.db import models
from django import forms
from .models import *

class Meta:
    ordering = ['name']

class Task(models.Model):

    name = models.CharField(max_length=200)
    id = models.AutoField(primary_key=True)
    completed = models.BooleanField(default=False)
    # everytime an item is created, it will be automatically added
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
class TodoItem(models.Model):
    description = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.description

class InProgressCourse(models.Model):
    name = models.CharField(max_length=100)
    date_added = models.DateTimeField(auto_now_add=True)
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)
    days_of_week = models.CharField(max_length=5, null=True, blank=True)  # e.g. 'MWF' for Monday, Wednesday, Friday

    def __str__(self):
        return f"{self.name} ({self.days_of_week} {self.start_time}-{self.end_time})"

class CompletedCourse(models.Model):

    name = models.CharField(max_length=100)
    date_completed = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class CYCRequirement(models.Model):
    name = models.CharField(max_length=200)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return self.name
    
class foodDay(models.Model):
    """
    Worked on by Andy Trinh.
    This is just basically the same as the CYCrequirements model. 
    It makes a day for the days in the week, and you can mark it lethal or nonlethal.
    
    Attributes:
    name : string
        the name of the day
    is_lethal : boolean
        whether the day is lethal or not

    Methods:
    __str__ (self):
        returns the name of the day
    """
    name = models.CharField(max_length=9)
    is_lethal = models.BooleanField(default=False)

    def __str__(self):
        return self.name

