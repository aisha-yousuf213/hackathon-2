'use client'    


import { Button } from "@/components/ui/button";
import { sanityFetch } from "@/sanity/lib/fetch";
import { images } from "@/sanity/lib/queries";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import Image from "next/image";
import Wrapper from "../shared/wrapper";


const inter = Inter({ subsets: ["latin"] });
interface image {
    image_url: string
    _id:string
}


export default function Shop() {
    const [data, setData] = useState([]);
      const [loading, setLoading] = useState(false);
     
      
    
    
      useEffect(() => {
        
      const fetchData = async () => {
        setLoading(true);
        try {
    const products = await sanityFetch({
      query: images,})
    
      setData(await products);
    
        } catch (error) { 
          console.log("Error fetching data:", error);
        } finally { 
          setLoading(false);
        }  
      };
    
      fetchData();
      }, []);
      
    
      if (loading) return <p className="text-center flex justify-center items-center">Loading...</p>;
      if (!data) return <p>No data available.</p>;
    
  return (
    <div className=" bg-[#1E28320D] opacity 5%">
      <Wrapper className="flex flex-col items-center justify-center mt-14">
      <h2
        className={`${inter.className} text-xl lg:text-3xl text-dark capitalize  font-bold pt-16 pb-4`}
      >
        Or subscribe to the newsletter
      </h2>
      <div className="w-auto  flex  justify-between  ">
        {/* newsletter subscription input */}
        <input
          type="text"
          placeholder="Email Address....."
          className="bg-lightgray mt-5 border-b-2 border-dark lg:pl-2 lg:pr-8"
        />
        <Button className="bg-lightgray hover:bg-transparent ml-6 mt-5 border-b-2 border-dark ">
          submit
        </Button>
      </div>
      <h2 className={`${inter.className}text-xl lg:text-3xl text-dark capitalize  font-semibold pt-12`}>Follow products and discounts on Instagram</h2>
      

      <div className="grid grid-cols-2  md:grid-cols-3 grid-rows-2 lg:grid-cols-6 mx-3 md:mx-0 gap-4 my-12 lg:h-[261px]">
        {
            data.map((item:image) => (
              <div key={item._id} className="">
                <Image
                src={item.image_url}
                alt="chair"
                width={200}
                height={250}
                className="w-[200px] h-[200px]"    
              />
              </div>
            ))
        }
      </div>
      </Wrapper>
    </div>
  );
}
