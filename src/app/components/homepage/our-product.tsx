'use client'


import Heading from "../shared/heading";
import Wrapper from "../shared/wrapper";
import Image from "next/image"
import { PiShoppingCartSimpleLight } from "react-icons/pi";


import { Inter } from "next/font/google";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allProducts } from "@/sanity/lib/queries";
import Link from "next/link";
import { Badge } from "lucide-react";
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
          <div className=" mt-10">
               {/* heading */}
          <Heading title="Our Products" className="mx-auto" />
                 

              {/* chair Data*/}
              <div className=" lg:h-[919px] place-items-center grid grid-cols-1 lg:grid-cols-4  gap-4 ">
              {data.map((chair: Product) => (
                <Link href={`/product/${chair._id}`} key={chair._id}>
              <div className="relative" key={chair._id}>

                  <Image src={chair.image_url} alt="chair" width={600} height={650} className="w-[312px] h-[312px]"/>
                  <p className={`${inter.className}   text-xl font-normal text-green`}>{chair.title}</p>
                  <div className="flex justify-between w-[312px] lg:w-full">
                  <span className=" gap-1 font-semibold py-4 text-dark" >{chair.price}

                    {""}
                  <del className="text-slate-950/40">${chair.priceWithoutDiscount}</del> </span>
                  <PiShoppingCartSimpleLight className={clsx('w-[44px] h-[44px]', chair.badge === "Sales" && 'bg-lightgray',
                                    chair.badge === "New" && 'bg-button')} />
                  
                  
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