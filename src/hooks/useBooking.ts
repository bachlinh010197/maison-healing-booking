import { useState } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { Booking } from '../types/booking';

export const useBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>): Promise<string | null> => {
    setLoading(true);
    setError(null);

    try {
      const existingBookings = await getDocs(
        query(
          collection(db, 'bookings'),
          where('date', '==', bookingData.date),
          where('timeSlot', '==', bookingData.timeSlot),
          where('status', '!=', 'cancelled')
        )
      );

      const totalGuests = existingBookings.docs.reduce((sum, doc) => {
        return sum + (doc.data().numberOfGuests || 1);
      }, 0);

      if (totalGuests + bookingData.numberOfGuests > 20) {
        setError('Xin lỗi, khung giờ này đã đầy. Vui lòng chọn khung giờ khác.');
        setLoading(false);
        return null;
      }

      const docRef = await addDoc(collection(db, 'bookings'), {
        ...bookingData,
        createdAt: new Date(),
        status: 'confirmed',
      });

      setLoading(false);
      return docRef.id;
    } catch (err) {
      setError('Đã xảy ra lỗi. Vui lòng thử lại sau.');
      setLoading(false);
      return null;
    }
  };

  const getBookingsForDate = async (date: string) => {
    try {
      const q = query(
        collection(db, 'bookings'),
        where('date', '==', date),
        where('status', '!=', 'cancelled')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Booking[];
    } catch {
      return [];
    }
  };

  return { createBooking, getBookingsForDate, loading, error };
};
