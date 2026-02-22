import { Link } from 'react-router-dom';

interface BookingConfirmationProps {
  bookingId: string;
  date: string;
  time: string;
}

const BookingConfirmation = ({ bookingId, date, time }: BookingConfirmationProps) => {
  return (
    <div className="booking-confirmation">
      <div className="confirmation-icon">✓</div>
      <h2>Đặt lịch thành công!</h2>
      <p className="confirmation-message">
        Cảm ơn bạn đã đặt lịch tại Maison Healing. Chúng tôi sẽ liên hệ xác nhận qua email.
      </p>
      <div className="confirmation-details">
        <div className="detail-item">
          <span className="detail-label">Mã đặt lịch</span>
          <span className="detail-value">#{bookingId.slice(0, 8).toUpperCase()}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Ngày</span>
          <span className="detail-value">{date}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Giờ</span>
          <span className="detail-value">{time}</span>
        </div>
      </div>
      <div className="confirmation-actions">
        <Link to="/" className="btn-secondary">
          Về trang chủ
        </Link>
        <Link to="/booking" className="btn-primary" onClick={() => window.location.reload()}>
          Đặt lịch khác
        </Link>
      </div>
    </div>
  );
};

export default BookingConfirmation;
