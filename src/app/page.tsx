import { ProductType } from "@/types/ProductType";
import Product from "./components/Product";
import Stripe from "stripe";

async function getProducts(): Promise<ProductType[]> {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16",
  });

  const products = await stripe.products.list();
  const formattedProducts = await Promise.all(
    products.data.map(async (product) => {
      const price = await stripe.prices.list({
        product: product.id,
      });
      return {
        id: product.id,
        price: price.data[0].unit_amount,
        name: product.name,
        image: product.images[0],
        description: product.description,
        currency: price.data[0].currency,
      };
    }),
  );

  return formattedProducts;
}

// const res = await fetch("https://fakestoreapi.com/products");
// if (!res.ok) {
//   throw new Error("Something went wrong");
// }
// return res.json();

export default async function Home() {
  const products = await getProducts();
  return (
    <div className="max-w-7xl mx-auto border pt-8 px-8 xl:px-0">
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-5">
        {products.map((product) => (
          <div key={product.id}>
            <Product product={product} />
          </div>
        ))}
      </section>
    </div>
  );
}
