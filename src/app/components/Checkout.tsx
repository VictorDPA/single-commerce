"use client";
import { useCartStore } from "@/store";
import { useEffect } from "react";

export default function Checkout() {
  const useStore = useCartStore();

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: useStore.cart,
        payment_intent_id: useStore.paymentIntent,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.paymentIntent);
      });
  }, [useStore.cart, useStore.paymentIntent]);

  return (
    <div>
      <h1>Checkout</h1>
    </div>
  );
}
