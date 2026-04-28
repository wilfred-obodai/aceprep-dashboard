import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.logo}>ACEPREP</h1>
          <p style={styles.tagline}>Ghana's Premier BECE & WASSCE Exam Prep Platform</p>
          <div style={styles.divider} />
          <h2 style={styles.title}>School Admin Login</h2>
          <p style={styles.subtitle}>Sign in to your school dashboard</p>
        </div>

        {/* Error */}
        {error && (
          <div style={styles.error}>
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="school@example.com"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={styles.input}
              required
            />
          </div>

          <button
            type="submit"
            style={styles.btn}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 14, color: '#555', marginTop: 16 }}>
           New school?{' '}
         <a href="/register" style={{ color: '#2E86AB', fontWeight: 'bold' }}>
           Register your school here
         </a>
        </p>

        {/* Footer */}
        <p style={styles.footer}>
          AcePrep — Ace Your Exams. Change Your Future.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1A5276 0%, #2E86AB 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    background: '#ffffff',
    borderRadius: 16,
    padding: '40px 36px',
    width: '100%',
    maxWidth: 440,
    boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
  },
  header: {
    textAlign: 'center',
    marginBottom: 28,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2E86AB',
    letterSpacing: 3,
  },
  tagline: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    marginBottom: 16,
  },
  divider: {
    height: 3,
    background: 'linear-gradient(90deg, #2E86AB, #F39C12)',
    borderRadius: 2,
    margin: '16px auto',
    width: 60,
  },
  title: {
    fontSize: 22,
    color: '#1A5276',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
  },
  error: {
    background: '#FDEDEC',
    border: '1px solid #E74C3C',
    borderRadius: 8,
    padding: '12px 16px',
    marginBottom: 20,
    color: '#E74C3C',
    fontSize: 14,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    padding: '12px 14px',
    border: '1px solid #ddd',
    borderRadius: 8,
    fontSize: 15,
    outline: 'none',
    transition: 'border 0.2s',
  },
  btn: {
    background: 'linear-gradient(135deg, #2E86AB, #1A5276)',
    color: '#ffffff',
    border: 'none',
    borderRadius: 8,
    padding: '14px',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    transition: 'opacity 0.2s',
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#aaa',
    marginTop: 24,
    fontStyle: 'italic',
  },
};

export default Login;