from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import Task
from .serializers import TaskSerializer

# Define OpenAPI parameters for filtering
status_param = openapi.Parameter(
    'status',
    in_=openapi.IN_QUERY,
    description='Filter tasks by status (e.g., pending, completed)',
    type=openapi.TYPE_STRING
)
due_date_param = openapi.Parameter(
    'due_date',
    in_=openapi.IN_QUERY,
    description='Filter tasks by due date (YYYY-MM-DD)',
    type=openapi.TYPE_STRING,
    format=openapi.FORMAT_DATE
)

# Custom permission class
class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to view or edit it.
    """

    def has_object_permission(self, request, view, obj):
        if getattr(view, 'swagger_fake_view', False):
            return True  # Allow access during schema generation
        return obj.owner == request.user

# List and Create Tasks
class TaskListCreateAPIView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'due_date']

    @swagger_auto_schema(
        operation_description="Retrieve a list of tasks.",
        manual_parameters=[status_param, due_date_param],
        responses={200: TaskSerializer(many=True)},
    )
    def get(self, request, *args, **kwargs):
        self.queryset = self.get_queryset()
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Create a new task.",
        request_body=TaskSerializer,
        responses={201: TaskSerializer},
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
            return Task.objects.none()
        return self.queryset.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# Retrieve, Update, and Delete a Task
class TaskRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    @swagger_auto_schema(
        operation_description="Retrieve a task by ID.",
        responses={200: TaskSerializer},
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Update a task by ID.",
        request_body=TaskSerializer,
        responses={200: TaskSerializer},
    )
    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Partially update a task by ID.",
        request_body=TaskSerializer,
        responses={200: TaskSerializer},
    )
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Delete a task by ID.",
        responses={204: 'No Content'},
    )
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
            return Task.objects.none()
        return self.queryset.filter(owner=self.request.user)
