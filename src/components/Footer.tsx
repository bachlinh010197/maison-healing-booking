const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>Maison Soundhealing</h3>
          <p>Unwind & Recharged</p>
        </div>
        <div className="footer-info">
          <div className="footer-section">
            <h4>Lịch trình</h4>
            <p>Thứ 2 - Thứ 6: 17:30</p>
            <p>Thứ 7 - Chủ nhật: 11:00, 15:00, 17:30</p>
          </div>
          <div className="footer-section">
            <h4>Liên hệ</h4>
            <p>Email: bachdiem1993@gmail.com</p>
            <p>WhatsApp/Zalo/Phone: +84 336256356</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Maison Healing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
