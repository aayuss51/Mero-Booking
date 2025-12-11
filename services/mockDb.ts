import { Facility, RoomType, Booking, User, DashboardStats, Review, UserRole } from '../types';

// Initial Seed Data
const INITIAL_FACILITIES: Facility[] = [
  { id: '1', name: 'High-Speed Wi-Fi', icon: 'Wifi' },
  { id: '2', name: 'Infinity Pool', icon: 'Waves' },
  { id: '3', name: 'Private Gym & Spa', icon: 'Dumbbell' },
  { id: '4', name: 'Valet Parking', icon: 'Car' },
  { id: '5', name: 'Gourmet Breakfast', icon: 'Coffee' },
  { id: '6', name: 'Butler Service', icon: 'Utensils' },
];

const INITIAL_ROOMS: RoomType[] = [
  {
    id: '101',
    name: 'Royal Penthouse Suite',
    description: 'Experience the pinnacle of luxury in our split-level penthouse featuring panoramic city views, private terrace, and personal butler service.',
    pricePerNight: 350000,
    capacity: 4,
    totalStock: 2,
    facilityIds: ['1', '2', '3', '4', '5', '6'],
    imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=3540&auto=format&fit=crop'
  },
  {
    id: '102',
    name: 'Oceanfront Executive Villa',
    description: 'Direct beach access with a private infinity pool, outdoor rain shower, and spacious living areas designed for tranquility.',
    pricePerNight: 250000,
    capacity: 3,
    totalStock: 4,
    facilityIds: ['1', '2', '5', '4'],
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2340&auto=format&fit=crop'
  },
  {
    id: '103',
    name: 'Presidential Garden Suite',
    description: 'Surrounded by lush tropical gardens, this suite offers unmatched privacy, and an expansive master bedroom.',
    pricePerNight: 150000,
    capacity: 2,
    totalStock: 5,
    facilityIds: ['1', '5', '4', '3'],
    imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=3540&auto=format&fit=crop'
  },
  {
    id: '104',
    name: 'Skyline Diplomat Room',
    description: 'Modern elegance meets comfort with floor-to-ceiling windows, smart room controls, and premium Italian linens.',
    pricePerNight: 85000,
    capacity: 2,
    totalStock: 8,
    facilityIds: ['1', '4', '5'],
    imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=3540&auto=format&fit=crop'
  }
];

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BK-7A9X2',
    roomId: '101',
    userId: 'u2',
    guestName: 'Alexander Hamilton',
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    totalPrice: 1050000,
    status: 'CONFIRMED',
    paymentMethod: 'ESEWA',
    paymentStatus: 'PAID',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  }
];

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rv-demo-1',
    bookingId: 'BK-DEMO1',
    roomId: '101',
    userId: 'u-demo',
    userName: 'Sarah Jenkins',
    rating: 5,
    comment: 'Absolutely breathtaking views and the butler service was top-notch.',
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString()
  },
  {
    id: 'rv-demo-2',
    bookingId: 'BK-DEMO2',
    roomId: '102',
    userId: 'u-demo2',
    userName: 'Michael Chen',
    rating: 4,
    comment: 'Great villa, but the pool water was a bit too cold for my liking.',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  }
];

const INITIAL_USERS: User[] = [
  { id: 'super_admin1', name: 'Super Admin', email: 'super@mero-booking.com', role: 'SUPER_ADMIN' },
  { id: 'admin1', name: 'Administrator', email: 'admin@mero-booking.com', role: 'ADMIN' },
  { id: 'u2', name: 'Alexander Hamilton', email: 'alex@history.com', role: 'GUEST' },
  { id: 'u-demo', name: 'Sarah Jenkins', email: 'sarah@example.com', role: 'GUEST' },
  { id: 'u-demo2', name: 'Michael Chen', email: 'michael@example.com', role: 'GUEST' },
];

// Helper to simulate DB delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// LocalStorage Keys
const KEYS = {
  FACILITIES: 'hms_facilities',
  ROOMS: 'hms_rooms',
  BOOKINGS: 'hms_bookings',
  REVIEWS: 'hms_reviews',
  USERS: 'hms_users',
};

