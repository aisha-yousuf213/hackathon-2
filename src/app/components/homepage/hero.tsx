import { Inter } from "next/font/google";
import Wrapper from "../shared/wrapper";
import { Button } from "@/components/ui/button";
import { LuMoveRight } from "react-icons/lu";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });
function Hero() {
  return (
    <Wrapper>
      <div className="h-[100%]  md:h-[850px] mx-1 xl:mx-auto bg-lightgray  justify-between flex flex-col md:flex-row  ">
      <div className="xl:w-[60%] h-[337px] px-8 md:px-0 md:pl-28 pt-24 md:pt-64 ">
           
            <h2  className={`${inter.className} pb-11  font-medium text-dark `}>
              Welcome to chairy 
            </h2>
            <h1 className={`${inter.className} text-4xl md:text-6xl text-dark font-extrabold`}
            >
              Best Furniture Collection for your interior.
            </h1>
            <Button className=" mt-14  bg-button text-light">
              Shop Now <LuMoveRight />
            </Button>
         </div>
        <div className=" md:pt-36 px-8 md:px-0  md:pr-28" >
          <Image
            src="/assets/Product Image.png"
            alt="chair"
            width={600}
            height={650}
            className="w-[434px] h-[584px]"
          />
        </div>
      </div>
    </Wrapper>
  );
}
export default Hero;
