#!/bin/bash

# Start Django server
cd task_manager
python manage.py runserver &

# Start React server
cd frontend/task-manager-react
npm start
