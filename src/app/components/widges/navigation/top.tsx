import { Inter } from "next/font/google";
import { IoMdCheckmark } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { LuCircleAlert } from "react-icons/lu";
import Link from "next/link";
import Middle from "./middle";
import Links from "./links";
import Wrapper from "../../shared/wrapper";

const inter = Inter({ subsets: ["latin"] });

const links = [
  { name: "Eng", url: "#", icon: <FaChevronDown className="w-3 h-5" />,id:'1' },
  { name: "Faqs", url: "#",id:'2' },
  {icon:  <LuCircleAlert className="w-4 h-4"/>, name: "Need Help", url: "#",id:'3'
   },
];
const Top = () => {
  return (
    <div className="bg-dark" >
      {/* shipping */}
     <div className=" flex h-[45px]  justify-between py-[14px] 2xl:w-[1320px] px-2 2xl:px-0 2xl:mx-auto ">
        <div className="flex gap-2 items-center justify-between text-[10px]   sm:text-xs md:text-lg  opacity-[70%]">
        
         
            <IoMdCheckmark className=" text-light  text-center w-4 h-4 " />
          
          <p className={` ${inter.className}  text-light  font-normal  `}>
            Free shipping on all orders over $50
          </p>
        </div> 
        
      {/* links */}
       <div className="flex gap-3 md:gap-8 text-[10px] sm:text-xs md:text-lg    text-light opacity-[70%] ">
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.url}
            className={` ${inter.className} flex gap-1 md:gap-3 items-center  text-right font-normal `}
          >
             {link.name}
             {link.icon}
          </Link>
        ))}
      </div> 
      </div>  
         <Middle /> 
        <Links /> 
    </div>
  );
};

export default Top;
