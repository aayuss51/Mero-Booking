export type UserRole = 'ADMIN' | 'GUEST' | 'SUPER_ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Facility {
  id: string;
  name: string;
  icon: string; // Name of the icon
}

export interface RoomType {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  totalStock: number;
  facilityIds: string[];
  imageUrl: string;
}

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'CANCELLED' | 'COMPLETED';
export type PaymentMethod = 'CASH' | 'ESEWA' | 'KHALTI';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED';

export interface Booking {
  id: string;
  roomId: string;
  userId: string; // Guest ID
  guestName: string;
  checkIn: string; // ISO Date string YYYY-MM-DD
  checkOut: string; // ISO Date string YYYY-MM-DD
  totalPrice: number;
  status: BookingStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  createdAt: string;
}

export interface Review {
  id: string;
  bookingId: string;
  roomId: string;
  userId: string;
  userName: string;
  rating: number; // 1 to 5
  comment: string;
  createdAt: string; // ISO Date
  updatedAt?: string;
}

export interface DashboardStats {
  newBookings24h: number;
  upcomingBookings: number;
  availableRoomsToday: number;
  occupiedRoomsToday: number;
  checkingOutToday: number;
}