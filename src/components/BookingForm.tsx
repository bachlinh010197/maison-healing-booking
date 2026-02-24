import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useBooking } from '../hooks/useBooking';
import { formatDate } from '../utils/schedule';
import { SERVICES } from '../types/booking';
import type { ServiceType } from '../types/booking';

interface BookingFormProps {
  selectedDate: Date;
  selectedTime: string;
  defaultService?: ServiceType;
  onSuccess: (bookingId: string, serviceType?: ServiceType, totalPrice?: number) => void;
  onBack: () => void;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN').format(price) + ' VND';
};

const BookingForm = ({ selectedDate, selectedTime, defaultService, onSuccess, onBack }: BookingFormProps) => {
  const { createBooking, loading, error } = useBooking();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: (defaultService || 'group-sound-bath') as ServiceType,
    numberOfGuests: 1,
    notes: '',
  });

  const selectedService = useMemo(
    () => SERVICES.find((s) => s.type === formData.serviceType)!,
    [formData.serviceType]
  );

  const totalPrice = useMemo(() => {
    if (formData.serviceType === 'group-sound-bath') {
      return selectedService.price * formData.numberOfGuests;
    }
    return selectedService.price;
  }, [formData.serviceType, formData.numberOfGuests, selectedService.price]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const bookingId = await createBooking({
      ...formData,
      date: formatDate(selectedDate),
      timeSlot: selectedTime,
      totalPrice,
    });

    if (bookingId) {
      onSuccess(bookingId, formData.serviceType, totalPrice);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'numberOfGuests' ? parseInt(value) : value,
    }));
  };

  const handleServiceSelect = (type: ServiceType) => {
    setFormData((prev) => ({
      ...prev,
      serviceType: type,
      numberOfGuests: type === 'therapy-1-1' ? 1 : prev.numberOfGuests,
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
        <h3>Select Service</h3>

        <div className="service-options">
          {SERVICES.map((service) => (
            <div
              key={service.type}
              className={`service-option ${formData.serviceType === service.type ? 'selected' : ''}`}
              onClick={() => handleServiceSelect(service.type)}
            >
              <div className="service-option-radio">
                <div className="radio-dot" />
              </div>
              <div className="service-option-info">
                <span className="service-option-name">{service.name}</span>
                <span className="service-option-price">{formatPrice(service.price)}/{service.unit}</span>
              </div>
            </div>
          ))}
        </div>

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

        {formData.serviceType === 'group-sound-bath' && (
          <div className="form-group">
            <label htmlFor="numberOfGuests">Number of Guests</label>
            <select
              id="numberOfGuests"
              name="numberOfGuests"
              value={formData.numberOfGuests}
              onChange={handleChange}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <option key={n} value={n}>
                  {`${n} ${n === 1 ? 'guest' : 'guests'}`}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="booking-total">
          <div className="total-row">
            <span className="total-label">Service</span>
            <span className="total-value">{selectedService.name}</span>
          </div>
          {formData.serviceType === 'group-sound-bath' && (
            <div className="total-row">
              <span className="total-label">Guests</span>
              <span className="total-value">{formData.numberOfGuests} × {formatPrice(selectedService.price)}</span>
            </div>
          )}
          <div className="total-row total-final">
            <span className="total-label">Total</span>
            <span className="total-value total-price">{formatPrice(totalPrice)}</span>
          </div>
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
