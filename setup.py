from setuptools import setup, find_packages

setup(
    name='task-manager',
    version='1.0.0',
    description='This application relates to distributed systems, task manager',
    author='DS GROUP 1',
    license='Educational Purposes',
    url='',
    packages=find_packages(),
    dependency_links=[],
    install_requires=[
        'django==5.1.3',
        'django-mysql==4.15.0',
        'django-extensions==3.2.3',
        'python-dotenv[cli]==1.0.1',
        'djangorestframework==3.15.2',
        'mysqlclient==2.2.5',
        'django-cors-headers==4.6.0',
        'requests==2.32.2',
        'uwsgi==2.0.28',
        'django-filter==24.3',
        'validators==0.34.0',
        'gunicorn==23.0.0',
        'djangorestframework-simplejwt==5.3.1',
        'drf-yasg==1.21.8'
    ],
    include_package_data=True,
    zip_safe=False,
)