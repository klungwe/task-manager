
```markdown
# Task Manager Project

A web-based application built with Django that allows users to manage tasks efficiently. Users can register, authenticate, create tasks, update them, and delete them as needed. The project includes a RESTful API with JWT authentication and Swagger documentation.

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

## Prerequisites

- **Python 3.10+**
- **Django 5.1.3+**
- **MariaDB or MySQL Server**
- **pip (Python package installer)**
- **Git (for cloning the repository)**

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/klungwe/task-manager.git
cd task-manager
```

### 2. Set Up a Virtual Environment

#### On macOS and Linux:

```bash
python3 -m venv env
source env/bin/activate
```

#### On Windows:

```bash
python -m venv env
env\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure the Database

#### a. Install MariaDB or MySQL (if not already installed)

Follow the official installation guide for your operating system.

#### b. Create a Database and User

Log in to the MariaDB/MySQL shell:

```bash
mysql -u root -p
```

Execute the following SQL commands:

```sql
CREATE DATABASE task_manager_db;
CREATE USER 'task_user'@'localhost' IDENTIFIED BY 'task1234';
GRANT ALL PRIVILEGES ON task_manager_db.* TO 'task_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

#### c. Update `settings.py`

In `task_manager/settings.py`, configure the database settings:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',  # Use 'mysql' for MariaDB
        'NAME': 'task_manager_db',
        'USER': 'task_user',
        'PASSWORD': 'task1234',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

### 5. Apply Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 6. Create a Superuser

```bash
python manage.py createsuperuser
```

### 7. Run the Development Server

```bash
python manage.py runserver
```

The application will be available at `http://127.0.0.1:8000/`.

## Usage

### Access the Admin Interface

Navigate to `http://127.0.0.1:8000/admin/` and log in with your superuser credentials.

### Access the API Documentation

Visit `http://127.0.0.1:8000/swagger/` to interact with the API using Swagger UI.

## API Endpoints

### Authentication

- **Obtain Token**

  ```
  POST /api/token/
  ```

  **Payload:**

  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```

- **Refresh Token**

  ```
  POST /api/token/refresh/
  ```

  **Payload:**

  ```json
  {
    "refresh": "your_refresh_token"
  }
  ```

### User Management

- **Register User**

  ```
  POST /api/accounts/register/
  ```

- **User Profile**

  ```
  GET /api/accounts/profile/
  ```

### Task Management

- **List Tasks**

  ```
  GET /api/tasks/
  ```

- **Create Task**

  ```
  POST /api/tasks/
  ```

- **Retrieve Task**

  ```
  GET /api/tasks/{id}/
  ```

- **Update Task**

  ```
  PUT /api/tasks/{id}/
  ```

- **Delete Task**

  ```
  DELETE /api/tasks/{id}/
  ```

## Project Structure

```
task-manager/
├── accounts/
│   ├── migrations/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── serializers.py
│   ├── urls.py
│   └── views.py
├── tasks/
│   ├── migrations/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── serializers.py
│   ├── urls.py
│   └── views.py
├── task_manager/
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── manage.py
├── requirements.txt
└── README.md
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License.
```
