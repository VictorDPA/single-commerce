import { ProductType } from "@/types/ProductType";
import ProductImage from "./ProductImage";
import { formatPrice } from "@/lib/utils";
import PurchaseButton from "./PurchaseBtn";
import Link from "next/link";

export default function Product({ product }: { product: ProductType }) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="flex flex-col shadow-lg h-96 bg-slate-800 p-5 text-gray-300">
        <div className="relative max-h-72 flex-1">
          <ProductImage product={product} fill />
        </div>
        <div className="flex justify-between font-bold my-3">
          <p className="w-40 truncate">{product.name}</p>
          <p className="text-teal-600">{formatPrice(product.price)}</p>
        </div>
        <PurchaseButton product={product} />
      </div>
    </Link>
  );
}
