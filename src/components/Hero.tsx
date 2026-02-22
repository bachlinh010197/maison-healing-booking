import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <span className="hero-subtitle">✦ Chữa lành bằng âm thanh ✦</span>
        <h1>Maison Healing</h1>
        <p className="hero-description">
          Khám phá hành trình chữa lành sâu sắc qua âm thanh trị liệu. 
          Trải nghiệm sự kết hợp hoàn hảo giữa chuông xoay, gong và các nhạc cụ 
          truyền thống, mang đến sự thư giãn tuyệt đối cho tâm hồn và cơ thể.
        </p>
        <Link to="/booking" className="btn-primary">
          Đặt lịch ngay
        </Link>
      </div>
    </section>
  );
};

export default Hero;
