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
    return <div className="admin-loading">Đang tải...</div>;
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const filteredBookings = filter === 'all'
    ? bookings
    : bookings.filter((b) => b.status === filter);

  const statusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Đã xác nhận';
      case 'cancelled': return 'Đã hủy';
      case 'pending': return 'Chờ xử lý';
      default: return status;
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Quản lý đặt lịch</h1>
        <p>Tổng cộng: {bookings.length} lượt đặt</p>
      </div>

      <div className="admin-container">
        <div className="admin-filters">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Tất cả ({bookings.length})
          </button>
          <button
            className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`}
            onClick={() => setFilter('confirmed')}
          >
            Đã xác nhận ({bookings.filter((b) => b.status === 'confirmed').length})
          </button>
          <button
            className={`filter-btn ${filter === 'cancelled' ? 'active' : ''}`}
            onClick={() => setFilter('cancelled')}
          >
            Đã hủy ({bookings.filter((b) => b.status === 'cancelled').length})
          </button>
        </div>

        {loading ? (
          <div className="admin-loading">Đang tải danh sách...</div>
        ) : filteredBookings.length === 0 ? (
          <div className="admin-empty">Không có lịch đặt nào.</div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Ngày</th>
                  <th>Giờ</th>
                  <th>Họ tên</th>
                  <th>Email</th>
                  <th>SĐT</th>
                  <th>Số người</th>
                  <th>Ghi chú</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
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
                          Hủy
                        </button>
                      ) : booking.status === 'cancelled' ? (
                        <button
                          className="action-btn confirm"
                          onClick={() => handleStatusChange(booking.id!, 'confirmed')}
                        >
                          Khôi phục
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
