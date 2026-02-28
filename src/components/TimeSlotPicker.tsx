import { getTimeSlotsForDate, getServiceTypeForSlot, getLocationForSlot, isSanctuarySlot, getGroupPriceForSlot } from '../utils/schedule';

interface TimeSlotPickerProps {
  selectedDate: Date;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN').format(price) + ' VND';
};

const TimeSlotPicker = ({ selectedDate, selectedTime, onSelectTime }: TimeSlotPickerProps) => {
  const slots = getTimeSlotsForDate(selectedDate);

  const getSlotLabel = (time: string) => {
    switch (time) {
      case '11:00':
        return 'Morning';
      case '15:00':
        return 'Afternoon';
      case '17:30':
      case '19:00':
      case '19:30':
        return 'Evening';
      default:
        return '';
    }
  };

  return (
    <div className="time-slot-picker">
      <h3>Select a Time Slot</h3>
      <div className="time-slots">
        {slots.map((time) => {
          const serviceType = getServiceTypeForSlot(time);
          const isTherapy = serviceType === 'therapy-1-1';
          const isSanctuary = isSanctuarySlot(selectedDate, time);
          const location = getLocationForSlot(selectedDate, time);
          return (
            <button
              key={time}
              className={`time-slot ${selectedTime === time ? 'selected' : ''} ${isTherapy ? 'therapy-slot' : 'group-slot'}`}
              onClick={() => onSelectTime(time)}
            >
              <span className="time-value">{time}</span>
              <span className="time-label">{getSlotLabel(time)}</span>
              <span className={`time-service-tag ${isTherapy ? 'tag-therapy' : 'tag-group'}`}>
                {isTherapy ? 'Therapy 1:1' : `Group · ${formatPrice(getGroupPriceForSlot(selectedDate, time))}`}
              </span>
              {isSanctuary && (
                <span className="time-location-tag">📍 {location.name}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlotPicker;
