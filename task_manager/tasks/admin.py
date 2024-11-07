# tasks/admin.py

from django.contrib import admin
from .models import Task

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'owner', 'due_date', 'status')
    list_filter = ('status', 'due_date', 'owner')
    search_fields = ('title', 'description', 'owner__username')
