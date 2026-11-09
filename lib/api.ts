const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Attach guest ID or token if available in browser
  if (typeof window !== 'undefined') {
    let guestId = localStorage.getItem('ccw_guest_id');
    if (!guestId) {
      guestId = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('ccw_guest_id', guestId);
    }
    defaultHeaders['x-guest-id'] = guestId;

    const token = localStorage.getItem('ccw_auth_token');
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers as Record<string, string>),
    },
    credentials: 'omit', // Using explicit Authorization header and localStorage token for cross-origin reliability
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data as T;
}

export const api = {
  // Auth
  register: (payload: any) => fetchApi<{ success: boolean; token: string; user: any }>('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload: any) => fetchApi<{ success: boolean; token: string; user: any }>('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  getMe: () => fetchApi<{ success: boolean; user: any }>('/auth/me'),

  // Products & Categories
  getProducts: (queryString: string = '') => fetchApi<{ success: boolean; products: any[]; pagination: any }>(`/products${queryString ? `?${queryString}` : ''}`),
  getProductBySlug: (slug: string) => fetchApi<{ success: boolean; product: any; relatedProducts: any[] }>(`/products/${slug}`),
  getCategories: () => fetchApi<{ success: boolean; categories: any[] }>('/categories'),

  // Branches & Pincode Locator
  getBranches: () => fetchApi<{ success: boolean; branches: any[] }>('/branches'),
  checkPincode: (pincode: string) => fetchApi<any>('/branches/check-pincode', { method: 'POST', body: JSON.stringify({ pincode }) }),

  // Cart
  getCart: () => fetchApi<{ success: boolean; cart: any }>('/cart'),
  addToCart: (item: any) => fetchApi<{ success: boolean; message: string; cart: any }>('/cart/items', { method: 'POST', body: JSON.stringify(item) }),
  updateCartItem: (itemId: string, quantity: number) => fetchApi<{ success: boolean; cart: any }>(`/cart/items/${itemId}`, { method: 'PATCH', body: JSON.stringify({ quantity }) }),
  removeCartItem: (itemId: string) => fetchApi<{ success: boolean; cart: any }>(`/cart/items/${itemId}`, { method: 'DELETE' }),
  applyCoupon: (code: string) => fetchApi<{ success: boolean; message: string; cart: any }>('/cart/apply-coupon', { method: 'POST', body: JSON.stringify({ code }) }),

  // Orders & Payments
  createOrder: (payload: any) => fetchApi<any>('/orders', { method: 'POST', body: JSON.stringify(payload) }),
  verifyPayment: (payload: any) => fetchApi<any>('/payments/verify', { method: 'POST', body: JSON.stringify(payload) }),
  getMyOrders: () => fetchApi<{ success: boolean; orders: any[] }>('/orders/my-orders'),
  getOrderById: (id: string) => fetchApi<{ success: boolean; order: any }>(`/orders/${id}`),

  // Custom Cakes
  submitCustomCake: (payload: any) => fetchApi<any>('/custom-cakes', { method: 'POST', body: JSON.stringify(payload) }),

  // Admin
  getDashboardStats: () => fetchApi<any>('/admin/overview'),
  getCustomers: () => fetchApi<any>('/admin/customers'),
  updateOrderStatus: (orderId: string, status: string, note?: string) => fetchApi<any>(`/orders/${orderId}/status`, { method: 'PATCH', body: JSON.stringify({ status, note }) }),
};