// --- Facilities Service ---
export const getFacilities = async (): Promise<Facility[]> => {
  await delay(400);
  const stored = localStorage.getItem(KEYS.FACILITIES);
  return stored ? JSON.parse(stored) : INITIAL_FACILITIES;
};

export const saveFacility = async (facility: Facility): Promise<void> => {
  await delay(400);
  const current = await getFacilities();
  const exists = current.find(f => f.id === facility.id);
  const updated = exists 
    ? current.map(f => f.id === facility.id ? facility : f)
    : [...current, { ...facility, id: Math.random().toString(36).substr(2, 9) }];
  localStorage.setItem(KEYS.FACILITIES, JSON.stringify(updated));
};

export const deleteFacility = async (id: string): Promise<void> => {
  await delay(400);
  const current = await getFacilities();
  localStorage.setItem(KEYS.FACILITIES, JSON.stringify(current.filter(f => f.id !== id)));
};

// --- Rooms Service ---
export const getRooms = async (): Promise<RoomType[]> => {
  await delay(400);
  const stored = localStorage.getItem(KEYS.ROOMS);
  return stored ? JSON.parse(stored) : INITIAL_ROOMS;
};

export const getRoom = async (id: string): Promise<RoomType | undefined> => {
  await delay(200);
  const rooms = await getRooms();
  return rooms.find(r => r.id === id);
};

export const saveRoom = async (room: RoomType): Promise<void> => {
  await delay(400);
  const current = await getRooms();
  const exists = current.find(r => r.id === room.id);
  const updated = exists
    ? current.map(r => r.id === room.id ? room : r)
    : [...current, { ...room, id: Math.random().toString(36).substr(2, 9) }];
  localStorage.setItem(KEYS.ROOMS, JSON.stringify(updated));
};

export const deleteRoom = async (id: string): Promise<void> => {
  await delay(400);
  const current = await getRooms();
  localStorage.setItem(KEYS.ROOMS, JSON.stringify(current.filter(r => r.id !== id)));
};

// --- Bookings Service ---
export const getBookings = async (): Promise<Booking[]> => {
  await delay(400);
  const stored = localStorage.getItem(KEYS.BOOKINGS);
  return stored ? JSON.parse(stored) : INITIAL_BOOKINGS;
};

export const getUserBookings = async (userId: string): Promise<Booking[]> => {
  await delay(400);
  const bookings = await getBookings();
  return bookings.filter(b => b.userId === userId);
};

export const createBooking = async (booking: Omit<Booking, 'id' | 'createdAt' | 'status'> & { status?: Booking['status'] }): Promise<Booking> => {
  await delay(600); // Slightly longer for "processing" feel
  const current = await getBookings();
  
  // Generate a distinct Booking ID (e.g., BK-9X2A1)
  const randomStr = Math.random().toString(36).substr(2, 5).toUpperCase();
  const bookingId = `BK-${randomStr}`;

  const newBooking: Booking = {
    status: 'PENDING', // Default if not provided
    ...booking,
    id: bookingId,
    createdAt: new Date().toISOString()
  };
  localStorage.setItem(KEYS.BOOKINGS, JSON.stringify([...current, newBooking]));
  return newBooking;
};

export const updateBookingStatus = async (id: string, status: Booking['status']): Promise<void> => {
  await delay(400);
  const current = await getBookings();
  const updated = current.map(b => b.id === id ? { ...b, status } : b);
  localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(updated));
};

