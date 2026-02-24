import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import aboutImg from '../assets/KYN_0002.jpg';
import serviceBathImg from '../assets/KYN_0003.jpg';
import serviceOneImg from '../assets/KYN_0004.jpg';

const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />

      <section className="section about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <img src={aboutImg} alt="Sound Healing Therapy" />
            </div>
            <div className="about-text">
              <span className="section-subtitle">✦ About Us ✦</span>
              <h2>Sound Healing Therapy</h2>
              <p className="section-description">
                Sound Healing is an ancient therapeutic method that uses vibrational frequencies from Gongs, singing bowls, wind chimes, and ocean drums to bring the mind into a deep meditative state, release stress, and restore energy balance in the body.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section services-section">
        <div className="container">
          <span className="section-subtitle">✦ Experience ✦</span>
          <h2>Our Services</h2>
          <div className="services-grid">
            <Link to="/booking" className="service-card service-card-link">
              <div className="service-card-image">
                <img src={serviceBathImg} alt="Group Sound Bath" />
              </div>
              <div className="service-card-body">
                <h3>Group Sound Bath</h3>
                <span className="service-price">350,000 VND/pax</span>
                <p>
                  Experience a group sound bath with Gongs, singing bowls, wind chimes, and ocean drums. Absolute relaxation in a peaceful space.
                </p>
                <span className="service-book-btn">Book Now →</span>
              </div>
            </Link>
            <Link to="/booking" className="service-card service-card-link">
              <div className="service-card-image">
                <img src={serviceOneImg} alt="Soundhealing therapy 1:1" />
              </div>
              <div className="service-card-body">
                <h3>Soundhealing therapy 1:1</h3>
                <span className="service-price">1,000,000 VND/session</span>
                <p>
                  A personalized sound healing session, specially designed to meet your individual therapeutic needs.
                </p>
                <span className="service-book-btn">Book Now →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="section courses-cta-section">
        <div className="container">
          <span className="section-subtitle">✦ Training ✦</span>
          <h2>Course Registration</h2>
          <p className="section-description">
            Sound therapy training using ancient Nepalese methods. 2 courses available: Basic (20h) and Advanced (35h).
            Get off when you register 10 days before the course starts.
          </p>
          <Link to="/courses" className="btn-primary" style={{ marginTop: '2rem' }}>
            View Details
          </Link>
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
