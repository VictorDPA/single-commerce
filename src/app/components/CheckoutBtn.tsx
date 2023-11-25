"use client";

import { formatPrice, totalPriceForCheckout } from "@/lib/utils";
import { useCartStore } from "@/store";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function CheckoutButton() {
  const { user } = useUser();
  const router = useRouter();
  const useStore = useCartStore();
  const totalPrice = totalPriceForCheckout(useStore.cart);

  const handleCkeckout = async () => {
    if (!user) {
      useStore.toggleCart();
      router.push(`/sign-in?redirectUrl='/'`);
      return;
    }
    useStore.setCheckout("checkout");
  };
  return (
    <div>
      <p className="text-teal-600 font-bold">
        Total: <span className="text-gray-300">{formatPrice(totalPrice)}</span>
      </p>
      <button
        onClick={handleCkeckout}
        className="w-full rounded-md bg-teal-600 text-white py-2 mt-4"
      >
        Finalizar Compra
      </button>
    </div>
  );
}
