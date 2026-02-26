export interface TimeSlot {
  time: string;
  available: boolean;
}

export type ServiceType = 'group-sound-bath' | 'therapy-1-1';

export interface ServiceOption {
  type: ServiceType;
  name: string;
  price: number;
  unit: string;
}

export const SERVICES: ServiceOption[] = [
  { type: 'group-sound-bath', name: 'Group Sound Bath', price: 350000, unit: 'pax' },
  { type: 'therapy-1-1', name: 'Soundhealing Therapy 1:1', price: 800000, unit: 'session' },
];

export interface Booking {
  id?: string;
  bookingCode: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  serviceType: ServiceType;
  numberOfGuests: number;
  totalPrice: number;
  notes?: string;
  createdAt: Date;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface DaySchedule {
  dayOfWeek: number;
  timeSlots: string[];
}

export const MAX_BOOKINGS_PER_DAY = 6;
