// src/pages/tasks/TaskDetails/TaskEditForm.jsx
import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const TaskEditForm = ({ task, onSave, onCancel }) => {
    const [editTask, setEditTask] = useState({ ...task });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onSave(editTask);
    };

    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>Edit Task</Card.Title>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            placeholder="Enter title"
                            value={editTask.title}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            placeholder="Enter description"
                            value={editTask.description}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="due_date"
                            value={editTask.due_date}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                            name="status"
                            value={editTask.status}
                            onChange={handleChange}
                        >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </Form.Select>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="success" className="me-2" onClick={handleSave}>
                            Save
                        </Button>
                        <Button variant="secondary" onClick={onCancel}>
                            Cancel
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default TaskEditForm;
