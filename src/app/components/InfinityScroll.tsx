"use client";
import { ProductType } from "@/types/ProductType";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Product from "./Product";
import fetchProducts from "../actions";

function InfiniteScroll({
  initialProducts,
}: {
  initialProducts: ProductType[];
}) {
  const [products, setProducts] = useState<ProductType[]>(initialProducts);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const lastProductId = products[products.length - 1]?.id;

  const loadMoreProducts = useCallback(async () => {
    setIsLoading(true);
    const { formattedProducts, has_more } = await fetchProducts({
      lastProductId,
    });
    if (formattedProducts) {
      setProducts((prev) => [...prev, ...formattedProducts]);
      setHasMore(has_more);
    }
    setIsLoading(false);
  }, [lastProductId]);

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      loadMoreProducts();
    }
  }, [inView, hasMore, isLoading, loadMoreProducts]);

  if (!products) return <div>Loading...</div>;

  return (
    <>
      {products.map((product) => (
        <div key={product.id}>
          <Product product={product} />
        </div>
      ))}
      {hasMore && (
        <div ref={ref} className="flex justify-center">
          Carregando Mais Registros{" "}
        </div>
      )}
    </>
  );
}

export default InfiniteScroll;
