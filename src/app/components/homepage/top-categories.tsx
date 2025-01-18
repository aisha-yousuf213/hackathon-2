'use client';

import { Inter } from "next/font/google";
import Heading from "../shared/heading";
import Wrapper from "../shared/wrapper";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { useEffect, useState } from "react";
import { queryCategories } from "@/sanity/lib/queries";

const inter = Inter({ subsets: ["latin"] });

interface Product {
  _id: string;
  title: string;
  image_url: string;
  products: number; // Consider renaming this to productCount for clarity
}

function TopCategories() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await sanityFetch({
          query: queryCategories, // Fixed formatting of this object
        });
        setData(products);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []); // Dependency array should be empty if no external dependencies are used
console.log();

  if (loading)
    return (
      <p className="text-center flex justify-center items-center">
        Loading...
      </p>
    );

  if (!data) return <p>No data available.</p>;

  return (
    <Wrapper>
      <div className="lg:h-[461px] mx-2 xl:mx-auto">
        <Heading title="Top categories" className="pl-14 lg:pl-0 " />

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          {
            data.map((product: Product) => (
            <div
              className="relative sm:w-[424px] h-[424px]"
              key={product._id}
            >
              <Image
                src={product.image_url}
                alt={product.title}
                width={600}
                height={650}
                className="w-[424px] h-[424px]"
              />
              <div className="w-full xl:w-[424px] h-[85px] top-[339px] rounded-b-[10px] p-[20px] gap-[10px] absolute bg-[#000000] opacity-[70%]">
                <h4 className={`${inter.className} text-light`}>
                  {product.title}
                </h4>
               
              </div>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

export default TopCategories;



