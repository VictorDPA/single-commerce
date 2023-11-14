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
