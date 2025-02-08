"use client";

import { Inter } from "next/font/google";
import Wrapper from "../shared/wrapper";
import { ShoppingCart } from 'lucide-react';
import Image from "next/image";
import clsx from "clsx";
import Heading from "../shared/heading";

import { queryData } from "../../../sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import {  useEffect, useState } from "react";

import Link from "next/link";
import { addToCart } from "@/actions/addtocart";
import { Button } from "@/components/ui/button";
import Swal from 'sweetalert2';


export interface IQueryData {
  _id: string;
  title: string;
  price: number;
  priceWithoutDiscount: number;
  badge: string;
  image_url: string;
  category: {
    _id: string;
    title: string;
  };
  description: string;
  inventory: number;
  tags: string[];
}

const inter = Inter({ subsets: ["latin"] });

const Featured = () => {
  const [data, setData] = useState([]);
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



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const products = await sanityFetch({
          query: queryData,
        });

        setData(await products);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return  <p className="text-center flex justify-center items-center">Loading...</p>
  if (!data) return <p>No data available.</p>;

  return (
    <Wrapper>
      <div className="mx-6 xl:mx-auto">
        {/* Heading */}
        <Heading title="Featured Items" className="pl-14 lg:pl-0" />

        {/* Product List */}
        <div className=" lg:h-[461px] grid grid-cols-2 lg:grid-cols-4 place-items-center place-content-between gap-6 xl:gap-4">
          {data.map((item: IQueryData) => (
            <Link
              href={`/product/[id]`}
              as={`/product/${item._id}`}
              key={item._id}
            >
              <div className="relative">
                {/* Product Image */}
                <Image
                  src={item.image_url}
                  alt={item.title}
                  width={600}
                  height={650}
                  className="w-[156px] h-[156px] sm:w-[312px] sm:h-[312px]"
                />

                {/* Product Title */}
                <h3
                  className={`${inter.className} text-xl font-normal text-green mt-2`}
                >
                  {item.title}
                </h3>

                {/* Product Price and Badge */}
                <div className="flex justify-between items-center">
                  <span className="gap-1 font-semibold py-4 text-dark">
                    ${item.price}{" "}
                    <del className="text-slate-950/40">
                      ${item.priceWithoutDiscount}
                    </del>
                  </span>
                  <Button onClick={(e) => handleClick(e, item)} size={"icon"} className="">
                   
                  <ShoppingCart size={40}
                    className={clsx(
                      " text-dark ",
                      item.badge === "Sales" && "bg-lightgray",
                      item.badge === "New" && "bg-button"
                    )}
                  />
                
                  </Button>
                  
                </div>

                {/* Badge */}
                {item.badge && (
                  <span
                    className={clsx(
                      "w-[49px] h-[26px] py-[6px] px-[10px] font-medium flex justify-center items-center text-light absolute z-10 top-[20px] left-[20px]",
                      item.badge === "Sales" && "bg-sale",
                      item.badge === "New" && "bg-new"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};
export default Featured;
