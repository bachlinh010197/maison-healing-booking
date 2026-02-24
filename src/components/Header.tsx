import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginModal from './LoginModal';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo">
            <span className="logo-text">Maison Healing</span>
          </Link>

          <button 
            className={`menu-toggle ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`nav ${menuOpen ? 'open' : ''}`}>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/booking" 
              className={location.pathname === '/booking' ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              Booking
            </Link>
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className={location.pathname === '/admin' ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                Admin
              </Link>
            )}
          </nav>

          <div className="header-auth">
            {user ? (
              <div className="user-menu">
                <span className="user-name">{user.displayName}</span>
                <button className="btn-logout" onClick={handleLogout}>
                  Sign Out
                </button>
              </div>
            ) : (
              <button className="btn-login" onClick={() => setShowLogin(true)}>
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
};

export default Header;
