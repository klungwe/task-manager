---

# Task Manager Project

A web-based application built with Django for managing tasks efficiently. Users can register, authenticate, create tasks, update them, and delete them as needed. The project includes a RESTful API with JWT authentication, Swagger documentation, and a React frontend with Bootstrap styling.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure user registration and authentication using JWT.
- **Task Management**: CRUD operations for tasks.
- **Filtering and Ordering**: Filter tasks by status and due date.
- **API Documentation**: Interactive API docs with Swagger UI.
- **Admin Interface**: Manage users and tasks via Django's admin panel.
- **Frontend UI**: React-based frontend with Bootstrap styling for improved UI.

## Prerequisites

- **Python 3.10+**
- **Django 5.1.3+**
- **MariaDB or MySQL Server**
- **pip (Python package installer)**
- **Git (for cloning the repository)**
- **Node.js and npm (for React frontend)**

## Installation

### Backend Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/klungwe/task-manager.git
   cd task-manager
   ```

2. **Set Up a Virtual Environment**

   ```bash
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```

3. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Configure the Database**

   - **Install MariaDB or MySQL**, if not already installed.
   - **Create a Database and User**

     ```bash
     mysql -u root -p
     ```

     ```sql
     CREATE DATABASE task_manager_db;
     CREATE USER 'task_user'@'localhost' IDENTIFIED BY 'task1234';
     GRANT ALL PRIVILEGES ON task_manager_db.* TO 'task_user'@'localhost';
     FLUSH PRIVILEGES;
     EXIT;
     ```

   - **Update `settings.py`** with your database configuration:

     ```python
     DATABASES = {
         'default': {
             'ENGINE': 'django.db.backends.mysql',
             'NAME': 'task_manager_db',
             'USER': 'task_user',
             'PASSWORD': 'task1234',
             'HOST': 'localhost',
             'PORT': '3306',
         }
     }
     ```

5. **Apply Migrations**

   ```bash
   python manage.py migrate
   ```

6. **Create a Superuser**

   ```bash
   python manage.py createsuperuser
   ```

### Frontend Setup

1. **Navigate to the Frontend Directory**

   ```bash
   cd /task_manager/frontend/task-manager-react
   ```

2. **Install Frontend Dependencies**

   ```bash
   npm install
   ```


### Running the Application

1. **Navigate to root folder**:

   ```bash
   cd /task-manager
   ```

2. **Run the executable script (for macOS/Linux)**:

   ```bash
   ./start.sh
   ```

   This command will start both the Django backend and React frontend servers.

---

## Usage

- **Access the Admin Interface**: `http://127.0.0.1:8000/admin/`
- **Access the API Documentation**: `http://127.0.0.1:8000/swagger/`
- **Frontend Application**: `http://127.0.0.1:3000`

## API Endpoints

### Authentication

- **Obtain Token**

  ```plaintext
  POST /api/token/
  ```

  **Payload**:

  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```

- **Refresh Token**

  ```plaintext
  POST /api/token/refresh/
  ```

  **Payload**:

  ```json
  {
    "refresh": "your_refresh_token"
  }
  ```

### User Management

- **Register User**

  ```plaintext
  POST /api/accounts/register/
  ```

- **User Profile**

  ```plaintext
  GET /api/accounts/profile/
  ```

### Task Management

- **List Tasks**

  ```plaintext
  GET /api/tasks/
  ```

- **Create Task**

  ```plaintext
  POST /api/tasks/
  ```

- **Retrieve Task**

  ```plaintext
  GET /api/tasks/{id}/
  ```

- **Update Task**

  ```plaintext
  PUT /api/tasks/{id}/
  ```

- **Delete Task**

  ```plaintext
  DELETE /api/tasks/{id}/
  ```

## Project Structure

```
task-manager/
├── README.md
├── requirements.pip
├── setup.py
├── start.sh
└── task_manager
    ├── accounts
    │   ├── __init__.py
    │   ├── admin.py
    │   ├── apps.py
    │   ├── migrations
    │   │   └── __init__.py
    │   ├── models.py
    │   ├── serializers.py
    │   ├── tests.py
    │   ├── token_serializers.py
    │   ├── urls.py
    │   └── views.py
    ├── frontend
    │   └── task-manager-react
    │       ├── README.md
    │       ├── package-lock.json
    │       ├── package.json
    │       ├── public
    │       │   ├── favicon.ico
    │       │   ├── index.html
    │       │   ├── logo192.png
    │       │   ├── logo512.png
    │       │   ├── manifest.json
    │       │   └── robots.txt
    │       └── src
    │           ├── App.css
    │           ├── App.js
    │           ├── App.test.js
    │           ├── components
    │           ├── context
    │           │   └── AuthContext.js
    │           ├── index.css
    │           ├── index.js
    │           ├── logo.svg
    │           ├── pages
    │           │   ├── auth
    │           │   │   ├── Login.jsx
    │           │   │   └── Login.modules.css
    │           │   └── tasks
    │           │       ├── TaskDetails
    │           │       │   ├── TaskDetails.jsx
    │           │       │   ├── TaskDetails.modules.css
    │           │       │   └── TaskEditForm.jsx
    │           │       └── TaskList
    │           │           ├── TaskItem.jsx
    │           │           ├── TaskList.jsx
    │           │           └── TaskList.modules.css
    │           ├── reportWebVitals.js
    │           ├── services
    │           │   └── api.js
    │           ├── setupTests.js
    │           └── styles.css
    ├── manage.py
    ├── task_manager
    │   ├── __init__.py
    │   ├── asgi.py
    │   ├── settings.py
    │   ├── urls.py
    │   └── wsgi.py
    └── tasks
        ├── __init__.py
        ├── admin.py
        ├── apps.py
        ├── migrations
        │   ├── 0001_initial.py
        │   └── __init__.py
        ├── models.py
        ├── serializers.py
        ├── tests.py
        ├── urls.py
        └── views.py
```
