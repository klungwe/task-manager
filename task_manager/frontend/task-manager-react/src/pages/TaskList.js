import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { fetchTasks, createTask, deleteTask } from '../services/api';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const { user, logout } = useContext(AuthContext);

    useEffect(() => {
        const loadTasks = async () => {
            if (user) {
                const response = await fetchTasks(user);
                setTasks(response.data);
            }
        };
        loadTasks();
    }, [user]);

    const handleAddTask = async () => {
        const response = await createTask({ title: newTask, status: 'pending' }, user);
        setTasks([...tasks, response.data]);
        setNewTask('');
    };

    const handleDeleteTask = async (taskId) => {
        await deleteTask(taskId, user);
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    return (
        <div>
            <h2>Your Tasks</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.title}
                        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="New Task"
            />
            <button onClick={handleAddTask}>Add Task</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default TaskList;
