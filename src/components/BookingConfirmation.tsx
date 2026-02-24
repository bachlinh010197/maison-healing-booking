import { Link } from 'react-router-dom';

interface BookingConfirmationProps {
  bookingId: string;
  date: string;
  time: string;
  service?: string;
  totalPrice?: number;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN').format(price) + ' VND';
};

const BookingConfirmation = ({ bookingId, date, time, service, totalPrice }: BookingConfirmationProps) => {
  return (
    <div className="booking-confirmation">
      <div className="confirmation-icon">✓</div>
      <h2>Booking Confirmed!</h2>
      <p className="confirmation-message">
        Thank you for booking with Maison SoundHealing. We will send a confirmation to your email.
      </p>
      <div className="confirmation-details">
        <div className="detail-item">
          <span className="detail-label">Booking ID</span>
          <span className="detail-value">#{bookingId.slice(0, 8).toUpperCase()}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Date</span>
          <span className="detail-value">{date}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Time</span>
          <span className="detail-value">{time}</span>
        </div>
        {service && (
          <div className="detail-item">
            <span className="detail-label">Service</span>
            <span className="detail-value">{service}</span>
          </div>
        )}
        {totalPrice != null && (
          <div className="detail-item">
            <span className="detail-label">Total</span>
            <span className="detail-value detail-price">{formatPrice(totalPrice)}</span>
          </div>
        )}
      </div>
      <div className="confirmation-actions">
        <Link to="/" className="btn-secondary">
          Back to Home
        </Link>
        <Link to="/booking" className="btn-primary" onClick={() => window.location.reload()}>
          Book Another
        </Link>
      </div>
    </div>
  );
};

export default BookingConfirmation;
