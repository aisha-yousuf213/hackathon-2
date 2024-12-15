import Heading from "../shared/heading";
import Wrapper from "../shared/wrapper";
import Image from "next/image"
import { PiShoppingCartSimpleLight } from "react-icons/pi";

const chairData = [
    
    { id: 1, name: "Library Stool Chair", price: "$20",src:"/assets/chair.png" },
    { id: 2, name: "Library Stool Chair", price: "$20", src:"/assets/library.png" },
    { id: 3, name: "Library Stool Chair", price: "$20", src:"/assets/stool.png" },
    { id: 4, name: "Library Stool Chair", price: "$20", src:"/assets/chair-stool.png" },
     { id: 5, name: "Library Stool Chair", price: "$20", src:"/assets/Image4.png" },
     { id: 6, name: "Library Stool Chair", price: "$20", src:"/assets/card1.png" },
     { id: 7, name: "Library Stool Chair", price: "$20", src:"/assets/Image8.png" },
    { id: 8, name: "Library Stool Chair", price: "$20", src:"/assets/card2.png" },
]

import { Inter } from "next/font/google";
import clsx from "clsx";
;
const inter = Inter({ subsets: ["latin"] });

function OurProducts() {
  return (
      <Wrapper>
          <div className=" mt-5 lg:mt-40">
               {/* heading */}
          <Heading title="Our Products" className="mx-auto" />
                 

              {/* chair Data*/}
              <div className=" lg:h-[919px] place-items-center grid grid-cols-1 lg:grid-cols-4  gap-4 ">
              {chairData.map((chair) => (
              <div className="relative" key={chair.id}>

                  <Image src={chair.src} alt="chair" width={600} height={650} className="w-[312px] h-[312px]"/>
                  <p className={`${inter.className}   text-xl font-normal text-green`}>{chair.name}</p>
                  <div className="flex justify-between w-[312px] lg:w-full">
                  <span className=" gap-1 font-semibold py-4 text-dark" >{chair.price} </span>
                  <PiShoppingCartSimpleLight className={clsx('w-[44px] h-[44px]',{'bg-button': chair.id === 1, 'bg-lightgray': chair.id === 2 || chair.id === 3 || chair.id === 4 ,  })} />
                  
                  { chair.id === 1 && <span className={`w-[49px] h-[26px] py-[6px] px-[10-px] font-medium flex justify-center items-center text-light bg-new absolute z-10 top-[20px] left-[20px]`}>New</span>}
                  {chair.id === 2 && <span className={`w-[49px] h-[26px] py-[6px] px-[10-px] font-medium flex justify-center items-center text-light bg-sale absolute z-10 top-[20px] left-[20px]`}>sales</span>}
                  </div>

              </div>
             
              ))}

              </div>
       </div>  
      </Wrapper>
      )

}


export default OurProducts;