import { useState } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { Booking } from '../types/booking';
import { sendBookingConfirmationEmail } from '../utils/email';

export const useBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status' | 'bookingCode'>): Promise<{ id: string; bookingCode: string } | null> => {
    setLoading(true);
    setError(null);

    try {
      const allBookingsForDate = await getDocs(
        query(
          collection(db, 'bookings'),
          where('date', '==', bookingData.date)
        )
      );

      const activeBookings = allBookingsForDate.docs.filter(doc => doc.data().status !== 'cancelled');

      // Check slot capacity
      const slotGuests = activeBookings
        .filter(doc => doc.data().timeSlot === bookingData.timeSlot)
        .reduce((sum, doc) => sum + (doc.data().numberOfGuests || 1), 0);

      if (slotGuests + bookingData.numberOfGuests > 20) {
        setError('Sorry, this time slot is full. Please choose another time slot.');
        setLoading(false);
        return null;
      }

      // Generate booking code: DDMM + sequential number (e.g. 260201, 260202)
      const [, month, day] = bookingData.date.split('-');
      const seq = String(activeBookings.length + 1).padStart(2, '0');
      const bookingCode = `${day}${month}${seq}`;

      const docRef = await addDoc(collection(db, 'bookings'), {
        ...bookingData,
        bookingCode,
        createdAt: new Date(),
        status: 'confirmed',
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

  return { createBooking, getBookingsForDate, loading, error };
};
