// src/pages/tasks/TaskDetails/TaskDetails.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Alert } from 'react-bootstrap';
import AuthContext from '../../../context/AuthContext';
import { fetchTaskById, updateTask } from '../../../services/api';
import TaskEditForm from './TaskEditForm';

const TaskDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [task, setTask] = useState(null);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loadTask = async () => {
            try {
                const response = await fetchTaskById(id, user.token);
                setTask(response.data);
            } catch (error) {
                setError('Failed to load task details');
            }
        };

        if (user?.token) loadTask();
    }, [id, user]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = async (updatedTask) => {
        try {
            const response = await updateTask(id, updatedTask, user.token);
            setTask(response.data);
            setIsEditing(false);
        } catch (error) {
            setError('Failed to save task changes.');
        }
    };

    const handleBackToList = () => {
        navigate('/tasks');
    };

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    if (!task) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container my-4">
            <Button variant="secondary" onClick={handleBackToList} className="mb-3">
                Back to List
            </Button>
            {isEditing ? (
                <TaskEditForm task={task} onSave={handleSave} onCancel={handleEditToggle} />
            ) : (
                <Card>
                    <Card.Body>
                        <Card.Title>Task Details</Card.Title>
                        <Card.Text><strong>Title:</strong> {task.title}</Card.Text>
                        <Card.Text><strong>Description:</strong> {task.description}</Card.Text>
                        <Card.Text><strong>Due Date:</strong> {task.due_date}</Card.Text>
                        <Card.Text><strong>Status:</strong> {task.status}</Card.Text>
                        <Button variant="primary" onClick={handleEditToggle}>
                            Edit
                        </Button>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
};

export default TaskDetails;
