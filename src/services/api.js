import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Automatically attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Auth ────────────────────────────────────
export const loginSchool    = (data) => API.post('/auth/login', data);

// ── School ──────────────────────────────────
export const getSchoolProfile  = ()       => API.get('/schools/profile');
export const getSchoolStudents = (params) => API.get('/schools/students', { params });
export const getSchoolMonitoring = (params) => API.get('/schools/monitoring', { params });
export const getSchoolGrades   = (params) => API.get('/schools/grades', { params });
export const getStudentGrades  = (id)     => API.get(`/schools/grades/${id}`);

// ── Exams ─────────────────────────────────────────
export const createExam      = (data) => API.post('/exams', data);
export const getSchoolExams  = ()     => API.get('/exams/school');
export const getExamResults  = (id)   => API.get(`/exams/${id}/results`);

export const registerSchool = (data) => API.post('/auth/register/school', data);

export const getTeachers      = ()     => API.get('/schools/teachers');
export const addTeacher       = (data) => API.post('/auth/register/teacher', data);

// ── Assignments ───────────────────────────────────
export const createAssignment  = (data) => API.post('/assignments', data);
export const getSchoolAssignments = ()  => API.get('/assignments/school');
export const getSubmissions    = (id)   => API.get(`/assignments/${id}/submissions`);
export const gradeSubmission   = (id, data) => API.post(`/assignments/submissions/${id}/grade`, data);

// ── Leaderboard ───────────────────────────────
export const getMyRank    = () => API.get('/leaderboard/my-rank');

// ── Streaks ───────────────────────────────────
export const getMyStreak  = () => API.get('/streaks/mine');

export const getSchoolLeaderboard = () => API.get('/leaderboard/school');

export default API;