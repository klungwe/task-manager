// src/pages/tasks/TaskList/TaskList.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';
import { fetchTasks, createTask, deleteTask } from '../../../services/api';
import TaskItem from './TaskItem';
import { Card, Form, Button, Alert, ListGroup, InputGroup } from 'react-bootstrap';

const TaskList = () => {
    const { user, logout } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        due_date: '',
        status: 'pending',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Fetch tasks on component mount
    useEffect(() => {
        const loadTasks = async () => {
            try {
                if (user?.token) {
                    const response = await fetchTasks(user.token);
                    setTasks(response.data.results || []);
                } else {
                    setError('User is not authenticated');
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
                setError('Could not load tasks. Please check your authentication.');
            }
        };
        loadTasks();
    }, [user]);

    // Handle creating a new task
    const handleCreateTask = async () => {
        try {
            if (user && user.token) {
                const response = await createTask(newTask, user.token);
                setTasks((prevTasks) => Array.isArray(prevTasks) ? [...prevTasks, response.data] : [response.data]);
                setNewTask({ title: '', description: '', due_date: '', status: 'pending' });
                setError('');
            }
        } catch (error) {
            console.error('Error creating task:', error.response ? error.response.data : error.message);
            setError('Failed to create task. Ensure all fields are filled correctly.');
        }
    };

    // Handle deleting a task
    const handleDeleteTask = async (taskId) => {
        try {
            if (user) {
                await deleteTask(taskId, user.token);
                setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            setError('Failed to delete task.');
        }
    };

    // Navigate to TaskDetails on view
    const handleViewTask = (task) => {
        navigate(`/tasks/${task.id}`);
    };

    // Handle input changes for the new task form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Your Tasks</h2>
            {error && <Alert variant="danger" className="text-center">{error}</Alert>}

            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>Create New Task</Card.Title>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="Enter task title"
                                value={newTask.title}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                placeholder="Enter task description"
                                value={newTask.description}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="due_date"
                                value={newTask.due_date}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select name="status" value={newTask.status} onChange={handleChange}>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" onClick={handleCreateTask} className="w-100">Create Task</Button>
                    </Form>
                </Card.Body>
            </Card>

            <ListGroup>
                {Array.isArray(tasks) && tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onDelete={() => handleDeleteTask(task.id)}
                        onView={() => handleViewTask(task)}
                    />
                ))}
            </ListGroup>

            <Button variant="secondary" onClick={logout} className="mt-4 w-100">Logout</Button>
        </div>
    );
};

export default TaskList;
