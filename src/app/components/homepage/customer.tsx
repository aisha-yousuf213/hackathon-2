"use client";

import React, { useEffect, useRef, useState } from "react";
import { IQueryData } from "../homepage/feature";
import { getItemsFromCart } from "@/actions/addtocart";
import Wrapper from "../shared/wrapper";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import { useRouter } from "next/navigation";

const CheckOut = () => {
    const getName = useRef<HTMLInputElement>(null);
    const getEmail = useRef<HTMLInputElement>(null);
    const getPhone = useRef<HTMLInputElement>(null);
    const getAddress = useRef<HTMLInputElement>(null);
    const getCity = useRef<HTMLInputElement>(null);
    const getZipcode = useRef<HTMLInputElement>(null);
    const getPaymentMethod = useRef<HTMLInputElement>(null);
    



  const [cartItems, setCartItems] = useState<IQueryData[]>([]);
  const [cartdiscount, setCartdiscount] = useState<number>(0);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipcode: "",
    paymentMethod: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    phone: false,
    address: false,
    city: false,
    zipcode: false,
    paymentMethod: false,
  });

  useEffect(() => {
    setCartItems(getItemsFromCart());
    const discountApply = localStorage.getItem("discount");
    if (discountApply) {
      setCartdiscount(Number(discountApply));
    }
  }, []);

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.inventory,
    0
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const errors = {
      name: !formValues.name,
      email: !formValues.email,
      phone: !formValues.phone,
      address: !formValues.address,
      city: !formValues.city,
      zipcode: !formValues.zipcode,
      paymentMethod: !formValues.paymentMethod,
    };

    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

    const router = useRouter();
   const handleSubmit = async () => {
    if (validateForm()) {
      localStorage.removeItem("AppliedDiscount");
    }
      router.push("/checkout");

    const order = {
      _type: "order",
      name: formValues.name,
      email: formValues.email,
      phone: formValues.phone,
      address: formValues.address,
      city: formValues.city,
      cartItems: cartItems.map((item) => ({
        _type: "reference",
        _ref: item._id,
      })),
      total: subTotal,
      cartdiscount: cartdiscount,
      orderdate: new Date().toISOString(),
    };
    try {
      await client.create(order);
      localStorage.removeItem("AppliedDiscount");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };
  const handleSubmitt = async (e: React.FormEvent) => {
      e.preventDefault();
      const payLoad = {
          shipToAddress: {
              name: getName.current?.value,
              email: getEmail.current?.value,
              phone: getPhone.current?.value,
              address: getAddress.current?.value,
              city: getCity.current?.value,
              zipcode: getZipcode.current?.value,

          },
          packages:[
            {
                weight: {value: subTotal, unit: "ounce"},
                dimensions: {length: 10, width: 15, height: 3, unit: "inch"},
            }
          ]
      }
     try {
      const res = await fetch("http://localhost:3000/api/shipengine", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(payLoad),
          })
          const data = await res.json();
          console.log(data);
     } catch (error) {
      console.error("Error creating order:", error);
    }
  }
  return (
    <Wrapper>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4" onSubmit={handleSubmitt}>
      
      {/* Billing Form */}
      <form className="bg-white border rounded-lg p-6 space-y-6 shadow-md w-full max-w-md sm:max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
         Billing Details
        </h2>
  
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-gray-700 font-medium">
              Name
            </label>
            <input
              id="name"
              placeholder="Enter your name"
              type="text"
              ref={getName}
              value={formValues.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formErrors.name && (
              <p className="text-sm text-red-500">Name is required.</p>
            )}
          </div>
  
          <div className="space-y-2">
            <label htmlFor="address" className="text-gray-700 font-medium">
              Address
            </label>
            <input
              id="address"
              placeholder="Enter your address"
              type="text"
              ref={getAddress}
              value={formValues.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formErrors.address && (
              <p className="text-sm text-red-500">Address is required.</p>
            )}
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="city" className="text-gray-700 font-medium">
                City
              </label>
              <input
                id="city"
                placeholder="Enter your city"
                type="text"
                ref={getCity}
                value={formValues.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formErrors.city && (
                <p className="text-sm text-red-500">City is required.</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="zipCode" className="text-gray-700 font-medium">
                Zip Code
              </label>
              <input
                id="zipCode"
                placeholder="Enter your zip code number"
                type="text"
                ref={getZipcode}
                value={formValues.zipcode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="phone" className="text-gray-700 font-medium">
                Phone
              </label>
              <input
                id="phone"
                placeholder="Enter your phone number"
                type="tel"
                value={formValues.phone}
                ref={getPhone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formErrors.phone && (
                <p className="text-sm text-red-500">Phone is required.</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-gray-700 font-medium">
                Email
              </label>
              <input
                id="email"
                placeholder="Enter your email address"
                value={formValues.email}
                type="email"
                ref={getEmail}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formErrors.email && (
                <p className="text-sm text-red-500">Email is required.</p>
              )}
            </div>
          </div>
  
          <Button
            className="w-full h-12 bg-button hover:bg-cart text-white font-medium text-xl rounded-lg transition duration-200"
            onClick={handleSubmit}
          >
            Confirm
          </Button>
        </div>
      </form>
    </div>
  </Wrapper>
  );
};  
export default CheckOut;
