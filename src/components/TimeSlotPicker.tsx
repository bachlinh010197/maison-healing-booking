import { getTimeSlotsForDate } from '../utils/schedule';

interface TimeSlotPickerProps {
  selectedDate: Date;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

const TimeSlotPicker = ({ selectedDate, selectedTime, onSelectTime }: TimeSlotPickerProps) => {
  const slots = getTimeSlotsForDate(selectedDate);

  const getSlotLabel = (time: string) => {
    switch (time) {
      case '11:00':
        return 'Buổi sáng';
      case '15:00':
        return 'Buổi chiều';
      case '17:30':
        return 'Buổi tối';
      default:
        return '';
    }
  };

  return (
    <div className="time-slot-picker">
      <h3>Chọn khung giờ</h3>
      <div className="time-slots">
        {slots.map((time) => (
          <button
            key={time}
            className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
            onClick={() => onSelectTime(time)}
          >
            <span className="time-value">{time}</span>
            <span className="time-label">{getSlotLabel(time)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlotPicker;
