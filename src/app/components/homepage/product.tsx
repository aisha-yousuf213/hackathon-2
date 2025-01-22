

import { CartProvider, useCart } from "../../context/cartContext";
const ProductCard = ({ product } : any) => {
 const { addToCart } = useCart();
 const handleAddToCart = () => {
 addToCart(product);
 };
 return (
 < CartProvider>
 <h2>{product.title}</h2>
 <p>{product.price}</p>
 <img src={product.image?.asset?.url} alt={product.title} />
 <button onClick={handleAddToCart}>Add to Cart</button>
 </ CartProvider>
 );
};
export default ProductCard;
