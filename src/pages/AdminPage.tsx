import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import type { Booking } from '../types/booking';

const AdminPage = () => {
  const { user, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'cancelled'>('all');

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        createdAt: d.data().createdAt?.toDate?.() || new Date(),
      })) as Booking[];
      setBookings(data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId: string, newStatus: 'confirmed' | 'cancelled') => {
    try {
      await updateDoc(doc(db, 'bookings', bookingId), { status: newStatus });
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
      );
    } catch (err) {
      console.error('Error updating booking:', err);
    }
  };

  if (authLoading) {
    return <div className="admin-loading">Loading...</div>;
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const filteredBookings = filter === 'all'
    ? bookings
    : bookings.filter((b) => b.status === filter);

  const statusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'cancelled': return 'Cancelled';
      case 'pending': return 'Pending';
      default: return status;
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Booking Management</h1>
        <p>Total: {bookings.length} bookings</p>
      </div>

      <div className="admin-container">
        <div className="admin-filters">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({bookings.length})
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
          <div className="admin-loading">Loading bookings...</div>
        ) : filteredBookings.length === 0 ? (
          <div className="admin-empty">No bookings found.</div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Guests</th>
                  <th>Notes</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className={`status-${booking.status}`}>
                    <td>{booking.date}</td>
                    <td>{booking.timeSlot}</td>
                    <td>{booking.name}</td>
                    <td>{booking.email}</td>
                    <td>{booking.phone}</td>
                    <td>{booking.numberOfGuests}</td>
                    <td>{booking.notes || '—'}</td>
                    <td>
                      <span className={`status-badge ${booking.status}`}>
                        {statusLabel(booking.status)}
                      </span>
                    </td>
                    <td>
                      {booking.status === 'confirmed' ? (
                        <button
                          className="action-btn cancel"
                          onClick={() => handleStatusChange(booking.id!, 'cancelled')}
                        >
                          Cancel
                        </button>
                      ) : booking.status === 'cancelled' ? (
                        <button
                          className="action-btn confirm"
                          onClick={() => handleStatusChange(booking.id!, 'confirmed')}
                        >
                          Restore
                        </button>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
