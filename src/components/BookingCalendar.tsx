import { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
} from 'date-fns';
import { vi } from 'date-fns/locale';
import { isDateInPast } from '../utils/schedule';

interface BookingCalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

const BookingCalendar = ({ selectedDate, onSelectDate }: BookingCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  const renderDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

    const days: JSX.Element[] = [];
    let day = startDate;

    while (day <= endDate) {
      const currentDay = day;
      const inPast = isDateInPast(currentDay);
      const inMonth = isSameMonth(currentDay, currentMonth);
      const selected = selectedDate ? isSameDay(currentDay, selectedDate) : false;
      const today = isToday(currentDay);
      const dayNum = currentDay.getDay();
      const isWeekendDay = dayNum === 0 || dayNum === 6;

      let className = 'calendar-day';
      if (!inMonth) className += ' other-month';
      if (inPast) className += ' past';
      if (selected) className += ' selected';
      if (today) className += ' today';
      if (isWeekendDay && inMonth && !inPast) className += ' weekend';

      days.push(
        <button
          key={currentDay.toISOString()}
          className={className}
          onClick={() => !inPast && inMonth && onSelectDate(currentDay)}
          disabled={inPast || !inMonth}
        >
          <span className="day-number">{format(currentDay, 'd')}</span>
          {isWeekendDay && inMonth && !inPast && (
            <span className="slot-indicator">3 suất</span>
          )}
          {!isWeekendDay && inMonth && !inPast && (
            <span className="slot-indicator">1 suất</span>
          )}
        </button>
      );

      day = addDays(day, 1);
    }

    return days;
  };

  return (
    <div className="booking-calendar">
      <div className="calendar-header">
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="month-nav">
          ‹
        </button>
        <h3>{format(currentMonth, 'MMMM yyyy', { locale: vi })}</h3>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="month-nav">
          ›
        </button>
      </div>
      <div className="calendar-weekdays">
        {weekDays.map((day) => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-grid">{renderDays()}</div>
    </div>
  );
};

export default BookingCalendar;
