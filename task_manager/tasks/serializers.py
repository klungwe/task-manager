from rest_framework import serializers
from django.utils import timezone
from .models import Task
from django.conf import settings

class TaskSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'due_date', 'status', 'owner']
        read_only_fields = ['owner']
        
    def validate_due_date(self, value):
        if value < timezone.now().date():
            raise serializers.ValidationError("Due date cannot be in the past.")
        return value
        