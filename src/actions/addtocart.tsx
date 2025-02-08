import { IQueryData } from "@/app/components/homepage/feature";
import exp from "constants";


export const addToCart =  (product: IQueryData) => {
    const cartItems : IQueryData[] = JSON.parse(localStorage.getItem('cartItems') || '[]');


    const existingItemIndex = cartItems.findIndex((item) => item._id === product._id);

    if (existingItemIndex > -1) {
        cartItems[existingItemIndex].inventory += 1;
}else{
    cartItems.push({ ...product, inventory: 1 });
}
localStorage.setItem('cartItems', JSON.stringify(cartItems));
}



export const removeFromCart =  (productId: string) => {
    let cartItems : IQueryData[] = JSON.parse(localStorage.getItem('cartItems') || '[]');
    cartItems = cartItems.filter((item) => item._id !== productId);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}


export const updateItemQuantity = (productId: string, quantity: number) => {
    let cartItems : IQueryData[] = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const updatedCartItems = cartItems.findIndex((item) => item._id === productId);
    if (updatedCartItems > -1) {
        cartItems[updatedCartItems].inventory = quantity;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  };

  export const getItemsFromCart = () => {  
    return JSON.parse(localStorage.getItem('cartItems') || '[]');
  };