import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaHome, FaUsers, FaChartBar, FaSignOutAlt,
  FaClipboardList, FaChalkboardTeacher, FaBook,
  FaTrophy, FaBullhorn, FaCalendar, FaRobot,
  FaChartPie, FaEnvelope, FaUserCheck, FaBookOpen,
  FaCog, FaVideo, FaStar
} from 'react-icons/fa';

const Sidebar = () => {
  const { logout, user } = useAuth();
  const location = useLocation();

  const links = [
    { path: '/',               label: 'Dashboard',    icon: <FaHome /> },
    { path: '/students',       label: 'Students',     icon: <FaUsers /> },
    { path: '/grades',         label: 'Grades',       icon: <FaChartBar /> },
    { path: '/exams',          label: 'Exams',        icon: <FaClipboardList /> },
    { path: '/assignments',    label: 'Assignments',  icon: <FaBook /> },
    { path: '/announcements',  label: 'Announce',     icon: <FaBullhorn /> },
    { path: '/timetable',      label: 'Timetable',    icon: <FaCalendar /> },
    { path: '/attendance',     label: 'Attendance',   icon: <FaUserCheck /> },
    { path: '/study-materials',label: 'Materials',    icon: <FaBookOpen /> },
    { path: '/messages',       label: 'Messages',     icon: <FaEnvelope /> },
    { path: '/video-rooms',    label: 'Video Rooms',  icon: <FaVideo /> },
    { path: '/leaderboard',    label: 'Leaderboard',  icon: <FaTrophy /> },
    { path: '/xp-leaderboard', label: 'XP Ranks',     icon: <FaStar /> },
    { path: '/analytics',      label: 'Analytics',    icon: <FaChartPie /> },
    { path: '/ai-questions',   label: 'AI Questions', icon: <FaRobot /> },
    { path: '/teachers',       label: 'Teachers',     icon: <FaChalkboardTeacher /> },
    { path: '/settings',       label: 'Settings',     icon: <FaCog /> },
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
  top: 0, 
  left: 0, 
  overflowY: 'auto',
  height: '100vh',
},
  logo:          { padding: '28px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' },
  logoText:      { color: '#ffffff', fontSize: 26, fontWeight: 'bold', letterSpacing: 2, margin: 0 },
  logoSub:       { color: '#AED6F1', fontSize: 12, marginTop: 4 },
  nav:           { padding: '12px 0', flex: 1 },
  navLink:       { display: 'flex', alignItems: 'center', padding: '10px 20px', color: '#AED6F1', fontSize: 14, textDecoration: 'none', borderLeft: '3px solid transparent' },
  navLinkActive: { color: '#ffffff', background: 'rgba(255,255,255,0.1)', borderLeft: '3px solid #F39C12' },
  navIcon:       { marginRight: 12, fontSize: 15 },
  bottom:        { padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' },
  userEmail:     { color: '#AED6F1', fontSize: 12, marginBottom: 12, wordBreak: 'break-all' },
  logoutBtn:     { display: 'flex', alignItems: 'center', background: 'rgba(231,76,60,0.2)', color: '#E74C3C', border: '1px solid #E74C3C', borderRadius: 6, padding: '8px 16px', fontSize: 14, width: '100%', cursor: 'pointer' },
};

export default Sidebar;