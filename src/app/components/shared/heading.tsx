import { Inter } from "next/font/google";
import { FC } from "react";
const inter = Inter({ subsets: ["latin"] });

const Heading:FC<{title: string , className?: string}> = ({ title , className='' })=> {
return (
    
    <div className="xl:w-[1320px] h-[44px]   flex justify-between my-8   ">
        {/* heading */}
    <h2 className={`${inter.className} ${className} w-[286px] h-[35px] text-3xl font-bold text-dark `}>{title}</h2>
    </div>
)
}
export default Heading
