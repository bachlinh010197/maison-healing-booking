import { Link } from 'react-router-dom';
import Hero from '../components/Hero';

const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />

      <section className="section about-section">
        <div className="container">
          <span className="section-subtitle">✦ Về chúng tôi ✦</span>
          <h2>Âm thanh trị liệu</h2>
          <p className="section-description">
            Sound Healing - Chữa lành bằng âm thanh là phương pháp trị liệu cổ xưa, 
            sử dụng tần số rung động từ Gông, chuông thạch anh, chuông kim loại Nepal, chuông gió, trống sóng biển để đưa tâm trí vào trạng thái thiền định sâu, 
            giải phóng căng thẳng và khôi phục sự cân bằng năng lượng trong cơ thể.
          </p>
        </div>
      </section>

      <section className="section services-section">
        <div className="container">
          <span className="section-subtitle">✦ Trải nghiệm ✦</span>
          <h2>Dịch vụ của chúng tôi</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🎵</div>
              <h3>Sound-bath nhóm</h3>
              <p>
                Trải nghiệm tắm âm thanh theo nhóm với Gông, chuông thạch anh, chuông kim loại Nepal, chuông gió, trống sóng biển. 
                Thư giãn tuyệt đối trong không gian yên bình.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">🧘</div>
              <h3>Soundhealing therapy 1:1</h3>
              <p>
                Liệu trình chữa lành bằng âm thanh cá nhân, được thiết kế riêng 
                để đáp ứng nhu cầu trị liệu của bạn.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section schedule-section">
        <div className="container">
          <span className="section-subtitle">✦ Lịch trình ✦</span>
          <h2>Thời gian hoạt động</h2>
          <div className="schedule-grid">
            <div className="schedule-card">
              <h3>Thứ 2 - Thứ 6</h3>
              <div className="schedule-time">
                <span className="time-badge">17:30</span>
              </div>
              <p>Buổi tối hàng ngày</p>
            </div>
            <div className="schedule-card highlight">
              <h3>Thứ 7 - Chủ nhật</h3>
              <div className="schedule-time">
                <span className="time-badge">11:00</span>
                <span className="time-badge">15:00</span>
                <span className="time-badge">17:30</span>
              </div>
              <p>3 buổi mỗi ngày</p>
            </div>
          </div>
          <Link to="/booking" className="btn-primary" style={{ marginTop: '2rem' }}>
            Đặt lịch ngay
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
