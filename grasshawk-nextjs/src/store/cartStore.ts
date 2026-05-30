import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
  weight?: string;
  dimensions?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'qty'>) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  subtotal: () => number;
  tax: () => number;
  shipping: () => number;
  total: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, qty: i.qty + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, qty: 1 }] };
        }),

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateQty: (id, qty) =>
        set((state) => {
          if (qty <= 0) return { items: state.items.filter((i) => i.id !== id) };
          return {
            items: state.items.map((i) => (i.id === id ? { ...i, qty } : i)),
          };
        }),

      clearCart: () => set({ items: [] }),

      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.qty, 0),

      tax: () => {
        const sub = get().subtotal();
        return parseFloat((sub * 0.13).toFixed(2)); // 13% HST (Canada)
      },

      shipping: () => {
        const sub = get().subtotal();
        return sub >= 100 ? 0 : 9.99; // Free shipping over $100
      },

      total: () => {
        const { subtotal, tax, shipping } = get();
        return parseFloat((subtotal() + tax() + shipping()).toFixed(2));
      },

      itemCount: () => get().items.reduce((sum, i) => sum + i.qty, 0),
    }),
    { name: 'grasshawk-cart' }
  )
);
