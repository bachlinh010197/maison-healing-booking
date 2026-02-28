import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useBooking } from '../hooks/useBooking';
import { SERVICES } from '../types/booking';
import type { Booking } from '../types/booking';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN').format(price) + ' VND';
};

const statusLabel = (status: string) => {
  switch (status) {
    case 'confirmed': return 'Confirmed';
    case 'cancelled': return 'Cancelled';
    case 'pending': return 'Pending';
    default: return status;
  }
};

const statusIcon = (status: string) => {
  switch (status) {
    case 'confirmed': return '✅';
    case 'cancelled': return '❌';
    case 'pending': return '⏳';
    default: return '📋';
  }
};

const MyBookingsPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { getUserBookings } = useBooking();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');

  useEffect(() => {
    if (user?.email) {
      fetchBookings();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchBookings = async () => {
    if (!user?.email) return;
    setLoading(true);
    const data = await getUserBookings(user.email);
    setBookings(data);
    setLoading(false);
  };

  if (authLoading) {
    return <div className="my-bookings-page"><div className="my-bookings-loading">Loading...</div></div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const filteredBookings = filter === 'all'
    ? bookings
    : bookings.filter((b) => b.status === filter);

  return (
    <div className="my-bookings-page">
      <div className="my-bookings-hero">
        <h1>My Bookings</h1>
        <p>View and track your sound healing sessions</p>
      </div>

      <div className="my-bookings-container">
        {selectedBooking ? (
          <div className="booking-detail">
            <button className="btn-back" onClick={() => setSelectedBooking(null)}>
              ← Back to list
            </button>

            <div className="booking-detail-card">
              <div className="booking-detail-header">
                <div className="booking-detail-title">
                  <h2>Booking #{selectedBooking.bookingCode}</h2>
                  <span className={`status-badge ${selectedBooking.status}`}>
                    {statusIcon(selectedBooking.status)} {statusLabel(selectedBooking.status)}
                  </span>
                </div>
              </div>

              <div className="booking-detail-grid">
                <div className="booking-detail-section">
                  <h3>Session Details</h3>
                  <div className="detail-row">
                    <span className="detail-label">📅 Date</span>
                    <span className="detail-value">{selectedBooking.date}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">🕐 Time</span>
                    <span className="detail-value">{selectedBooking.timeSlot}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">🎵 Service</span>
                    <span className="detail-value">
                      {SERVICES.find(s => s.type === selectedBooking.serviceType)?.name || selectedBooking.serviceType}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">👥 Guests</span>
                    <span className="detail-value">{selectedBooking.numberOfGuests}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">💰 Total</span>
                    <span className="detail-value detail-price">{formatPrice(selectedBooking.totalPrice)}</span>
                  </div>
                </div>

                <div className="booking-detail-section">
                  <h3>Contact Information</h3>
                  <div className="detail-row">
                    <span className="detail-label">👤 Name</span>
                    <span className="detail-value">{selectedBooking.name}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">📧 Email</span>
                    <span className="detail-value">{selectedBooking.email}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">📞 Phone</span>
                    <span className="detail-value">{selectedBooking.phone}</span>
                  </div>
                  {selectedBooking.notes && (
                    <div className="detail-row">
                      <span className="detail-label">📝 Notes</span>
                      <span className="detail-value">{selectedBooking.notes}</span>
                    </div>
                  )}
                </div>
              </div>

              {selectedBooking.status === 'pending' && (
                <div className="booking-detail-notice">
                  <p>⏳ Your booking is pending confirmation from our team. We will notify you via email once it's confirmed.</p>
                </div>
              )}

              <div className="booking-detail-contact">
                <p>Need help? Contact us:</p>
                <div className="contact-links">
                  <span className="contact-link">📞 +84 336 256 356</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="my-bookings-filters">
              <button
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All ({bookings.length})
              </button>
              <button
                className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                onClick={() => setFilter('pending')}
              >
                Pending ({bookings.filter((b) => b.status === 'pending').length})
              </button>
              <button
                className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`}
                onClick={() => setFilter('confirmed')}
              >
                Confirmed ({bookings.filter((b) => b.status === 'confirmed').length})
              </button>
              <button
                className={`filter-btn ${filter === 'cancelled' ? 'active' : ''}`}
                onClick={() => setFilter('cancelled')}
              >
                Cancelled ({bookings.filter((b) => b.status === 'cancelled').length})
              </button>
            </div>

            {loading ? (
              <div className="my-bookings-loading">Loading your bookings...</div>
            ) : filteredBookings.length === 0 ? (
              <div className="my-bookings-empty">
                <div className="empty-icon">📋</div>
                <h3>No bookings found</h3>
                <p>You haven't made any bookings yet.</p>
                <Link to="/booking" className="btn-primary">
                  Book a Session
                </Link>
              </div>
            ) : (
              <div className="my-bookings-list">
                {filteredBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className={`my-booking-card status-${booking.status}`}
                    onClick={() => setSelectedBooking(booking)}
                  >
                    <div className="my-booking-card-left">
                      <div className="my-booking-date">
                        <span className="date-day">{booking.date.split('-')[2]}</span>
                        <span className="date-month">{booking.date.split('-')[1]}/{booking.date.split('-')[0]}</span>
                      </div>
                    </div>
                    <div className="my-booking-card-center">
                      <h4>{SERVICES.find(s => s.type === booking.serviceType)?.name || booking.serviceType}</h4>
                      <div className="my-booking-info">
                        <span>🕐 {booking.timeSlot}</span>
                        <span>👥 {booking.numberOfGuests} {booking.numberOfGuests === 1 ? 'guest' : 'guests'}</span>
                        <span>#{booking.bookingCode}</span>
                      </div>
                    </div>
                    <div className="my-booking-card-right">
                      <span className={`status-badge ${booking.status}`}>
                        {statusLabel(booking.status)}
                      </span>
                      <span className="my-booking-price">{formatPrice(booking.totalPrice)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
