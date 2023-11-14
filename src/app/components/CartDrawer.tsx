"use client";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store";
import Image from "next/image";

export default function CartDrawer() {
  const useStore = useCartStore();

  return (
    <div
      onClick={() => useStore.toggleCart()}
      className="fixed w-full h-screen bg-black/25 left-0 top-0 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" absolute bg-slate-500/90 right-0 top-0 w-1/3 h-screen p-8 overflow-y-scroll"
      >
        <button
          className="font-bold text-sm text-teal-600"
          onClick={() => useStore.toggleCart()}
        >
          Back to Store
        </button>
        <div className="border-t border-gray-400 my-4" />
        {useStore.cart.map((item) => (
          <div className="flex flex-col md:flex-row gap-4 py-3" key={item.id}>
            {item.image && (
              <Image
                src={item.image}
                alt={item.name}
                width={64}
                height={64}
                className="w-20 h-20 object-cover"
              />
            )}
            <div>
              <h2 className="w-42 truncate">{item.name}</h2>
              <h2>Quantidade: {item.quantity}</h2>
              <p className="text-teal-600 font-bold text-sm">
                {formatPrice(item.price, item.quantity)}
              </p>
              <div className="flex gap-4">
                <button
                  className="py-1 px-2 border rounded-md mt-2 text-sm mr-1"
                  onClick={() => useStore.addToCart(item)}
                >
                  Adicionar
                </button>
                <button
                  className="py-1 px-2 border rounded-md mt-2 text-sm mr-1"
                  onClick={() => useStore.removeFromCart(item)}
                >
                  Remover
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
