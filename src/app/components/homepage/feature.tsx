import { Inter } from "next/font/google";
import Wrapper from "../shared/wrapper";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import Image from "next/image";
import clsx from "clsx";
import Heading from "../shared/heading";

const inter = Inter({ subsets: ["latin"] });

const chairData = [
    
    { id: 1, name: "Library Stool Chair", price: "$20",src:"/assets/chair.png" },
    { id: 2, name: "Library Stool Chair", price: "$20", src:"/assets/library.png" },
    { id: 3, name: "Library Stool Chair", price: "$20", src:"/assets/stool.png" },
    { id: 4, name: "Library Stool Chair", price: "$20", src:"/assets/chair-stool.png" },
]
    

function Feauture() {
    return (
        <Wrapper>
            <div className="mx-2  xl:mx-auto">
                 {/* heading */}
            <Heading title="Featured Items" className="pl-14 lg:pl-0 " />
                   

                {/* chair Data*/}
                <div className="flex flex-col lg:h-[461px] lg:flex-row justify-between items-center   gap-4 ">
                {chairData.map((chair) => (
                <div className="relative" key={chair.id}>

                    <Image src={chair.src} alt="chair" width={600} height={650} className="w-[312px] h-[312px]"/>
                    <p className={`${inter.className}   text-xl font-normal text-green`}>{chair.name}</p>
                    <div className="flex justify-between">
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

export default Feauture
           