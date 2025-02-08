"use client";

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../../../actions/payment";
import Wrapper from "../shared/wrapper";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    createPaymentIntent().then((res) => {
      setClientSecret(res.clientSecret);
    });
  }, []);

  if (!clientSecret) {
    return <Wrapper>Loading...</Wrapper>;
  }

  return (
    <div className="max-w-screen-2xl mx-auto" style={{ maxWidth: 400, margin: "0 auto" }}>
      <h1 className="text-2xl font-bold mb-4 text-center">Checkout</h1>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PaymentForm />
      </Elements>
    </div>
  );
}

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message || "An unknown error occurred");
      setIsProcessing(false);
    } else {
      setErrorMessage(null);
      alert("Payment successful!");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow-md">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md disabled:opacity-50"
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
    </form>
  );
}
