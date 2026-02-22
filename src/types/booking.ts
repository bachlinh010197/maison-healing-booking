export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Booking {
  id?: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  numberOfGuests: number;
  notes?: string;
  createdAt: Date;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface DaySchedule {
  dayOfWeek: number;
  timeSlots: string[];
}
