import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      background: 'rgba(13, 76, 60, 0.98)',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      padding: '0',
      marginTop: 'auto',
      color: '#f4f1eb'
    }}>
      {/* Main Footer */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 2rem 3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem' }}>

        {/* Brand Column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
            <img src="/image.png" alt="ITM Logo" style={{ height: '50px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)' }} />
            <div>
              <div style={{ fontWeight: '900', fontSize: '1.2rem', color: '#f4f1eb', letterSpacing: '0.5px' }}>ITM PLACEMENT CELL</div>
              <div style={{ fontSize: '0.65rem', color: '#7ba05b', fontWeight: '700', letterSpacing: '0.5px' }}>INSTITUTE OF TECHNOLOGY & MANAGEMENT</div>
            </div>
          </div>
          <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.8' }}>
            India's #1 platform for fresher jobs, internships, and campus placements. Empowering careers with sustainable opportunities.
          </p>
          <div style={{ display: 'flex', gap: '0.8rem', marginTop: '2rem' }}>
            {['LinkedIn', 'Twitter', 'Instagram'].map(social => (
              <a key={social} href="#" style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '0.6rem 1rem',
                color: '#f4f1eb',
                fontSize: '0.8rem',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={e => { e.currentTarget.style.background = '#7ba05b'; e.currentTarget.style.color = '#fff'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#f4f1eb'; }}>
                {social}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: '#f4f1eb', fontSize: '1.1rem', fontWeight: '800', marginBottom: '2rem', position: 'relative', paddingBottom: '0.8rem' }}>
            Explore Portal
            <span style={{ position: 'absolute', bottom: 0, left: 0, width: '40px', height: '3px', background: '#7ba05b', borderRadius: '2px' }}></span>
          </h4>
          {[
            { label: 'Browse Jobs', to: '/jobs?type=Full-time' },
            { label: 'Browse Internships', to: '/jobs?type=Internship' },
            { label: 'Campus Placements', to: '/campus-placements' },
            { label: 'Company Reviews', to: '/company-reviews' },
            { label: 'Success Stories', to: '/success-stories' }
          ].map(link => (
            <Link key={link.label} to={link.to} style={{ display: 'block', color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '1rem', transition: 'all 0.2s ease' }}
            onMouseOver={e => e.currentTarget.style.color = '#7ba05b'}
            onMouseOut={e => e.currentTarget.style.color = '#94a3b8'}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Resources */}
        <div>
          <h4 style={{ color: '#f4f1eb', fontSize: '1.1rem', fontWeight: '800', marginBottom: '2rem', position: 'relative', paddingBottom: '0.8rem' }}>
            Growth Kit
            <span style={{ position: 'absolute', bottom: 0, left: 0, width: '40px', height: '3px', background: '#7ba05b', borderRadius: '2px' }}></span>
          </h4>
          {[
            { label: 'Resume Builder', to: '/resume-builder' },
            { label: 'Interview Prep', to: '/interview-prep' },
            { label: 'Career Guide', to: '/career-guide' },
            { label: 'Certification Courses', to: '/online-degree' },
            { label: 'Skill Assessment', to: '/interview-prep' }
          ].map(link => (
            <Link key={link.label} to={link.to} style={{ display: 'block', color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '1rem', transition: 'all 0.2s ease' }}
            onMouseOver={e => e.currentTarget.style.color = '#7ba05b'}
            onMouseOut={e => e.currentTarget.style.color = '#94a3b8'}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ color: '#f4f1eb', fontSize: '1.1rem', fontWeight: '800', marginBottom: '2rem', position: 'relative', paddingBottom: '0.8rem' }}>
            Get in Touch
            <span style={{ position: 'absolute', bottom: 0, left: 0, width: '40px', height: '3px', background: '#7ba05b', borderRadius: '2px' }}></span>
          </h4>
          <div style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '2.2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>📧 <span style={{ color: '#cbd5e1' }}>placement@itm.edu</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>📞 <span style={{ color: '#cbd5e1' }}>+91 9120592783</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>📍 <span style={{ color: '#cbd5e1' }}>ITM Campus, GIDA Gorakhpur</span></div>
          </div>
          <div style={{ marginTop: '2.5rem', background: 'rgba(123, 160, 91, 0.1)', border: '1px solid rgba(123, 160, 91, 0.2)', borderRadius: '16px', padding: '1.2rem' }}>
            <div style={{ color: '#7ba05b', fontWeight: '800', fontSize: '1.1rem', marginBottom: '0.3rem' }}>🚀 10,000+</div>
            <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: '500' }}>Students placed successfully</div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '3rem', background: 'rgba(0,0,0,0.1)' }}>
        <p style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: '500' }}>
          © {new Date().getFullYear()} ITM Placement Cell. Built with ❤️ for students.
        </p>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
            <a key={item} href="#" style={{ color: '#64748b', fontSize: '0.8rem', textDecoration: 'none', transition: 'all 0.2s ease', fontWeight: '600' }}
            onMouseOver={e => e.currentTarget.style.color = '#7ba05b'}
            onMouseOut={e => e.currentTarget.style.color = '#64748b'}>{item}</a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
