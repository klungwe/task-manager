// src/pages/tasks/TaskList/TaskItem.jsx
import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';

const TaskItem = ({ task, onDelete, onView }) => {
    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <div>
                <strong>{task.title}</strong> - {task.description}
                <br />
                <small>Due: {task.due_date} | Status: {task.status}</small>
            </div>
            <div>
                <Button variant="info" size="sm" className="me-2" onClick={onView}>
                    View
                </Button>
                <Button variant="danger" size="sm" onClick={onDelete}>
                    Delete
                </Button>
            </div>
        </ListGroup.Item>
    );
};

export default TaskItem;
