import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerSchool } from '../services/api';

const Register = () => {
  const [name,        setName]        = useState('');
  const [email,       setEmail]       = useState('');
  const [password,    setPassword]    = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [city,        setCity]        = useState('');
  const [region,      setRegion]      = useState('');
  const [phone,       setPhone]       = useState('');
  const [motto,       setMotto]       = useState('');
  const [address,     setAddress]     = useState('');
  const [error,       setError]       = useState('');
  const [success,     setSuccess]     = useState('');
  const [loading,     setLoading]     = useState(false);
  const navigate = useNavigate();

  const regions = [
    'Greater Accra', 'Ashanti', 'Western', 'Central', 'Eastern',
    'Northern', 'Upper East', 'Upper West', 'Volta', 'Brong-Ahafo',
    'Savannah', 'Bono East', 'Oti', 'Ahafo', 'North East', 'Western North'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPass) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await registerSchool({
        name, email, password, city, region, phone, motto, address
      });
      if (res.data.success) {
        setSuccess(`School registered! Your school code is: ${res.data.school.code}. Check your email to verify your account.`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 64 }}>🎉</div>
            <h2 style={{ color: '#27AE60', marginTop: 16 }}>School Registered!</h2>
            <div style={styles.successBox}>
              <p style={{ margin: 0 }}>{success}</p>
            </div>
            <p style={{ color: '#555', marginTop: 16, fontSize: 14 }}>
              Share your school code with students so they can link their accounts to your school.
            </p>
            <button style={styles.btn} onClick={() => navigate('/login')}>
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.logo}>ACEPREP</h1>
          <p style={styles.tagline}>Ghana's Premier BECE & WASSCE Exam Prep Platform</p>
          <div style={styles.divider} />
          <h2 style={styles.title}>Register Your School</h2>
          <p style={styles.subtitle}>Create a school account to monitor students and manage exams</p>
        </div>

        {error && <div style={styles.error}>⚠️ {error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <Field label="School Full Name *">
            <input style={styles.input} value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Prempeh College" required />
          </Field>

          <Field label="School Email Address *">
            <input style={styles.input} type="email" value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@yourschool.edu.gh" required />
          </Field>

          <div style={styles.row}>
            <Field label="Password *" style={{ flex: 1 }}>
              <input style={styles.input} type="password" value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Min 6 characters" required />
            </Field>
            <Field label="Confirm Password *" style={{ flex: 1 }}>
              <input style={styles.input} type="password" value={confirmPass}
                onChange={e => setConfirmPass(e.target.value)}
                placeholder="Repeat password" required />
            </Field>
          </div>

          <div style={styles.row}>
            <Field label="City *" style={{ flex: 1 }}>
              <input style={styles.input} value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="e.g. Kumasi" required />
            </Field>
            <Field label="Region *" style={{ flex: 1 }}>
              <select style={styles.input} value={region}
                onChange={e => setRegion(e.target.value)} required>
                <option value="">Select Region</option>
                {regions.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </Field>
          </div>

          <div style={styles.row}>
            <Field label="Phone Number" style={{ flex: 1 }}>
              <input style={styles.input} value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="e.g. 0322012345" />
            </Field>
            <Field label="School Motto" style={{ flex: 1 }}>
              <input style={styles.input} value={motto}
                onChange={e => setMotto(e.target.value)}
                placeholder="e.g. Fides et Lux" />
            </Field>
          </div>

          <Field label="School Address">
            <input style={styles.input} value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="e.g. P.O. Box 123, Kumasi" />
          </Field>

          <div style={styles.privacyBox}>
            <p style={styles.privacyTitle}>🔒 Your Data is Safe</p>
            <p style={styles.privacyText}>
              AcePrep does not spy on your school. Your school data is private and only visible to you and your teachers. AcePrep only uses anonymised data for platform improvements.
            </p>
          </div>

          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? 'Registering...' : '🏫 Register School'}
          </button>
        </form>

        <p style={styles.loginLink}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#2E86AB', fontWeight: 'bold' }}>
            Sign in
          </Link>
        </p>

        <p style={styles.footer}>
          AcePrep — Ace Your Exams. Change Your Future.
        </p>
      </div>
    </div>
  );
};

const Field = ({ label, children, style }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
    <label style={{ fontSize: 13, fontWeight: 'bold', color: '#555' }}>{label}</label>
    {children}
  </div>
);

const styles = {
  container:   { minHeight: '100vh', background: 'linear-gradient(135deg, #1A5276 0%, #2E86AB 100%)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 20 },
  card:        { background: '#ffffff', borderRadius: 16, padding: '36px 32px', width: '100%', maxWidth: 600, boxShadow: '0 20px 60px rgba(0,0,0,0.2)', marginTop: 20, marginBottom: 20 },
  header:      { textAlign: 'center', marginBottom: 24 },
  logo:        { fontSize: 36, fontWeight: 'bold', color: '#2E86AB', letterSpacing: 3, margin: 0 },
  tagline:     { fontSize: 12, color: '#888', marginTop: 4, marginBottom: 16 },
  divider:     { height: 3, background: 'linear-gradient(90deg, #2E86AB, #F39C12)', borderRadius: 2, margin: '12px auto', width: 60 },
  title:       { fontSize: 22, color: '#1A5276', margin: '8px 0 4px' },
  subtitle:    { fontSize: 13, color: '#888', margin: 0 },
  error:       { background: '#FDEDEC', border: '1px solid #E74C3C', borderRadius: 8, padding: '12px 16px', marginBottom: 16, color: '#E74C3C', fontSize: 14 },
  successBox:  { background: '#EAFAF1', border: '1px solid #27AE60', borderRadius: 8, padding: '16px', marginTop: 16, color: '#1E8449', fontSize: 14, lineHeight: 1.6 },
  form:        { display: 'flex', flexDirection: 'column', gap: 16 },
  row:         { display: 'flex', gap: 12 },
  input:       { padding: '11px 14px', border: '1px solid #ddd', borderRadius: 8, fontSize: 15, width: '100%' },
  privacyBox:  { background: '#EAF4FB', borderRadius: 8, padding: '14px 16px', border: '1px solid #AED6F1' },
  privacyTitle:{ fontSize: 14, fontWeight: 'bold', color: '#1A5276', margin: '0 0 6px' },
  privacyText: { fontSize: 13, color: '#2E86AB', margin: 0, lineHeight: 1.5 },
  btn:         { background: 'linear-gradient(135deg, #2E86AB, #1A5276)', color: '#ffffff', borderRadius: 8, padding: '14px', fontSize: 16, fontWeight: 'bold', cursor: 'pointer', width: '100%', border: 'none' },
  loginLink:   { textAlign: 'center', fontSize: 14, color: '#555', marginTop: 20 },
  footer:      { textAlign: 'center', fontSize: 12, color: '#aaa', marginTop: 16, fontStyle: 'italic' },
};

export default Register;