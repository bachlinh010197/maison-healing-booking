import img5 from '../assets/KYN_0005.jpg';
import img6 from '../assets/KYN_0006.jpg';
import img7 from '../assets/KYN_0007.jpg';
import img8 from '../assets/KYN_0008.jpg';
import img9 from '../assets/KYN_0009.jpg';
import img10 from '../assets/KYN_0010.jpg';

const Footer = () => {
  const galleryImages = [img5, img6, img7, img8, img9, img10];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>Maison Soundhealing</h3>
          <p>Unwind & Recharged</p>
        </div>
        <div className="footer-info">
          <div className="footer-section">
            <h4>Schedule</h4>
            <p>Mon - Fri: 17:30</p>
            <p>Sat - Sun: 11:00, 15:00, 17:30</p>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: bachdiem1993@gmail.com</p>
            <p>WhatsApp/Zalo/Phone: +84 336256356</p>
          </div>
        </div>
        <div className="footer-gallery">
          <div className="footer-gallery-track">
            {galleryImages.concat(galleryImages).map((src, index) => (
              <div className="footer-gallery-item" key={index}>
                <img src={src} alt="Maison Soundhealing space" />
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Maison SoundHealing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
