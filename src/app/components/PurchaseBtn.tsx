"use client";

import { useCartStore } from "@/store";
import { ProductType } from "@/types/ProductType";

export default function PurchaseButton({ product }: { product: ProductType }) {
  const useStore = useCartStore();
  return (
    <>
      <button
        onClick={() => useStore.addToCart(product)}
        className="rounded-md bg-teal-600 text-white px-3.5 py-2.5 text-sm text-center"
      >
        Adicionar ao Carrinho
      </button>
    </>
  );
}
