"use client";

import React, { useEffect, useState } from "react";
import { IQueryData } from "../homepage/feature";
import { getItemsFromCart, removeFromCart, updateItemQuantity } from "@/actions/addtocart";
import Wrapper from "../shared/wrapper";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<IQueryData[]>([]);

  useEffect(() => {
    setCartItems(getItemsFromCart());
  }, []);

  const handleRemoveFromCart = (productId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(productId);
        setCartItems(getItemsFromCart());
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      }
    });
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    updateItemQuantity(productId, quantity);
    setCartItems(getItemsFromCart());
  };

  const handleIncrement = (productId: string) => {
    const product = cartItems.find((item) => item._id === productId);
    if (product) {
      handleQuantityChange(productId, product.inventory + 1);
    }
  };

  const handleDecrement = (productId: string) => {
    const product = cartItems.find((item) => item._id === productId);
    if (product && product.inventory > 1) {
      handleQuantityChange(productId, product.inventory - 1);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.inventory, 0);
  };


  const router = useRouter();
  const handleProceed = () => {
    Swal.fire({
      title: "Proceed to checkout?",
      text: "Please review your cart before checkout",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Proceed"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Success", "Your order has been successfully placed", "success");

        router.push("/cutomerInfo");
        setCartItems([]);
      }
    });
  };

  return (
    <Wrapper>
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-semibold text-center mb-4">Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <Card key={item._id} className="flex items-center justify-between p-4 shadow-lg">
                <CardContent className="flex items-center gap-4">
                  <Image src={item.image_url} alt={item.title} width={100} height={100} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    <p className="text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                </CardContent>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="outline" onClick={() => handleDecrement(item._id)}>
                    <Minus size={16} />
                  </Button>
                  <span className="text-lg font-semibold">{item.inventory}</span>
                  <Button size="icon" variant="outline" onClick={() => handleIncrement(item._id)}>
                    <Plus size={16} />
                  </Button>
                </div>
                <Button size="icon" variant="destructive" onClick={() => handleRemoveFromCart(item._id)}>
                  <Trash size={16} />
                </Button>
              </Card>
            ))}
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="mt-6 text-center">
            <h3 className="text-xl font-semibold">Total: ${calculateTotal().toFixed(2)}</h3>
            <Button className="mt-4 w-full py-4 px-6 bg-button text-light hover:bg-red-600text-2xl font-medium" onClick={handleProceed}>
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default CartPage;


