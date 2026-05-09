import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Admin State
  const [stats, setStats] = useState({ users: 0, jobs: 0, applications: 0 });
  const [users, setUsers] = useState([]);
  
  // Student State
  const [applications, setApplications] = useState([]);

  // Recruiter State
  const [recruiterJobs, setRecruiterJobs] = useState([]);

  useEffect(() => {
    if (user.role === 'admin') {
      const fetchAdminData = async () => {
        try {
          const statsRes = await api.get('/admin/stats');
          setStats(statsRes.data.data);
          
          const usersRes = await api.get('/users');
          setUsers(usersRes.data.data);
        } catch (err) {
          console.error('Error fetching admin data', err);
        }
      };
      fetchAdminData();
    } else if (user.role === 'student') {
      const fetchApplications = async () => {
        try {
          const res = await api.get('/applications/me');
          setApplications(res.data.data);
        } catch (err) {
          console.error('Error fetching applications', err);
        }
      };
      fetchApplications();
    } else if (user.role === 'recruiter') {
      const fetchRecruiterJobs = async () => {
        try {
          // Since getJobs gets all jobs, we filter by recruiter manually, or use view applicants flow
          const res = await api.get('/jobs');
          const myJobs = res.data.data.filter(job => job.recruiter && job.recruiter._id === user._id);
          setRecruiterJobs(myJobs);
        } catch (err) {
          console.error('Error fetching recruiter jobs', err);
        }
      };
      fetchRecruiterJobs();
    }
  }, [user.role, user._id]);

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you strictly sure you want to permanently delete this user document?')) {
      try {
        await api.delete(`/users/${userId}`);
        setUsers(users.filter(u => u._id !== userId));
        setStats(prev => ({ ...prev, users: prev.users - 1 }));
      } catch (err) {
        alert(err.response?.data?.error || 'Failed to delete user');
      }
    }
  };

  const getStatusColor = (status) => {
    if (status === 'Accepted') return '#10b981';
    if (status === 'Reviewed') return '#3b82f6';
    if (status === 'Rejected') return '#ef4444';
    return '#94a3b8';
  };

  if (user.role === 'admin') {
    return (
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 className="gradient-text" style={{ marginBottom: '2rem' }}>Administration Hub</h2>
        
        {/* Analytics Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div className="glass-panel" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem', textTransform: 'uppercase' }}>Total Users</h3>
            <p style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)' }}>{stats.users}</p>
          </div>
          <div className="glass-panel" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem', textTransform: 'uppercase' }}>Active Jobs</h3>
            <p style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)' }}>{stats.jobs}</p>
          </div>
          <div className="glass-panel" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem', textTransform: 'uppercase' }}>Applications</h3>
            <p style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)' }}>{stats.applications}</p>
          </div>
        </div>

        {/* User Management Section */}
        <div className="glass-panel">
          <h3 style={{ marginBottom: '1.5rem' }}>Manage Registered System Users</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
                  <th style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>Name</th>
                  <th style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>Email</th>
                  <th style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>Role</th>
                  <th style={{ padding: '1rem 0', color: 'var(--text-muted)', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem 0' }}>{u.name}</td>
                    <td style={{ padding: '1rem 0' }}>{u.email}</td>
                    <td style={{ padding: '1rem 0' }}>
                      <span style={{ 
                        padding: '0.2rem 0.6rem', 
                        borderRadius: '4px', 
                        fontSize: '0.8rem',
                        background: u.role === 'admin' ? 'rgba(239, 68, 68, 0.2)' : u.role === 'recruiter' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                        color: u.role === 'admin' ? '#ef4444' : u.role === 'recruiter' ? '#3b82f6' : '#10b981'
                      }}>
                        {u.role.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                      {u._id !== user._id && (
                        <button 
                          onClick={() => handleDeleteUser(u._id)}
                          className="btn btn-outline" 
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', color: '#ef4444', borderColor: '#ef4444' }}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr><td colSpan="4" style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>No standard users located.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Standard User Dashboard Render (Student/Recruiter)
  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100%', 
      backgroundColor: '#f8fafc',
      padding: '3rem 1.5rem',
      position: 'relative'
    }}>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ 
          marginBottom: '2rem', 
          background: '#ffffff', 
          padding: '2rem', 
          borderRadius: '24px', 
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
          border: '1px solid #e2e8f0'
        }}>
          <h2 style={{ color: '#0f172a', fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>Welcome back, {user.name}</h2>
          <p style={{ color: '#64748b', fontSize: '1rem' }}>Authenticated as: <span style={{ fontWeight: '700', color: '#3b82f6' }}>{user.role.toUpperCase()}</span></p>
        </div>
        
        {user.role === 'student' ? (
          <div style={{ 
            background: '#ffffff', 
            padding: '2.5rem', 
            borderRadius: '24px', 
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{ color: '#0f172a', fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>Your Applications Log</h3>
            {applications.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {applications.map(app => (
                  <div key={app._id} style={{ padding: '1.2rem', border: '1px solid #e2e8f0', borderRadius: '16px', background: '#f8fafc', transition: 'all 0.2s', cursor: 'pointer' }} onMouseOver={e => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseOut={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ color: '#1e293b', fontSize: '1.1rem', fontWeight: '700' }}>{app.job.title}</h4>
                        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{app.job.company}</p>
                      </div>
                      <span style={{ 
                        padding: '0.4rem 1rem', 
                        borderRadius: '10px', 
                        fontSize: '0.85rem', 
                        fontWeight: '700',
                        border: `1px solid ${getStatusColor(app.status)}`,
                        color: getStatusColor(app.status),
                        background: '#fff'
                      }}>
                        {app.status}
                      </span>
                    </div>
                    <p style={{ marginTop: '1rem', color: '#94a3b8', fontSize: '0.85rem' }}>
                      Applied on: {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
                  No recent applications to display. Keep browsing roles!
                </p>
              </div>
            )}
            <button onClick={() => navigate('/jobs')} style={{ 
              marginTop: '2rem', width: '100%', background: 'linear-gradient(135deg, #4f46e5, #06b6d4)', 
              color: 'white', padding: '1.1rem', borderRadius: '14px', border: 'none', 
              fontWeight: '800', fontSize: '1.1rem', cursor: 'pointer',
              boxShadow: '0 10px 20px -5px rgba(79, 70, 229, 0.4)', transition: 'all 0.3s ease'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
              Explore More Jobs ✨
            </button>
          </div>
        ) : (
          <div style={{ 
            background: '#ffffff', 
            padding: '2.5rem', 
            borderRadius: '24px', 
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{ color: '#0f172a', fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>Your Active Job Postings</h3>
            {recruiterJobs.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {recruiterJobs.map(job => (
                  <div key={job._id} style={{ padding: '1.2rem', border: '1px solid #e2e8f0', borderRadius: '16px', background: '#f8fafc' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ color: '#1e293b', fontSize: '1.1rem', fontWeight: '700' }}>{job.title}</h4>
                        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{job.type} • {job.location}</p>
                      </div>
                      <button onClick={() => navigate('/applicants')} style={{ 
                        padding: '0.6rem 1.2rem', borderRadius: '10px', border: '1px solid #3b82f6', 
                        color: '#3b82f6', background: 'transparent', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s'
                      }}
                      onMouseOver={e => { e.currentTarget.style.background = '#3b82f6'; e.currentTarget.style.color = '#fff'; }}>
                        View Applicants
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#94a3b8', textAlign: 'center', padding: '1.5rem' }}>
                You have not published any jobs yet. Open the Post Job tab to start recruiting!
              </p>
            )}
            <button onClick={() => navigate('/post-job')} style={{ 
              marginTop: '2rem', width: '100%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', 
              color: 'white', padding: '1.1rem', borderRadius: '14px', border: 'none', 
              fontWeight: '800', fontSize: '1.1rem', cursor: 'pointer',
              boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)'
            }}>
              Post New Job
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

