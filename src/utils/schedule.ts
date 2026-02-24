import { format, getDay } from 'date-fns';
import type { ServiceType } from '../types/booking';

export const getTimeSlotsForDate = (date: Date): string[] => {
  const day = getDay(date); // 0 = Sunday, 6 = Saturday
  
  const slots: string[] = [];
  
  // Saturday (6) and Sunday (0): 11:00, 15:00, 17:30 (Group) + 19:00 (1:1)
  if (day === 0 || day === 6) {
    slots.push('11:00', '15:00', '17:30', '19:00');
  } else {
    // Monday-Friday: 17:30 (Group) + 19:00 (1:1)
    slots.push('17:30', '19:00');
  }
  
  return slots;
};

export const getServiceTypeForSlot = (time: string): ServiceType => {
  return time === '19:00' ? 'therapy-1-1' : 'group-sound-bath';
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
