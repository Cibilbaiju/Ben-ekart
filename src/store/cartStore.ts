
import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category?: string;
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,
  
  addItem: (item) => {
    const items = get().items;
    const existingItem = items.find(i => i.id === item.id);
    
    let newItems;
    if (existingItem) {
      newItems = items.map(i => 
        i.id === item.id 
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
    } else {
      newItems = [...items, { ...item, quantity: 1 }];
    }
    
    const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    set({ items: newItems, totalItems, totalPrice });
  },
  
  removeItem: (id) => {
    const newItems = get().items.filter(item => item.id !== id);
    const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    set({ items: newItems, totalItems, totalPrice });
  },
  
  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }
    
    const newItems = get().items.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    
    const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    set({ items: newItems, totalItems, totalPrice });
  },
  
  clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
}));
