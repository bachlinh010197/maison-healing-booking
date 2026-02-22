import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
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
            Trang chủ
          </Link>
          <Link 
            to="/booking" 
            className={location.pathname === '/booking' ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            Đặt lịch
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
