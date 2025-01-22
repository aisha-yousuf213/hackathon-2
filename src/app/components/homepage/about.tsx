import { Butterfly_Kids, Inter } from "next/font/google";
import Wrapper from "../shared/wrapper";
import { Button } from "@/components/ui/button";
import chair from "../../../../public/assets/card3.png";

import Image from "next/image";
import Heading from "../shared/heading";
import { FaBacteria } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });
export default function About() {
  return (
    <Wrapper>
      <div>
        <div className=" flex flex-col md:flex-row justify-between items-center  gap-4 mt-9">
          <div className="sm:w-[672px] h-[478px] bg-[#007580] pl-16 ">
            <h1
              className={` ${inter.className} text-2xl text-light font-semibold  pt-14 `}
            >
              About Us - Comforty
            </h1>
            <p className="text-lightgray pt-6 pr-20">
              At Comforty, we believe that the right chair can transform your
              space and elevate your comfort. Specializing in ergonomic design,
              premium materials, and modern aesthetics, we craft chairs that
              seamlessly blend style with functionality.{" "}
            </p>
            <Button className="bg-[#F9F9F926] opacity mt-8 15% lg:mt-36 text-light p-8">
              View collection
            </Button>
          </div>
          <div>
            <Image
              src={chair}
              alt="chair"
              width={618}
              height={480}
              className="w-[619px] h-[478px]"
            />{" "}
          </div>
        </div>
        <h2  className={`${inter.className}   md:h-[35px] text-3xl font-bold text-dark text-center mt-20`}>What makes our Brand Different</h2>
        <div className="flex flex-col xl:flex-row justify-between items-center gap-4 mt-9">
        <Image
          src='/assets/Featureblock1.png'
          alt="chair"
          width={200}
          height={200}
          className="w-[310px] h-[244px]  "
        />
         <Image
          src='/assets/Featureblock2.png'
          alt="chair"
          width={200}
          height={200}
          className="w-[310px] h-[244px]  "
        /> <Image
        src='/assets/Featureblock3.png'
        alt="chair"
        width={200}
        height={200}
        className="w-[310px] h-[244px]  "
      /> <Image
      src='/assets/Featureblock4.png'
      alt="chair"
      width={200}
      height={200}
      className="w-[310px] h-[244px]  "
    />
        
       
        </div>
        <h2  className={`${inter.className}   md:h-[35px] text-3xl font-bold text-dark text-center mt-20`}>Our Popular Products </h2>
        <div className="flex flex-col xl:flex-row justify-between items-center gap-4 mt-9"> 
        <Image
          src='/assets/Large.png'
          alt="chair"
          width={200}
          height={200}
          className="w-[630px] h-[375px]  " 
        />
        <Image
          src='/assets/Parent.png'
          alt="chair"
          width={200}
          height={200}
          className="w-[305px] h-[375px]  " 
        />
        <Image
          src='/assets/Parent1.png'
          alt="chair"
          width={200}
          height={200}
          className="w-[305px] h-[375px]  " 
        />
        </div>
      </div>
    </Wrapper>
  );
}
   