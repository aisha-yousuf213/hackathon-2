'use client'

import { Inter } from "next/font/google";
import Wrapper from "../shared/wrapper";
import { Button } from "@/components/ui/button";
import { LuMoveRight } from "react-icons/lu";
import Image from "next/image";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });
function Hero() {

  const router = useRouter();
  const handleLinkClickk = () => {
    router.push("/shop");
  }
  
  return (
    <Wrapper className="mt-6 md:mt-0">
      <div className="h-[100%]  md:h-[850px] mx-4 xl:mx-auto bg-lightgray  justify-between items-center flex flex-col md:flex-row  ">
      <div className=" md:w-[60%] h-[337px] px-8 md:px-0 md:pl-28 pt-24 md:pt-0 ">
           
            <h2  className={`${inter.className} pb-11  font-medium text-dark `}>
              Welcome to chairy 
            </h2>
            <h1 className={`${inter.className} text-4xl sm:text-5xl md:text-6xl text-dark font-extrabold`}
            >
              Best Furniture Collection for your interior.
            </h1>
            
            <Button onClick={handleLinkClickk} className=" mt-14  bg-button text-light hover:bg-dark">
              Shop Now <LuMoveRight /> 
            </Button>
           
         </div>
        <div className="pt-28 sm:pt-0 md:pt-36 px-8 md:px-0  md:pr-28 pb-6 md:pb-0" >
          <Image
            src="/assets/Product Image.png"
            alt="chair"
            width={600}
            height={650}
            className="w-auto h-auto md:w-[434px] md:h-[584px]"
          />
        </div>
      </div>
    </Wrapper>
  );
}
export default Hero;
