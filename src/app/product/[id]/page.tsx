'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { addToCart } from "@/actions/addtocart";

import Image from 'next/image';
import { sanityFetch } from '@/sanity/lib/fetch';
import { productDetailsQuery } from '@/sanity/lib/queries';
import Wrapper from '@/app/components/shared/wrapper';
import { Button } from '@/components/ui/button';

import { IQueryData } from '@/app/components/homepage/feature';
import Swal from 'sweetalert2';
// Define product type
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

const fallbackImage = '/images/fallback.png';

const ProductDetails = (products : any) => {
  const { id } = useParams();
  const [product, setProduct] = useState<IQueryData | null>(null);
  const [loading, setLoading] = useState(false);
const handleClick = (e: React.MouseEvent, product: IQueryData) => {
    e.preventDefault();
    Swal.fire({
      position: 'top-right',
      icon: 'success',
      title: `${product.title} added to cart`,
      showConfirmButton: false,
      timer: 1000
    })
    addToCart(product);
   
    
  };

  // Hook to access cart functionality
 
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await sanityFetch({
          query: productDetailsQuery,
          params: { id },
        });
        setProduct(data[0]);
      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!product) return <p className="text-center">No product data available.</p>;

 
  return (
    <Wrapper>
      <div className="flex flex-col lg:flex-row gap-8 my-9 items-center justify-between mx-6 xl:mx-auto">
        <div className="w-auto xl:w-[40%]">
          <Image
            src={product.image_url || fallbackImage}
            alt={product.title}
            width={300}
            height={500}
            className="w-[800px] h-full"
          />
        </div>
        <div className="xl:w-[50%]">
          <h1 className="text-xl lg:text-4xl font-bold text-dark mb-10">
            {product.title}
          </h1>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xl font-bold text-light bg-button py-2 px-6 rounded-full">${product.price}</span>
            <del className="text-dark opacity-[70%] text-lg">
              ${product.priceWithoutDiscount}
            </del>
          </div>
          <p className="text-lg text-dark opacity-[70%] mb-4">
            {product.description}
          </p>
          
         <Button  onClick={(e) => handleClick(e, product)} className='bg-button text-light rounded-2xl hover:bg-cart'>Add To Cart</Button>
        </div>
      </div>
     
      
    </Wrapper>
  );
};

export default ProductDetails;


