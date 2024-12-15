import { Roboto } from "next/font/google";

import Wrapper from "../shared/wrapper";
import Image from "next/image";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });
function HotCategory() {
  return (
    <Wrapper>
        <div className={``}>
        
        <div className=" w-[648px] h-[52px] z-50  -rotate-90 top-[460px] -left-[300px] md:-left-[240px] relative">
            <p className={` ${roboto.className} text-4xl  absolute font-semibold text-black  `}>
            Explore new and popular styles
          </p>
        </div>
         <div className=" flex flex-col lg:flex-row justify-between items-center pl-10 lg:pl-28 pt-0 lg:pt-44 gap-3 ">
          <Image
              src="/assets/Image1.png"
            alt="chair"
            width={500}
            height={500}
            className="w-[648px] h-[648px]  "
          /> 
        
        <div className="grid grid-cols-2 gap-4 ">
          <Image
            src="/assets/card4.png"
            alt="chair"
            width={200}
            height={200}
            className="w-[312px] h-[312px]  "
          />
          <Image
            src="/assets/card2.png"
            alt="chair"
            width={200}
            height={200}
            className="w-[312px] h-[312px]  "
          />
           <Image
            src="/assets/card1.png"
            alt="chair"
            width={200}
            height={200}
            className="w-[312px] h-[312px]  "
          />
          <Image
            src="/assets/card3.png"
            alt="chair"
            width={200}
            height={200}
            className="w-[312px] h-[312px]  "
          /> 
        </div>
        </div>
      
        </div>
      

      
    </Wrapper>
  );
}

export default HotCategory;
