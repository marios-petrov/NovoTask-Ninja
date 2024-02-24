from django.db import models
from django import forms
from .models import *

class Meta:
    ordering = ['name']

class Task(models.Model):
    """
        Represents a task in the application.

        Attributes:
            name (models.CharField): The name of the task, with a maximum length of 200 characters.
            id (models.AutoField): The primary key for the Task model, automatically incremented.
            completed (models.BooleanField): Indicates whether the task is completed, defaults to False.
            created_at (models.DateTimeField): The date and time when the task was created, automatically set to the current timestamp on creation.

        Methods:
            __str__(self): Returns the name of the task as its string representation.
    """
    name = models.CharField(max_length=200)
    id = models.AutoField(primary_key=True)
    completed = models.BooleanField(default=False)
    # everytime an item is created, it will be automatically added
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
class TodoItem(models.Model):
    """
        Represents a todo item in the application.

        Attributes:
            description (models.CharField): The description of the todo item, with a maximum length of 255 characters.
            completed (models.BooleanField): Indicates whether the todo item is completed, defaults to False.
            created_at (models.DateTimeField): The date and time when the todo item was created, automatically set to the current timestamp on creation.

        Methods:
            __str__(self): Returns the description of the todo item as its string representation.
    """
    description = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.description

class InProgressCourse(models.Model):
    """
        Represents a course that is currently in progress.

        Attributes:
            name (models.CharField): The name of the course, with a maximum length of 100 characters.
            date_added (models.DateTimeField): The date and time when the course was added, automatically set to the current timestamp on creation.
            start_time (models.TimeField): The start time of the course. Optional; can be null.
            end_time (models.TimeField): The end time of the course. Optional; can be null.
            days_of_week (models.CharField): Abbreviated days of the week when the course takes place (e.g., 'MWF' for Monday, Wednesday, Friday). Optional; can be null.

        Methods:
            __str__(self): Returns a string representation of the course, including its name, days of the week, and start-end times.
    """
    name = models.CharField(max_length=100)
    date_added = models.DateTimeField(auto_now_add=True)
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)
    days_of_week = models.CharField(max_length=5, null=True, blank=True)  # e.g. 'MWF' for Monday, Wednesday, Friday

    def __str__(self):
        return f"{self.name} ({self.days_of_week} {self.start_time}-{self.end_time})"

class CompletedCourse(models.Model):
    """
        Represents a course that has been completed.

        Attributes:
            name (models.CharField): The name of the completed course, with a maximum length of 100 characters.
            date_completed (models.DateTimeField): The date and time when the course was marked as completed, automatically set to the current timestamp on creation.

        Methods:
            __str__(self): Returns the name of the completed course as its string representation.
    """
    name = models.CharField(max_length=100)
    date_completed = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class CYCRequirement(models.Model):
    """
        Represents a Complete Your Course (CYC) requirement.

        Attributes:
            name (models.CharField): The name of the CYC requirement, with a maximum length of 200 characters.
            is_completed (models.BooleanField): Indicates whether the CYC requirement is completed, defaults to False.

        Methods:
            __str__(self): Returns the name of the CYC requirement as its string representation.
    """
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

