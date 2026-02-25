import emailjs from '@emailjs/browser';
import { SERVICES } from '../types/booking';
import type { ServiceType } from '../types/booking';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN').format(price) + ' VND';
};

interface BookingEmailData {
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
}

export const sendBookingConfirmationEmail = async (data: BookingEmailData): Promise<boolean> => {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn('EmailJS is not configured. Skipping email sending.');
    return false;
  }

  const service = SERVICES.find((s) => s.type === data.serviceType);

  // Format date from yyyy-MM-dd to dd/MM/yyyy
  const [year, month, day] = data.date.split('-');
  const formattedDate = `${day}/${month}/${year}`;

  const templateParams = {
    to_name: data.name,
    to_email: data.email,
    booking_id: data.bookingCode,
    date: formattedDate,
    time: data.timeSlot,
    service_name: service?.name ?? data.serviceType,
    number_of_guests: data.numberOfGuests,
    total_price: formatPrice(data.totalPrice),
    phone: data.phone,
    notes: data.notes || 'N/A',
    contact_phone: '+84 336 256 356',
    contact_address: '3A Che Lan Vien Street, Da Nang City',
    google_maps_link: 'https://www.google.com/maps/place/3A+Ch%E1%BA%BF+Lan+Vi%C3%AAn,+B%E1%BA%AFc+M%E1%BB%B9+An,+Ng%C5%A9+H%C3%A0nh+S%C6%A1n,+%C4%90%C3%A0+N%E1%BA%B5ng+556920,+Vi%E1%BB%87t+Nam/@16.0435717,108.2425689,17z/data=!3m1!4b1!4m6!3m5!1s0x31421766c0014a4b:0x9cafd588e1a29688!8m2!3d16.0435666!4d108.2451438!16s%2Fg%2F11s38nv9_r?entry=ttu&g_ep=EgoyMDI2MDIyMi4wIKXMDSoASAFQAw%3D%3D',
  };

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
    return true;
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    return false;
  }
};
