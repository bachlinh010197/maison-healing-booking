import { useState } from 'react';
import { format } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import BookingCalendar from '../components/BookingCalendar';
import TimeSlotPicker from '../components/TimeSlotPicker';
import BookingForm from '../components/BookingForm';
import BookingConfirmation from '../components/BookingConfirmation';
import { SERVICES } from '../types/booking';
import type { ServiceType } from '../types/booking';

type BookingStep = 'select-date' | 'select-time' | 'fill-form' | 'confirmation';

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service') as ServiceType | null;
  const defaultService: ServiceType = serviceParam && ['group-sound-bath', 'therapy-1-1'].includes(serviceParam)
    ? serviceParam
    : 'group-sound-bath';

  const [step, setStep] = useState<BookingStep>('select-date');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string>('');
  const [bookedService, setBookedService] = useState<ServiceType>('group-sound-bath');
  const [bookedPrice, setBookedPrice] = useState<number>(0);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setStep('select-time');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep('fill-form');
  };

  const handleBookingSuccess = (id: string, serviceType?: ServiceType, totalPrice?: number) => {
    setBookingId(id);
    if (serviceType) setBookedService(serviceType);
    if (totalPrice != null) setBookedPrice(totalPrice);
    setStep('confirmation');
  };

  const steps = [
    { key: 'select-date', label: 'Select Date', number: 1 },
    { key: 'select-time', label: 'Select Time', number: 2 },
    { key: 'fill-form', label: 'Details', number: 3 },
    { key: 'confirmation', label: 'Confirm', number: 4 },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === step);

  return (
    <div className="booking-page">
      <div className="booking-hero">
        <h1>Book a Sound Healing Session</h1>
        <p>Choose a date and time to begin your healing journey</p>
      </div>

      <div className="booking-container">
        <div className="booking-steps">
          {steps.map((s, index) => (
            <div
              key={s.key}
              className={`step ${index <= currentStepIndex ? 'active' : ''} ${
                index < currentStepIndex ? 'completed' : ''
              }`}
            >
              <div className="step-number">
                {index < currentStepIndex ? '✓' : s.number}
              </div>
              <span className="step-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="booking-content">
          {step === 'select-date' && (
            <div className="step-content">
              <h2>Select a Date</h2>
              <p className="step-description">
                Weekends have 3 time slots (11:00, 15:00, 17:30). Weekdays have 1 time slot (17:30).
              </p>
              <BookingCalendar selectedDate={selectedDate} onSelectDate={handleDateSelect} />
            </div>
          )}

          {step === 'select-time' && selectedDate && (
            <div className="step-content">
              <h2>Select a Time Slot</h2>
              <p className="step-description">
                Selected date: {format(selectedDate, 'EEEE, dd/MM/yyyy')}
              </p>
              <TimeSlotPicker
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onSelectTime={handleTimeSelect}
              />
              <button className="btn-secondary" onClick={() => setStep('select-date')}>
                ← Choose Another Date
              </button>
            </div>
          )}

          {step === 'fill-form' && selectedDate && selectedTime && (
            <BookingForm
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              defaultService={defaultService}
              onSuccess={handleBookingSuccess}
              onBack={() => setStep('select-time')}
            />
          )}

          {step === 'confirmation' && selectedDate && selectedTime && (
            <BookingConfirmation
              bookingId={bookingId}
              date={format(selectedDate, 'EEEE, dd/MM/yyyy')}
              time={selectedTime}
              service={SERVICES.find(s => s.type === bookedService)?.name}
              totalPrice={bookedPrice}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
