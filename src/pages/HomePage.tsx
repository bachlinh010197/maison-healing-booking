import { Link } from 'react-router-dom';
import Hero from '../components/Hero';

const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />

      <section className="section about-section">
        <div className="container">
          <span className="section-subtitle">✦ About Us ✦</span>
          <h2>Sound Healing Therapy</h2>
          <p className="section-description">
            Sound Healing is an ancient therapeutic method that uses vibrational frequencies from Gongs, crystal singing bowls, Nepalese metal bells, wind chimes, and ocean drums to bring the mind into a deep meditative state, release stress, and restore energy balance in the body.
          </p>
        </div>
      </section>

      <section className="section services-section">
        <div className="container">
          <span className="section-subtitle">✦ Experience ✦</span>
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🎵</div>
              <h3>Group Sound Bath</h3>
              <p>
                Experience a group sound bath with Gongs, crystal singing bowls, Nepalese metal bells, wind chimes, and ocean drums. Absolute relaxation in a peaceful space.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">🧘</div>
              <h3>Soundhealing therapy 1:1</h3>
              <p>
                A personalized sound healing session, specially designed to meet your individual therapeutic needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section schedule-section">
        <div className="container">
          <span className="section-subtitle">✦ Schedule ✦</span>
          <h2>Operating Hours</h2>
          <div className="schedule-grid">
            <div className="schedule-card">
              <h3>Mon - Fri</h3>
              <div className="schedule-time">
                <span className="time-badge">17:30</span>
              </div>
              <p>Evening session daily</p>
            </div>
            <div className="schedule-card highlight">
              <h3>Sat - Sun</h3>
              <div className="schedule-time">
                <span className="time-badge">11:00</span>
                <span className="time-badge">15:00</span>
                <span className="time-badge">17:30</span>
              </div>
              <p>3 sessions per day</p>
            </div>
          </div>
          <Link to="/booking" className="btn-primary" style={{ marginTop: '2rem' }}>
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
