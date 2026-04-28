import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaUsers, FaChartBar, FaSignOutAlt, FaClipboardList, FaChalkboardTeacher, FaBook } from 'react-icons/fa';

const Sidebar = () => {
  const { logout, user } = useAuth();
  const location = useLocation();

  const links = [
  { path: '/',             label: 'Dashboard',   icon: <FaHome /> },
  { path: '/students',     label: 'Students',    icon: <FaUsers /> },
  { path: '/grades',       label: 'Grades',      icon: <FaChartBar /> },
  { path: '/exams',        label: 'Exams',       icon: <FaClipboardList /> },
  { path: '/assignments',  label: 'Assignments', icon: <FaBook /> },
  { path: '/teachers',     label: 'Teachers',    icon: <FaChalkboardTeacher /> },
];

  return (
    <div style={styles.sidebar}>
      {/* Logo */}
      <div style={styles.logo}>
        <h1 style={styles.logoText}>ACEPREP</h1>
        <p style={styles.logoSub}>School Dashboard</p>
      </div>

      {/* Nav Links */}
      <nav style={styles.nav}>
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              ...styles.navLink,
              ...(location.pathname === link.path ? styles.navLinkActive : {})
            }}
          >
            <span style={styles.navIcon}>{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>

      {/* User info + Logout */}
      <div style={styles.bottom}>
        <p style={styles.userEmail}>{user?.email}</p>
        <button onClick={logout} style={styles.logoutBtn}>
          <FaSignOutAlt style={{ marginRight: 8 }} />
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: 240,
    minHeight: '100vh',
    background: '#1A5276',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: 0, left: 0,
  },
  logo: {
    padding: '28px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  logoText: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  logoSub: {
    color: '#AED6F1',
    fontSize: 12,
    marginTop: 4,
  },
  nav: {
    padding: '20px 0',
    flex: 1,
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 20px',
    color: '#AED6F1',
    fontSize: 15,
    transition: 'all 0.2s',
    borderLeft: '3px solid transparent',
  },
  navLinkActive: {
    color: '#ffffff',
    background: 'rgba(255,255,255,0.1)',
    borderLeft: '3px solid #F39C12',
  },
  navIcon: {
    marginRight: 12,
    fontSize: 16,
  },
  bottom: {
    padding: '20px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
  },
  userEmail: {
    color: '#AED6F1',
    fontSize: 12,
    marginBottom: 12,
    wordBreak: 'break-all',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(231,76,60,0.2)',
    color: '#E74C3C',
    border: '1px solid #E74C3C',
    borderRadius: 6,
    padding: '8px 16px',
    fontSize: 14,
    width: '100%',
  },
};

export default Sidebar;