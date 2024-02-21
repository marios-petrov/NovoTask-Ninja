from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.shortcuts import get_object_or_404
from django.utils.dateparse import parse_time
from django.views.decorators.http import require_http_methods
from .models import *
# Create your views here.

def calendar(request):
    return render(request, './NovoTaskNinja/calendar.html')

def ncfhours(request):
    return render(request, './NovoTaskNinja/ncfhours.html')

def timer(request):
    return render(request, './NovoTaskNinja/timer.html')

def surprise(request):
    return render(request, './NovoTaskNinja/surprise.html')

@require_http_methods(["GET", "POST"])
def cycreq(request):
    # Handling CYC requirements
    if request.method == "POST":
        action = request.POST.get('action')

        if action == 'add_in_progress':
            # Capture the additional time and days fields
            course_name = request.POST.get('course_name', '')
            start_time = request.POST.get('start_time', None)
            end_time = request.POST.get('end_time', None)
            days_of_week = request.POST.get('days_of_week', None)

            # If start_time or end_time is not None, parse it to a time object
            if start_time:
                start_time = parse_time(start_time)
            if end_time:
                end_time = parse_time(end_time)
            InProgressCourse.objects.create(
                name=course_name,
                start_time=start_time,
                end_time=end_time,
                days_of_week=days_of_week
            )
        elif action == 'add_completed':
            course_name = request.POST.get('course_name', '')
            CompletedCourse.objects.create(name=course_name)
        elif action == 'mark_as_completed':
            course_id = request.POST.get('course_id', '')
            if course_id:
                course = InProgressCourse.objects.get(id=course_id)
                CompletedCourse.objects.create(name=course.name)
                course.delete()
        elif action == 'remove_course':
            course_id = request.POST.get('course_id', '')
            course_type = request.POST.get('course_type', '')
            if course_type == 'in_progress':
                InProgressCourse.objects.filter(id=course_id).delete()
            elif course_type == 'completed':
                CompletedCourse.objects.filter(id=course_id).delete()
        elif 'toggle_cyc_requirement' in request.POST:
            requirement_id = request.POST.get('requirement_id', '')
            requirement = CYCRequirement.objects.get(id=requirement_id)
            requirement.is_completed = not requirement.is_completed
            requirement.save()
        return redirect('cycreq')

    # Querysets for the context
    in_progress_courses = InProgressCourse.objects.all()
    completed_courses = CompletedCourse.objects.all()
    cyc_requirements = CYCRequirement.objects.all()

    context = {
        'in_progress_courses': in_progress_courses,
        'completed_courses': completed_courses,
        'cyc_requirements': cyc_requirements
    }
    return render(request, 'NovoTaskNinja/cycreq.html', context)

@require_http_methods(["GET", "POST"])
def dontkillmefood(request):
    # Handling food status, ripped from CYC
    if request.method == "POST":
        action = request.POST.get('action')
        if 'toggle_foodstatus' in request.POST:
            foodstatus_id = request.POST.get('foodstatus_id', '')
            foodstatus = foodDay.objects.get(id=foodstatus_id)
            foodstatus.is_lethal = not foodstatus.is_lethal
            foodstatus.save()
        return redirect('dontkillmefood')

    # Querysets for the context
    weekdays = foodDay.objects.all()

    context = {
        'weekdays': weekdays
    }
    return render(request, 'NovoTaskNinja/dontkillmefood.html', context)

@require_http_methods(["GET", "POST"])
def todo(request):
    if request.method == "POST":
        if 'add' in request.POST:
            description = request.POST.get('description', '').strip()
            if description:  # Ensure the description is not empty
                TodoItem.objects.create(description=description)
        elif 'complete' in request.POST:
            todo_id = request.POST.get('todo_id', '')
            todo_item = get_object_or_404(TodoItem, id=todo_id)
            todo_item.completed = not todo_item.completed
            todo_item.save()
        elif 'delete' in request.POST:
            todo_id = request.POST.get('todo_id', '')
            todo_item = get_object_or_404(TodoItem, id=todo_id)
            todo_item.delete()

        return redirect('todo')

    # Get all todo items to display
    todo_items = TodoItem.objects.all().order_by('-created_at')
    context = {
        'todo_items': todo_items
    }
    return render(request, 'NovoTaskNinja/todo.html', context)



    