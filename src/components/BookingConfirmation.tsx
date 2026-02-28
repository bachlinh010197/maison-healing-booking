import { Link } from 'react-router-dom';
import type { Location } from '../utils/schedule';

interface BookingConfirmationProps {
  bookingCode: string;
  date: string;
  time: string;
  service?: string;
  totalPrice?: number;
  location?: Location;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN').format(price) + ' VND';
};

const BookingConfirmation = ({ bookingCode, date, time, service, totalPrice, location }: BookingConfirmationProps) => {
  return (
    <div className="booking-confirmation">
      <div className="confirmation-icon">⏳</div>
      <h2>Booking Submitted!</h2>
      <p className="confirmation-message">
        Thank you for booking with Maison SoundHealing. Your booking is pending confirmation from our team. We will notify you via email once it's confirmed.
      </p>
      <div className="confirmation-details">
        <div className="detail-item">
          <span className="detail-label">Booking ID</span>
          <span className="detail-value">#{bookingCode}</span>
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
      <div className="confirmation-contact">
        <p>If you have any questions, please contact us:</p>
        <div className="contact-links">
          <div className="contact-link">
            📞 +84 336 256 356
          </div>
          <a
            href={location?.googleMapsLink || 'https://www.google.com/maps/place/3A+Ch%E1%BA%BF+Lan+Vi%C3%AAn'}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            📍 {location?.address || '3A Che Lan Vien Street, Da Nang City'}
          </a>
        </div>
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
