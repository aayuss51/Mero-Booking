import React, { useEffect, useState } from 'react';
import { getBookings, updateBookingStatus } from '../../services/mockDb';
import { Booking, BookingStatus, PaymentMethod } from '../../types';
import { Check, X, Loader2, Filter, Copy, Search, CreditCard, RefreshCw } from 'lucide-react';

export const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'ALL'>('ALL');
  const [paymentFilter, setPaymentFilter] = useState<PaymentMethod | 'ALL'>('ALL');

  useEffect(() => {
    loadData(true);
  }, []);

  const loadData = async (showLoading = true) => {
    if (showLoading) setIsLoading(true);
    setBookings(await getBookings());
    if (showLoading) setIsLoading(false);
  };

  const handleStatusChange = async (id: string, status: Booking['status']) => {
    setProcessingId(id);
    await updateBookingStatus(id, status);
    await loadData(false); // Refresh in background
    setProcessingId(null);
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
  };

  // Filter Logic
  const filteredBookings = bookings.filter(b => {
    // 1. Search (ID or Guest Name)
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      b.id.toLowerCase().includes(searchLower) || 
      b.guestName.toLowerCase().includes(searchLower);

    // 2. Status Filter
    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;

    // 3. Payment Filter
    const matchesPayment = paymentFilter === 'ALL' || b.paymentMethod === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-96 gap-4">
        <Loader2 className="animate-spin text-blue-600" size={48} />
        <p className="text-gray-500 font-medium animate-pulse">Loading bookings...</p>
      </div>
    );
  }

  const getActiveStyles = (f: string) => {
    switch(f) {
      case 'PENDING': 
        return 'bg-amber-500 border-amber-700 text-white shadow-lg shadow-amber-500/40 border-2 font-bold z-10';
      case 'CONFIRMED': 
        return 'bg-emerald-600 border-emerald-800 text-white shadow-lg shadow-emerald-600/40 border-2 font-bold z-10';
      case 'COMPLETED':
        return 'bg-blue-600 border-blue-800 text-white shadow-lg shadow-blue-600/40 border-2 font-bold z-10';
      case 'CANCELLED': 
      case 'REJECTED':
        return 'bg-rose-600 border-rose-800 text-white shadow-lg shadow-rose-600/40 border-2 font-bold z-10';
      default: 
        return 'bg-slate-800 border-slate-950 text-white shadow-lg shadow-slate-900/40 border-2 font-bold z-10';
    }
  };

  const statusOptions: (BookingStatus | 'ALL')[] = ['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'REJECTED'];

  return (
    <div className="animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Booking Management</h2>
          <p className="text-gray-500 text-sm mt-1">Manage, search, and filter reservations</p>
        </div>
        <button onClick={() => loadData(true)} className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 shadow-sm transition-colors" title="Refresh Data">
            <RefreshCw size={20} />
        </button>
      </div>

      {/* Controls Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-6 flex flex-col lg:flex-row gap-4 justify-between items-center">
        
        {/* Left: Search */}
        <div className="relative w-full lg:w-96">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input 
                type="text" 
                placeholder="Search Guest Name or Booking ID..." 
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>

        {/* Right: Payment Filter */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-2 text-gray-500 text-sm font-medium whitespace-nowrap">
                <CreditCard size={16} />
                <span className="hidden sm:inline">Payment:</span>
            </div>
            <select 
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value as PaymentMethod | 'ALL')}
                className="w-full lg:w-48 bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            >
                <option value="ALL">All Methods</option>
                <option value="CASH">Cash</option>
                <option value="ESEWA">eSewa</option>
                <option value="KHALTI">Khalti</option>
            </select>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="mb-6 overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex items-center gap-2 min-w-max p-1">
          {statusOptions.map(f => {
            const isActive = statusFilter === f;
            return (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`
                  relative rounded-full text-xs font-medium tracking-wide transition-all duration-300 ease-out flex items-center justify-center px-4 py-2
                  ${isActive 
                    ? getActiveStyles(f)
                    : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                {f === 'ALL' ? 'All' : f.charAt(0) + f.slice(1).toLowerCase()}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Booking ID</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Guest</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Room</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Dates</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBookings.map(booking => (
                <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleCopyId(booking.id)}
                      className="group flex items-center gap-2 text-sm font-mono text-gray-600 hover:text-blue-600 transition-colors bg-gray-50 hover:bg-blue-50 px-2 py-1.5 rounded-md border border-gray-200 hover:border-blue-200"
                      title="Click to Copy ID"
                    >
                      <span className="font-semibold select-all">#{booking.id}</span>
                      <Copy size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{booking.guestName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Room {booking.roomId}</td>
                  <td className="px-6 py-4 text-sm">
                      <div className="flex flex-col gap-1">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded w-fit ${
                              booking.paymentStatus === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                          }`}>
                              {booking.paymentStatus}
                          </span>
                          <span className="text-xs text-gray-500 uppercase font-medium">{booking.paymentMethod || 'CASH'}</span>
                      </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex flex-col">
                       <span className="font-medium">{booking.checkIn}</span>
                       <span className="text-xs text-gray-400">to {booking.checkOut}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border shadow-sm
                      ${booking.status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                        booking.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                        booking.status === 'COMPLETED' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-rose-50 text-rose-700 border-rose-200'}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    {booking.status === 'PENDING' && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleStatusChange(booking.id, 'CONFIRMED')} 
                          disabled={!!processingId}
                          className="flex items-center gap-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                          title="Approve"
                        >
                          {processingId === booking.id ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />} 
                          <span className="text-xs">Approve</span>
                        </button>
                        <button 
                          onClick={() => handleStatusChange(booking.id, 'REJECTED')} 
                          disabled={!!processingId}
                          className="flex items-center gap-1 bg-rose-50 text-rose-700 hover:bg-rose-100 px-3 py-1.5 rounded-lg border border-rose-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                          title="Reject"
                        >
                          {processingId === booking.id ? <Loader2 size={16} className="animate-spin" /> : <X size={16} />}
                          <span className="text-xs">Reject</span>
                        </button>
                      </div>
                    )}
                    {booking.status === 'CONFIRMED' && (
                       <button 
                         onClick={() => handleStatusChange(booking.id, 'COMPLETED')} 
                         disabled={!!processingId}
                         className="text-blue-600 hover:text-blue-800 text-xs font-semibold hover:underline flex items-center gap-2"
                       >
                         {processingId === booking.id && <Loader2 size={12} className="animate-spin" />}
                         Mark Completed
                       </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredBookings.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Filter className="text-gray-300" size={32} />
            </div>
            <p className="text-gray-900 font-medium">No bookings found</p>
            <p className="text-gray-500 text-sm">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};