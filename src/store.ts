import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductType } from "@/types/ProductType";

type CartState = {
  cart: ProductType[];
  addToCart: (product: ProductType) => void;
  removeFromCart: (product: ProductType) => void;
  isOpen: boolean;
  toggleCart: () => void;
  onCheckout: string;
  setCheckout: (checkout: string) => void;
  paymentIntent: string;
  setPaymentIntent: (paymentIntent: string) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (item) =>
        set((state) => {
          const isProductInCart = state.cart.find((p) => p.id === item.id);
          if (isProductInCart) {
            const updatedCart = state.cart.map((p) =>
              p.id === item.id
                ? { ...p, quantity: p.quantity ? p.quantity + 1 : 1 }
                : p,
            );
            return { cart: updatedCart };
          }
          return { cart: [...state.cart, { ...item, quantity: 1 }] };
        }),
      removeFromCart: (item) =>
        set((state) => {
          const isProductInCart = state.cart.find((p) => p.id === item.id);
          if (isProductInCart && isProductInCart.quantity! > 1) {
            const updatedCart = state.cart.map((p) =>
              p.id === item.id ? { ...p, quantity: p.quantity! - 1 } : p,
            );
            return { cart: updatedCart };
          }
          const updatedCart = state.cart.filter((p) => p.id !== item.id);
          return { cart: updatedCart };
        }),
      isOpen: false,
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      onCheckout: "cart",
      setCheckout: (checkout) => set(() => ({ onCheckout: checkout })),
      paymentIntent: "",
      setPaymentIntent: (paymentIntent) => set(() => ({ paymentIntent })),
    }),
    { name: "cart-storage" },
  ),
);
