from django.apps import AppConfig


class NovotaskninjaConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'NovoTaskNinja'

class TasksConfig(AppConfig): # for todo list tasks
    default_auto_field = "django.db.models.BigAutoField"
    name = "tasks"