export const updateBookingDetails = async (
  id: string, 
  updates: { checkIn: string; checkOut: string }
): Promise<Booking> => {
  await delay(600);
  const bookings = await getBookings();
  const rooms = await getRooms();
  
  const index = bookings.findIndex(b => b.id === id);
  if (index === -1) throw new Error('Booking not found');

  const booking = bookings[index];
  const room = rooms.find(r => r.id === booking.roomId);

  if (!room) throw new Error('Room not found');

  // Recalculate Price
  const start = new Date(updates.checkIn);
  const end = new Date(updates.checkOut);
  const nights = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)));
  
  const baseCost = nights * room.pricePerNight;
  const taxes = baseCost * 0.13; // 13% tax
  const totalPrice = Math.floor(baseCost + taxes);

  const updatedBooking = {
    ...booking,
    ...updates,
    totalPrice
  };

  const updatedList = [...bookings];
  updatedList[index] = updatedBooking;
  
  localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(updatedList));
  return updatedBooking;
};

// --- Reviews Service ---
export const getReviews = async (): Promise<Review[]> => {
  await delay(300);
  const stored = localStorage.getItem(KEYS.REVIEWS);
  return stored ? JSON.parse(stored) : INITIAL_REVIEWS;
};

export const saveReview = async (review: Review): Promise<Review> => {
  await delay(500);
  const current = await getReviews();
  const index = current.findIndex(r => r.id === review.id);
  
  let savedReview: Review;
  let updatedReviews;
  
  if (index >= 0) {
    savedReview = { ...review, updatedAt: new Date().toISOString() };
    updatedReviews = [...current];
    updatedReviews[index] = savedReview;
  } else {
    savedReview = { ...review, id: `rv-${Math.random().toString(36).substr(2, 9)}`, createdAt: new Date().toISOString() };
    updatedReviews = [...current, savedReview];
  }
  localStorage.setItem(KEYS.REVIEWS, JSON.stringify(updatedReviews));
  return savedReview;
};

// --- User Management Service ---
export const getUsers = async (): Promise<User[]> => {
  await delay(400);
  const stored = localStorage.getItem(KEYS.USERS);
  return stored ? JSON.parse(stored) : INITIAL_USERS;
};

export const updateUserRole = async (userId: string, role: UserRole): Promise<void> => {
  await delay(500);
  const current = await getUsers();
  const updated = current.map(u => u.id === userId ? { ...u, role } : u);
  localStorage.setItem(KEYS.USERS, JSON.stringify(updated));
};

// --- Stats Service ---
export const getDashboardStats = async (): Promise<DashboardStats> => {
  const bookings = await getBookings();
  const rooms = await getRooms();
  
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  const yesterdayTime = now.getTime() - (24 * 60 * 60 * 1000);

  const newBookings24h = bookings.filter(b => new Date(b.createdAt).getTime() > yesterdayTime).length;
  
  const upcomingBookings = bookings.filter(b => b.status === 'CONFIRMED' && b.checkIn >= todayStr).length;

  // Occupancy Logic
  let occupiedCount = 0;
  let checkingOutCount = 0;

  bookings.forEach(b => {
    if (b.status === 'CONFIRMED') {
      if (b.checkOut === todayStr) {
        checkingOutCount++;
      }
      if (b.checkIn <= todayStr && b.checkOut > todayStr) {
        occupiedCount++;
      }
    }
  });

  const totalStock = rooms.reduce((acc, r) => acc + r.totalStock, 0);
  const availableRoomsToday = Math.max(0, totalStock - occupiedCount);

  return {
    newBookings24h,
    upcomingBookings,
    availableRoomsToday,
    occupiedRoomsToday: occupiedCount,
    checkingOutToday: checkingOutCount
  };
};

export const checkAvailability = async (checkIn: string, checkOut: string): Promise<string[]> => {
    // Returns IDs of rooms that are NOT available
    await delay(400);
    const bookings = await getBookings();
    const rooms = await getRooms();
    const unavailableRoomIds: string[] = [];

    for (const room of rooms) {
        const roomBookings = bookings.filter(b => 
            b.roomId === room.id && 
            b.status !== 'CANCELLED' && 
            b.status !== 'REJECTED' &&
            // Check overlap
            ((b.checkIn < checkOut) && (b.checkOut > checkIn))
        );

        if (roomBookings.length >= room.totalStock) {
            unavailableRoomIds.push(room.id);
        }
    }
    return unavailableRoomIds;
}