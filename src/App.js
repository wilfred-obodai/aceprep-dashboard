import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login          from './pages/Login';
import Dashboard      from './pages/Dashboard';
import Students       from './pages/Students';
import Grades         from './pages/Grades';
import StudentProfile from './pages/StudentProfile';
import Exams          from './pages/Exams';
import CreateExam     from './pages/CreateExam';
import ExamResults    from './pages/ExamResults';
import Register from './pages/Register';
import Teachers from './pages/Teachers';
import Assignments from './pages/Assignments';
import AssignmentSubmissions from './pages/AssignmentSubmissions';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/students" element={
            <ProtectedRoute><Students /></ProtectedRoute>
          } />
          <Route path="/grades" element={
            <ProtectedRoute><Grades /></ProtectedRoute>
          } />
          <Route path="/students/:id" element={
            <ProtectedRoute><StudentProfile /></ProtectedRoute>
          } />
          <Route path="/exams" element={
            <ProtectedRoute><Exams /></ProtectedRoute>
          } />
          <Route path="/exams/create" element={
            <ProtectedRoute><CreateExam /></ProtectedRoute>
          } />
          <Route path="/exams/:id/results" element={
            <ProtectedRoute><ExamResults /></ProtectedRoute>
          } />
          <Route path="/teachers" element={
            <ProtectedRoute><Teachers /></ProtectedRoute>
          } />
          <Route path="/assignments" element={
           <ProtectedRoute><Assignments /></ProtectedRoute>
          } />
          <Route path="/assignments/:id/submissions" element={
            <ProtectedRoute><AssignmentSubmissions /></ProtectedRoute>
          } />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;