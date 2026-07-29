"use client";

import { useEffect } from "react";
import { useRecentlyViewed } from "../context/recently-viewed-context";

export default function RecordProductView({
  productId,
}: {
  productId: number;
}) {
  const { addProduct } = useRecentlyViewed();

  useEffect(() => {
    addProduct(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return null;
}
