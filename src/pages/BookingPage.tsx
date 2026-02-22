import { useState } from 'react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import BookingCalendar from '../components/BookingCalendar';
import TimeSlotPicker from '../components/TimeSlotPicker';
import BookingForm from '../components/BookingForm';
import BookingConfirmation from '../components/BookingConfirmation';

type BookingStep = 'select-date' | 'select-time' | 'fill-form' | 'confirmation';

const BookingPage = () => {
  const [step, setStep] = useState<BookingStep>('select-date');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string>('');

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setStep('select-time');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep('fill-form');
  };

  const handleBookingSuccess = (id: string) => {
    setBookingId(id);
    setStep('confirmation');
  };

  const steps = [
    { key: 'select-date', label: 'Chọn ngày', number: 1 },
    { key: 'select-time', label: 'Chọn giờ', number: 2 },
    { key: 'fill-form', label: 'Thông tin', number: 3 },
    { key: 'confirmation', label: 'Xác nhận', number: 4 },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === step);

  return (
    <div className="booking-page">
      <div className="booking-hero">
        <h1>Đặt lịch trị liệu</h1>
        <p>Chọn ngày và giờ phù hợp để bắt đầu hành trình chữa lành của bạn</p>
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
              <h2>Chọn ngày trị liệu</h2>
              <p className="step-description">
                Cuối tuần có 3 khung giờ (11:00, 15:00, 17:30). Các ngày trong tuần có 1 khung giờ (17:30).
              </p>
              <BookingCalendar selectedDate={selectedDate} onSelectDate={handleDateSelect} />
            </div>
          )}

          {step === 'select-time' && selectedDate && (
            <div className="step-content">
              <h2>Chọn khung giờ</h2>
              <p className="step-description">
                Ngày đã chọn: {format(selectedDate, 'EEEE, dd/MM/yyyy', { locale: vi })}
              </p>
              <TimeSlotPicker
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onSelectTime={handleTimeSelect}
              />
              <button className="btn-secondary" onClick={() => setStep('select-date')}>
                ← Chọn ngày khác
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
              bookingId={bookingId}
              date={format(selectedDate, 'EEEE, dd/MM/yyyy', { locale: vi })}
              time={selectedTime}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
