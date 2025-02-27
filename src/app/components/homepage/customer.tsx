"use client";

import React, { useEffect, useState } from "react";
import { IQueryData } from "../homepage/feature";
import { getItemsFromCart } from "@/actions/addtocart";
import Wrapper from "../shared/wrapper";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import { useRouter } from "next/navigation";

const CheckOut = () => {
  const [cartItems, setCartItems] = useState<IQueryData[]>([]);
  const [cartdiscount, setCartdiscount] = useState<number>(0);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalcode: "",
    paymentMethod: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    phone: false,
    address: false,
    city: false,
    postalcode: false,
    paymentMethod: false,
  });

 

  useEffect(() => {
    const items = getItemsFromCart();
    console.log("Cart Items:", items);
    setCartItems(items || []);

    const discountApply = localStorage.getItem("discount");
    if (discountApply) {
      setCartdiscount(Number(discountApply));
    }
  }, []);

  const subTotal = cartItems.length
    ? cartItems.reduce((total, item) => total + item.price * item.inventory, 0)
    : 0;

  const discountedTotal = cartItems.length
    ? cartItems.reduce((discount, item) => discount + item.price - item.priceWithoutDiscount, 0)
    : 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const errors = {
      name: !formValues.name,
      email: !formValues.email,
      phone: !formValues.phone,
      address: !formValues.address,
      city: !formValues.city,
      postalcode: !formValues.postalcode,
      paymentMethod: !formValues.paymentMethod,
    };

    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };
   
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on form submit
    router.push("/checkout");
    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }

    const order = {
      _type: "order",
      name: formValues.name,
      email: formValues.email,
      phone: formValues.phone,
      address: formValues.address,
      city: formValues.city,
      postalCode: formValues.postalcode,
      paymentMethod: formValues.paymentMethod,
      cartItems: cartItems.map((item) => ({
        _type: "reference",
        _ref: item._id,
      })),
      total: subTotal,
      cartdiscount: discountedTotal,
      orderdate: new Date().toISOString(),
    };

    try {
      await client.create(order);
      localStorage.removeItem("AppliedDiscount");
      ; // Only redirect after successful order creation
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <Wrapper>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <form  className="bg-white border rounded-lg p-6 space-y-6 shadow-md w-full max-w-md sm:max-w-lg">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">Billing Details</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-gray-700 font-medium">Name</label>
              <input
                id="name"
                placeholder="Enter your name"
                type="text"
                value={formValues.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formErrors.name && <p className="text-sm text-red-500">Name is required.</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="address" className="text-gray-700 font-medium">Address</label>
              <input
                id="address"
                placeholder="Enter your address"
                type="text"
                value={formValues.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formErrors.address && <p className="text-sm text-red-500">Address is required.</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="city" className="text-gray-700 font-medium">City</label>
                <input
                  id="city"
                  placeholder="Enter your city"
                  type="text"
                  value={formValues.city}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.city && <p className="text-sm text-red-500">City is required.</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="postalcode" className="text-gray-700 font-medium">Postal Code</label>
                <input
                  id="postalcode"
                  placeholder="Enter your zip code"
                  type="number"
                  value={formValues.postalcode}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.postalcode && <p className="text-sm text-red-500">Postal code is required.</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-gray-700 font-medium">Phone</label>
              <input
                id="phone"
                placeholder="Enter your phone number"
                type="tel"
                value={formValues.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formErrors.phone && <p className="text-sm text-red-500">Phone is required.</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="paymentMethod" className="text-gray-700 font-medium">Payment Method</label>
              <select
                id="paymentMethod"
                value={formValues.paymentMethod}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select payment method</option>
                <option value="credit-card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="cash">Cash on Delivery</option>
              </select>
              {formErrors.paymentMethod && <p className="text-sm text-red-500">Payment method is required.</p>}
            </div>

            <Button onClick={handleSubmit} type="submit" className="w-full h-12 bg-button hover:bg-cart text-white font-medium text-xl rounded-lg transition duration-200">
              Confirm
            </Button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default CheckOut;
