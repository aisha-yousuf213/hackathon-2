"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Use useParams for dynamic segments
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { productDetailsQuery } from "@/sanity/lib/queries";
import Wrapper from "@/app/components/shared/wrapper";
import { Button } from "@/components/ui/button";
import Cart from "@/app/components/homepage/cart";

interface IProduct {
  _id: string;
  title: string;
  price: number;
  priceWithoutDiscount: number;
  description: string;
  image_url: string;
  inventory: number;
  tags: string[];
  currency: string;
}

const fallbackImage = "/images/fallback.png"; // Replace with the path to your fallback image

const ProductDetails = () => {
  const { id } = useParams(); // Retrieve the dynamic "id" from the URL
  const [product, setProduct] = useState<IProduct | null>(null); // Use null for initial state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await sanityFetch({
          query: productDetailsQuery,
          params: { id },
        });
        setProduct(data[0]); // Assuming data is an array and we take the first product
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center">No product data available.</p>;
  }

  return (
    <Wrapper>
      <div className="flex flex-col lg:flex-row gap-8 my-9 items-center justify-between mx-4 xl:mx-auto">
        {/* Product Image */}
      <div className="md:w-[40%]">
         <Image
          src={product.image_url}
          alt={product.title}
          width={300}
          height={500}
          className="w-[800px] h-full"
        />
        </div>
        {/* Product Details */}
        <div className="md:w-[50%]">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-dark mb-4">{product.title}</h1>
          <p className="text-lg text-dark opacity-[70%] mb-4">{product.description}</p>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xl font-bold text-dark">${product.price}</span>
            <del className="text-dark opacity-[70%] text-lg">
              ${product.priceWithoutDiscount}
            </del>
          </div>
    <Button>Buy Now</Button>
        </div>
      </div>
      </div>
    </Wrapper>
  );
};

export default ProductDetails;

