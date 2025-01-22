"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { productDetailsQuery } from "@/sanity/lib/queries";
import Wrapper from "@/app/components/shared/wrapper";
import { Button } from "@/components/ui/button";
import { CartProvider, useCart } from "../../context/cartContext";

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

const fallbackImage = "/images/fallback.png";

const ProductDetails = () => {
  const { id } = useParams(); // Retrieve the dynamic "id" from the URL
  const [product, setProduct] = useState<IProduct | null>(null); // Use null for initial state
  const [loading, setLoading] = useState(false);
  const { cart, addToCart, removeFromCart, getTotalPrice } = useCart();

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

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        _id: product._id,
        title: product.title,
        price: product.price,
        name: product.title,
      });
    }
  };

  return (
    <Wrapper>
      <div className="flex flex-col lg:flex-row gap-8 my-9 items-center justify-between mx-3 xl:mx-auto">
        {/* Product Image */}
        <div className="w-auto xl:w-[40%]">
          <Image
            src={product.image_url || fallbackImage}
            alt={product.title}
            width={300}
            height={500}
            className="w-[800px] h-full"
          />
        </div>

        {/* Product Details */}
        <div className="xl:w-[50%]">
          <div className="flex-1">
            <h1 className=" text-xl lg:text-4xl font-bold text-dark mb-4">{product.title}</h1>
            <p className="text-lg text-dark opacity-[70%] mb-4">{product.description}</p>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xl font-bold text-dark">${product.price}</span>
              <del className="text-dark opacity-[70%] text-lg">
                ${product.priceWithoutDiscount}
              </del>
            </div>
            <Button
              className="bg-button text-light hover:bg-dark"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
     {/* Cart Section */}
     < div >
        <h1 className="text-2xl font-bold mb-4">Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          <div className="flex flex-col gap-4 md:flex-row">
            {cart.map((product) => (
              <div key={product._id} className="mb-4 flex flex-col md:flex-row gap-8 justify-between items-center">
                <h2 className="text-button">{product.title}</h2>
                <p>Price: ${product.price}</p>
                <p>Quantity: {product.quantity}</p>
                <button
                  className="text-red-500 underline"
                  onClick={() => removeFromCart(product._id)}
                >
                  Remove
                </button>
              </div>
            ))}
            <div>
              <h3 className="text-xl font-medium">Total: ${getTotalPrice()}</h3>
            </div>
          </div>
        )}
      </div >
     
    </Wrapper>
  );
};

export default ProductDetails;
