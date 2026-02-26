import { useState, useEffect } from 'react';
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
  getYear,
  getMonth,
} from 'date-fns';

import { isDateInPast } from '../utils/schedule';
import { MAX_BOOKINGS_PER_DAY } from '../types/booking';

interface BookingCalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  bookingCounts: Record<string, number>;
  onMonthChange: (year: number, month: number) => void;
}

const BookingCalendar = ({ selectedDate, onSelectDate, bookingCounts, onMonthChange }: BookingCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    onMonthChange(getYear(currentMonth), getMonth(currentMonth) + 1);
  }, [currentMonth, onMonthChange]);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const renderDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

    const days: React.ReactElement[] = [];
    let day = startDate;

    while (day <= endDate) {
      const currentDay = day;
      const inPast = isDateInPast(currentDay);
      const inMonth = isSameMonth(currentDay, currentMonth);
      const selected = selectedDate ? isSameDay(currentDay, selectedDate) : false;
      const today = isToday(currentDay);
      const dayNum = currentDay.getDay();
      const isWeekendDay = dayNum === 0 || dayNum === 6;

      const dateKey = format(currentDay, 'yyyy-MM-dd');
      const booked = bookingCounts[dateKey] || 0;
      const remaining = MAX_BOOKINGS_PER_DAY - booked;
      const isFullyBooked = remaining <= 0;

      const isDisabled = inPast || !inMonth || isFullyBooked;

      let className = 'calendar-day';
      if (!inMonth) className += ' other-month';
      if (inPast) className += ' past';
      if (selected) className += ' selected';
      if (today) className += ' today';
      if (isWeekendDay && inMonth && !inPast) className += ' weekend';
      if (isFullyBooked && inMonth && !inPast) className += ' fully-booked';

      days.push(
        <button
          key={currentDay.toISOString()}
          className={className}
          onClick={() => !isDisabled && onSelectDate(currentDay)}
          disabled={isDisabled}
        >
          <span className="day-number">{format(currentDay, 'd')}</span>
          {inMonth && !inPast && (
            isFullyBooked ? (
              <span className="slot-indicator full">Full</span>
            ) : (
              <span className="slot-indicator">{remaining} left</span>
            )
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
        <button onClick={handlePrevMonth} className="month-nav">
          ‹
        </button>
        <h3>{format(currentMonth, 'MMMM yyyy')}</h3>
        <button onClick={handleNextMonth} className="month-nav">
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
