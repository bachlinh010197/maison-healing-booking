import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <span className="hero-subtitle">✦ Healing Through Sound ✦</span>
        <h1>Maison Healing</h1>
        <p className="hero-description">
          Discover a profound healing journey through therapeutic sound. 
          Experience the perfect harmony of Gongs, crystal singing bowls, Nepalese metal bells, wind chimes, and ocean drums, bringing absolute relaxation to your mind and body.
        </p>
        <Link to="/booking" className="btn-primary">
          Book Now
        </Link>
      </div>
    </section>
  );
};

export default Hero;
