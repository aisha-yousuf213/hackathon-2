"use client";

import { Inter } from "next/font/google";
import Wrapper from "../shared/wrapper";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import Image from "next/image";
import clsx from "clsx";
import Heading from "../shared/heading";
import { client } from "@/sanity/lib/client";
import { queryData } from "../../../sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import { FC, useEffect, useState } from "react";

import Link from "next/link";

interface IQueryData {
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
    return (
      <p className="text-center flex justify-center items-center">Loading...</p>
    );
  if (!data) return <p>No data available.</p>;

  return (
    <Wrapper>
      <div className="mx-2 xl:mx-auto">
        {/* Heading */}
        <Heading title="Featured Items" className="pl-14 lg:pl-0" />

        {/* Product List */}
        <div className="flex flex-col lg:h-[461px] lg:flex-row justify-between items-center gap-4">
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
                  className="w-[312px] h-[312px]"
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
                  
                  <PiShoppingCartSimpleLight
                    className={clsx(
                      "w-[44px] h-[44px]",
                      item.badge === "Sales" && "bg-lightgray",
                      item.badge === "New" && "bg-button"
                    )}
                  />
                  
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
