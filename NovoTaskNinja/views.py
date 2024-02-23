from django.utils.dateparse import parse_time
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages # for celebration message
from django.views.decorators.http import require_http_methods
from .models import *

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
    """
    Worked on by Andy Trinh.
    Displays the days and allows a user to mark them.

    Parameters
    ----------
    request : GET or POST request
        the request on page by the user

    Returns
    -------
    redirect
        points you back to the page to render
    render
        renders the page with all of the days of the week 
    """
    # Handling food status, ripped from CYC
    if request.method == "POST":
        action = request.POST.get('action')
        if 'toggle_foodstatus' in request.POST: 
            #these are dumb names in hindsite but i didnt wanna rename anything
            foodstatus_id = request.POST.get('foodstatus_id', '')
            foodstatus = foodDay.objects.get(id=foodstatus_id) #getting the day objects for marking
            foodstatus.is_lethal = not foodstatus.is_lethal #marks it nonlethal
            foodstatus.save() #saves it 
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

# handling the Todo B page
# this version has the pop-up message after task completion
@require_http_methods(["GET", "POST"])
def bilgestodo(request):
    # if the user clicked a button with POST method
    if request.method == "POST":
        # if it was the add task button, add the task to database
        if 'add' in request.POST:
            name = request.POST.get('name', '').strip() # get the name entered by user
            if name:  # Ensure the description is not empty
                Task.objects.create(name=name) # save the task in the database with name
        # if it was the delete  button, delete the task from database
        elif 'delete' in request.POST:
            task_id = request.POST.get('task_id', '') # get the task clicked on by its id from the database
            # https://docs.djangoproject.com/en/5.0/topics/http/shortcuts/#get-object-or-404
            task = get_object_or_404(Task, id=task_id) # get the object if doesn't exist, throw error
            task.delete() # delete the task from the database
            # create success message
            # https://docs.djangoproject.com/en/5.0/ref/contrib/messages/#changing-the-minimum-recorded-level-per-request
            messages.success(request, "Slay Novo!! 💅 One more thing off the list to go enjoy bayfront soon!")

        return redirect('bilgestodo') # refresh the page to display the updated list

    # if the request is GET, display the todo list
    tasks = Task.objects.all().order_by('-created_at') #get all the tasks in order of creation
    # create context object to pass them to html
    context = {
        'tasks': tasks
    }
    return render(request, 'NovoTaskNinja/bilgestodo.html', context)



    
