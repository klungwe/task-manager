// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import TaskList from './pages/tasks/TaskList/TaskList';
import TaskDetails from './pages/tasks/TaskDetails/TaskDetails';
import Login from './pages/auth/Login';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    return user ? children : <Navigate to="/login" />;
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/tasks"
                    element={
                        <ProtectedRoute>
                            <TaskList />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/tasks/:id"
                    element={
                        <ProtectedRoute>
                            <TaskDetails />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/tasks" />} />
            </Routes>
        </Router>
    );
};

export default App;
