import ProductImage from "@/app/components/ProductImage";
import Stripe from "stripe";

type ProductPageProps = {
  params: {
    id: string;
  };
};

const getProduct = async (id: string) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16",
  });
  const findProduct = await stripe.products.retrieve(id);
  const price = await stripe.prices.list({
    product: findProduct.id,
  });
  return {
    id: findProduct.id,
    price: price.data[0].unit_amount,
    name: findProduct.name,
    image: findProduct.images[0],
    description: findProduct.description,
    currency: price.data[0].currency,
  };
};

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);
  return (
    <div className="flex flex-col md:flex-row items-center max-w-7xl mx-auto gap-8 p-10">
      <ProductImage product={product} />
    </div>
  );
}
