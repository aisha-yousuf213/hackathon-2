import "../styles/globals.css"; // Adjust the path based on your app structure
import type { AppProps } from "next/app";
import { CartProvider } from "./context/cartContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}
