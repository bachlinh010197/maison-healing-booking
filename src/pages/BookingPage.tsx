import { useState, useCallback } from 'react';
import { format } from 'date-fns';
import BookingCalendar from '../components/BookingCalendar';
import TimeSlotPicker from '../components/TimeSlotPicker';
import BookingForm from '../components/BookingForm';
import BookingConfirmation from '../components/BookingConfirmation';
import { SERVICES } from '../types/booking';
import type { ServiceType } from '../types/booking';
import { useBooking } from '../hooks/useBooking';
import { getLocationForSlot } from '../utils/schedule';

type BookingStep = 'select-date' | 'select-time' | 'fill-form' | 'confirmation';

const BookingPage = () => {
  const [step, setStep] = useState<BookingStep>('select-date');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingCode, setBookingCode] = useState<string>('');
  const [bookedService, setBookedService] = useState<ServiceType>('group-sound-bath');
  const [bookedPrice, setBookedPrice] = useState<number>(0);
  const [bookingCounts, setBookingCounts] = useState<Record<string, number>>({});
  const { getBookingCountsForMonth } = useBooking();

  const handleMonthChange = useCallback(async (year: number, month: number) => {
    const counts = await getBookingCountsForMonth(year, month);
    setBookingCounts(counts);
  }, [getBookingCountsForMonth]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setStep('select-time');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep('fill-form');
  };

  const handleBookingSuccess = (code: string, serviceType?: ServiceType, totalPrice?: number) => {
    setBookingCode(code);
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
                Group Sound Bath: weekends 11:00, 15:00, 17:30 · weekdays 17:30 · Tue &amp; Thu 19:00 @ The Sanctuary. Therapy 1:1: 19:30 every day.
              </p>
              <BookingCalendar
                selectedDate={selectedDate}
                onSelectDate={handleDateSelect}
                bookingCounts={bookingCounts}
                onMonthChange={handleMonthChange}
              />
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
              onSuccess={handleBookingSuccess}
              onBack={() => setStep('select-time')}
            />
          )}

          {step === 'confirmation' && selectedDate && selectedTime && (
            <BookingConfirmation
              bookingCode={bookingCode}
              date={format(selectedDate, 'EEEE, dd/MM/yyyy')}
              time={selectedTime}
              service={SERVICES.find(s => s.type === bookedService)?.name}
              totalPrice={bookedPrice}
              location={getLocationForSlot(selectedDate, selectedTime)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
