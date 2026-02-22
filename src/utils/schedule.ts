import { format, isWeekend, getDay } from 'date-fns';

export const getTimeSlotsForDate = (date: Date): string[] => {
  const day = getDay(date); // 0 = Sunday, 6 = Saturday
  
  const slots: string[] = [];
  
  // Saturday (6) and Sunday (0): 11:00, 15:00, 17:30
  if (day === 0 || day === 6) {
    slots.push('11:00', '15:00', '17:30');
  } else {
    // Monday-Friday: only 17:30
    slots.push('17:30');
  }
  
  return slots;
};

export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const formatDisplayDate = (date: Date): string => {
  return format(date, 'EEEE, dd MMMM yyyy');
};

export const isDateInPast = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};
