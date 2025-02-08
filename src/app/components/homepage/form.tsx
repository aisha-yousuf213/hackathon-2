'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { IQueryData } from './feature';
import { getItemsFromCart } from '@/actions/addtocart';
import Wrapper from '../shared/wrapper';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import CheckoutPage from './payment';
const Form = () => {

const [cartItems, setCartItems] = useState<IQueryData[]>([]);
  const [cartdiscount, setCartdiscount] = useState<number>(0);

  useEffect(() => {
      setCartItems(getItemsFromCart());
      const discountApply = localStorage.getItem(`${  `discount` }`);
      if (discountApply) {
        setCartdiscount(Number(discountApply));
      }
    }, []);
  
    const subTotal = cartItems.reduce(
      (total, item) => total + item.price  * item.inventory,
      0
    );

  return (
    <Wrapper className='mx-4 xl:mx-auto'>
    {/* Breadcrumb Navigation */}
    <div className=" mt-6 px-4 sm:px-6 lg:px-8">
      <nav className="flex items-center gap-2 py-4">
        <Link href="/cart" className="text-gray-600 hover:text-black transition text-sm">
          Cart
        </Link>
        <ArrowRightIcon className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium">Checkout</span>
      </nav>
    </div>
  
    {/* Order Summary */}
    <div className="bg-white border  rounded-lg p-6 space-y-6 w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 text-center">Order Summary</h2>
  
      {cartItems.length > 0 ? (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center gap-4 py-4 border-b">
              {/* Product Image */}
              <div className="w-20 h-20 sm:w-16 sm:h-16 rounded overflow-hidden flex-shrink-0">
                {item.image_url && (
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
  
              {/* Product Details */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-base font-medium text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">Quantity: {item.inventory}</p>
              </div>
  
              {/* Price */}
              <p className="text-base font-medium text-gray-900">
                ${item.price * item.inventory}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}
  
      {/* Pricing Breakdown */}
      <div className="text-right space-y-2 border-t pt-4">
        <p className="text-sm">
          Subtotal: <span className="font-medium">${subTotal}</span>
        </p>
        <p className="text-sm">
          Discount: <span className="font-medium text-red-500">-${cartdiscount}</span>
        </p>
        <p className="text-lg font-semibold text-gray-900">
          Total: ${(subTotal - cartdiscount).toFixed(2)}
        </p>
      </div>
      <CheckoutPage />
    </div>
  </Wrapper>
  
  )
}

export default Form

    