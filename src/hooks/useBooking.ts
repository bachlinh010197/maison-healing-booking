import { useState, useCallback } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { Booking } from '../types/booking';
import { MAX_BOOKINGS_PER_DAY } from '../types/booking';
import { sendBookingConfirmationEmail } from '../utils/email';
import type { Location } from '../utils/schedule';

interface CreateBookingData extends Omit<Booking, 'id' | 'createdAt' | 'status' | 'bookingCode'> {
  location?: Location;
}

export const useBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBooking = async (bookingData: CreateBookingData): Promise<{ id: string; bookingCode: string } | null> => {
    setLoading(true);
    setError(null);

    try {
      const allBookingsForDate = await getDocs(
        query(
          collection(db, 'bookings'),
          where('date', '==', bookingData.date)
        )
      );

      const confirmedBookings = allBookingsForDate.docs.filter(doc => doc.data().status === 'confirmed');

      // Check day capacity (only confirmed bookings count)
      if (confirmedBookings.length >= MAX_BOOKINGS_PER_DAY) {
        setError('Sorry, this day is fully booked (maximum 6 sessions per day). Please choose another date.');
        setLoading(false);
        return null;
      }

      // Check slot capacity (only confirmed bookings count)
      const slotGuests = confirmedBookings
        .filter(doc => doc.data().timeSlot === bookingData.timeSlot)
        .reduce((sum, doc) => sum + (doc.data().numberOfGuests || 1), 0);

      if (slotGuests + bookingData.numberOfGuests > 20) {
        setError('Sorry, this time slot is full. Please choose another time slot.');
        setLoading(false);
        return null;
      }

      // Generate booking code: DDMM + sequential number (e.g. 260201, 260202)
      const allNonCancelled = allBookingsForDate.docs.filter(doc => doc.data().status !== 'cancelled');
      const [, month, day] = bookingData.date.split('-');
      const seq = String(allNonCancelled.length + 1).padStart(2, '0');
      const bookingCode = `${day}${month}${seq}`;

      const { location: _location, ...firestoreData } = bookingData;
      const docRef = await addDoc(collection(db, 'bookings'), {
        ...firestoreData,
        bookingCode,
        createdAt: new Date(),
        status: 'pending',
      });

      // Send confirmation email (non-blocking)
      sendBookingConfirmationEmail({
        bookingCode,
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
        date: bookingData.date,
        timeSlot: bookingData.timeSlot,
        serviceType: bookingData.serviceType,
        numberOfGuests: bookingData.numberOfGuests,
        totalPrice: bookingData.totalPrice,
        notes: bookingData.notes,
        location: bookingData.location,
      });

      setLoading(false);
      return { id: docRef.id, bookingCode };
    } catch (err) {
      console.error('Booking error:', err);
      setError('An error occurred. Please try again later.');
      setLoading(false);
      return null;
    }
  };

  const getBookingsForDate = async (date: string) => {
    try {
      const q = query(
        collection(db, 'bookings'),
        where('date', '==', date)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs
        .filter(doc => doc.data().status !== 'cancelled')
        .map(doc => ({ id: doc.id, ...doc.data() })) as Booking[];
    } catch {
      return [];
    }
  };

  const getBookingCountsForMonth = useCallback(async (year: number, month: number): Promise<Record<string, number>> => {
    try {
      const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
      const endDate = `${year}-${String(month).padStart(2, '0')}-31`;
      const q = query(
        collection(db, 'bookings'),
        where('date', '>=', startDate),
        where('date', '<=', endDate)
      );
      const snapshot = await getDocs(q);
      const counts: Record<string, number> = {};
      snapshot.docs
        .filter(doc => doc.data().status === 'confirmed')
        .forEach(doc => {
          const date = doc.data().date;
          counts[date] = (counts[date] || 0) + 1;
        });
      return counts;
    } catch {
      return {};
    }
  }, []);

  return { createBooking, getBookingsForDate, getBookingCountsForMonth, loading, error };
};
