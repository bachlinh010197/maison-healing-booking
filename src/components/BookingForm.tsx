import { useState } from 'react';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useBooking } from '../hooks/useBooking';
import { formatDate } from '../utils/schedule';

interface BookingFormProps {
  selectedDate: Date;
  selectedTime: string;
  onSuccess: (bookingId: string) => void;
  onBack: () => void;
}

const BookingForm = ({ selectedDate, selectedTime, onSuccess, onBack }: BookingFormProps) => {
  const { createBooking, loading, error } = useBooking();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    numberOfGuests: 1,
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const bookingId = await createBooking({
      ...formData,
      date: formatDate(selectedDate),
      timeSlot: selectedTime,
    });

    if (bookingId) {
      onSuccess(bookingId);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'numberOfGuests' ? parseInt(value) : value,
    }));
  };

  return (
    <div className="booking-form-container">
      <div className="booking-summary">
        <h3>Session Details</h3>
        <div className="summary-details">
          <div className="summary-item">
            <span className="summary-label">Date</span>
            <span className="summary-value">
              {format(selectedDate, 'EEEE, dd/MM/yyyy', { locale: enUS })}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Time</span>
            <span className="summary-value">{selectedTime}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        <h3>Personal Information</h3>
        
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Enter your phone number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="numberOfGuests">Number of Guests</label>
          <select
            id="numberOfGuests"
            name="numberOfGuests"
            value={formData.numberOfGuests}
            onChange={handleChange}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {`${n} ${n === 1 ? 'guest' : 'guests'}`}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional notes (optional)"
            rows={3}
          />
        </div>

        {error && <div className="form-error">{error}</div>}

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onBack}>
            Go Back
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Processing...' : 'Confirm Booking'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
