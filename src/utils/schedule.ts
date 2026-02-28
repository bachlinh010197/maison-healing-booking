import { format, getDay } from 'date-fns';
import type { ServiceType } from '../types/booking';

export interface Location {
  name: string;
  address: string;
  googleMapsLink: string;
}

export const LOCATIONS = {
  main: {
    name: 'Maison Soundhealing',
    address: '3A Che Lan Vien Street, Da Nang City',
    googleMapsLink: 'https://www.google.com/maps/place/3A+Ch%E1%BA%BF+Lan+Vi%C3%AAn,+B%E1%BA%AFc+M%E1%BB%B9+An,+Ng%C5%A9+H%C3%A0nh+S%C6%A1n,+%C4%90%C3%A0+N%E1%BA%B5ng+556920,+Vi%E1%BB%87t+Nam/@16.0435717,108.2425689,17z/data=!3m1!4b1!4m6!3m5!1s0x31421766c0014a4b:0x9cafd588e1a29688!8m2!3d16.0435666!4d108.2451438!16s%2Fg%2F11s38nv9_r?entry=ttu&g_ep=EgoyMDI2MDIyMi4wIKXMDSoASAFQAw%3D%3D',
  },
  sanctuary: {
    name: 'The Sanctuary',
    address: '20A Mỹ Đa Đông 8, Bắc Mỹ An, Ngũ Hành Sơn, Đà Nẵng',
    googleMapsLink: 'https://maps.app.goo.gl/R2EpL2Auc71JXEA77',
  },
} satisfies Record<string, Location>;

export const isSanctuarySlot = (date: Date, time: string): boolean => {
  const day = getDay(date);
  return time === '19:00' && (day === 2 || day === 4);
};

export const getLocationForSlot = (date: Date, time: string): Location => {
  return isSanctuarySlot(date, time) ? LOCATIONS.sanctuary : LOCATIONS.main;
};

export const getTimeSlotsForDate = (date: Date): string[] => {
  const day = getDay(date); // 0 = Sunday, 6 = Saturday
  
  const slots: string[] = [];
  
  // Saturday (6) and Sunday (0): 11:00, 15:00, 17:30 (Group) + 19:30 (1:1)
  if (day === 0 || day === 6) {
    slots.push('11:00', '15:00', '17:30', '19:30');
  } else if (day === 2 || day === 4) {
    // Tue & Thu: only 19:00 (Group @ Sanctuary)
    slots.push('19:00');
  } else {
    // Mon, Fri: 17:30 (Group) + 19:30 (1:1)
    slots.push('17:30', '19:30');
  }
  
  return slots;
};

export const getServiceTypeForSlot = (time: string): ServiceType => {
  return time === '19:30' ? 'therapy-1-1' : 'group-sound-bath';
};

export const getGroupPriceForSlot = (date: Date, time: string): number => {
  return isSanctuarySlot(date, time) ? 300000 : 350000;
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
