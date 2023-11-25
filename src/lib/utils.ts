import { ProductType } from "@/types/ProductType";

export const formatPrice = (
  price: number | null,
  quantity: number | undefined | 1 = 1,
) => {
  if (!price) return "R$ 0,00";
  if (quantity === undefined) quantity = 1;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format((price * quantity) / 100);
};

export const totalPriceForCheckout = (items: any[]) => {
  return items.reduce(
    (final, item): number => final + item.price! * item.quantity!,
    0,
  );
};

export const newProductDataMap = (items: any): [] =>
  items.map((item: ProductType) => ({
    name: item.name,
    description: item.description,
    quantity: item.quantity,
    price: item.price,
    image: item.image,
  }));
