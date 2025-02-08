'use client'


import Heading from "../shared/heading";
import Wrapper from "../shared/wrapper";
import Image from "next/image"



import { Inter } from "next/font/google";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allProducts } from "@/sanity/lib/queries";
import Link from "next/link";
import { Badge, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/actions/addtocart";
import Swal from "sweetalert2";
import { IQueryData } from "./feature";
;
const inter = Inter({ subsets: ["latin"] });

interface Product {
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

function OurProducts() {
 const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
 
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
    
    try {
const products = await sanityFetch({
  query: allProducts,})

  setData(products);

    } catch (error) { 
      console.error("Error fetching data:", error);
    } finally { 
      setLoading(false);
    }  
  };

  fetchData();
  }, []);
  

  if (loading) return <p className="text-center flex justify-center items-center">Loading...</p>;
  if (!data) return <p>No data available.</p>;






  return (
      <Wrapper>
          <div className="mx-6 xl:mx-auto mt-10">
               {/* heading */}
          <Heading title="Our Products" className="mx-auto" />
                 

              {/* chair Data*/}
              <div className=" lg:h-[919px]  grid grid-cols-2 lg:grid-cols-4 place-items-center place-content-between gap-6  xl:gap-4 ">
              {data.map((chair: Product) => (
                <Link href={`/product/${chair._id}`} key={chair._id}>
              <div className="relative  " key={chair._id}>

                  <Image src={chair.image_url} alt="chair" width={600} height={650} className="w-[156px] h-[156px] sm:w-[312px] sm:h-[312px]"/>
                  <p className={`${inter.className}   text-xl font-normal text-green`}>{chair.title}</p>
                  <div className="flex justify-between items-center ">
                  <span className=" gap-1 font-semibold py-4 text-dark" >{chair.price}

                    {""}
                  <del className="text-slate-950/40">${chair.priceWithoutDiscount}</del> </span>
                  <Button onClick={(e) => handleClick(e, chair)} size={"icon"} className="">
                   
                  <ShoppingCart size={40}
                    className={clsx(
                      " text-dark ",
                      chair.badge === "Sales" && "bg-lightgray",
                      chair.badge === "New" && "bg-button"
                    )}
                  />
                
                  </Button>
                  </div>
                   {/* Badge */}
                                {chair.badge && (
                                  <span
                                    className={clsx(
                                      
                                      "w-[49px] h-[26px] py-[6px] px-[10px] font-medium flex justify-center items-center text-light absolute z-10 top-[20px] left-[20px]",
                                    chair.badge === "Sales" && 'bg-sale',
                                    chair.badge === "New" && 'bg-new',
                                      
                                    )}
                                  >
                                    {chair.badge}
                                  </span>
                                )}

              </div>
             </Link>
              ))}

              </div>
       </div>  
      </Wrapper>
      )

}


export default OurProducts;