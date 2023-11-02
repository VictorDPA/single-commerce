import { ProductType } from "@/types/ProductType";
import Product from "./components/Product";

async function getProducts() {
  const res = await fetch('https://fakestoreapi.com/products')
  if (!res.ok) {
    throw new Error('Something went wrong')
  }
  return res.json()
}

export default async function Home() {
  const products = await getProducts();
    return (
    <div className="max-w-7xl mx-auto border pt-8 px-8 xl:px-0">
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-5">
        {products.map((product: ProductType) => (
          <div key={product.id}>
            <Product product={product} />
            </div>
            ))}
      </section>
    </div>
  )
}