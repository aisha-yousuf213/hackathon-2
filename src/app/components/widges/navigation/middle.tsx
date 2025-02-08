'use client'


import { Inter } from "next/font/google";
import Image from "next/image";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoMenu } from "react-icons/io5";
import { pageLinks } from "./links";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";





const inter = Inter({ subsets: ["latin"] });

function Middle() {

 const router = useRouter();
const handleLinkClick = () => {
  router.push("/cart");
}

  return (
    <div className="bg-lightgray">
      <div className=" h-[84px] flex py-[20px]  px-2 2xl:px-0 2xl:w-[1320px] xl:mx-auto justify-between">
        {/* logo */}
        <div className=" flex gap-3 items-center">
          <Image
            src={"/assets/logo1.png"}
            alt="logo"
            width={50}
            height={50}
            className="w-[40px] h-[40px]"
          />
          {/* logo text */}
          <p className={` ${inter.className} text-2xl font-medium `}>
            Comforty
          </p>
        </div>
        {/* cart */}
        <div className="hidden md:block">
          <Button onClick={handleLinkClick} className="w-[120px] h-[44px] flex gap-2 px-4 py-[11px] bg-light items-center ">
            <PiShoppingCartSimpleLight className=" text-dark" />
            <span
              className={` ${inter.className} w-[26px] h-[13px]size-[12px] text-dark font-medium leading-[13.2px] text-center`}
            >
              {" "}
              cart
            </span>
            <div className=" w-[20px] h-[20px] flex justify-center  ml-3 rounded-full bg-green">
              <span className="text-white text-sm font-medium w-[6px] h-[10px]  pr-2 ">
                0
              </span>
            </div>
          </Button>
        </div>



        {/* mobile menu */}

        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger>
              <IoMenu className="w-6 h-6 text-black " />
            </SheetTrigger>
            <SheetContent className=" flex flex-col">
              <div className=" flex gap-3 items-center">
                <Image
                  src={"/assets/logo1.png"}
                  alt="logo"
                  width={50}
                  height={50}
                  className="w-[40px] h-[40px]"
                />
                {/* logo text */}
                <p className={` ${inter.className} text-2xl font-medium `}>
                  Comforty
                </p>
              </div>
              {/* links */}
              <div className="pt-20 items-start flex flex-col  gap-y-7">
                {pageLinks.map((link) => (
                  <div key={link.id}>
                    <Link
                      href={link.href}
                      className={` ${inter.className}  text-darkgray  font-medium hover:text-green   `}
                    >
                      {link.name}
                    </Link>
                  </div>
                ))}
              </div>

              <div className="">
          <Button onClick={handleLinkClick} className="w-[120px] h-[44px] flex gap-2 px-4 py-[11px] bg-light items-center ">
            <PiShoppingCartSimpleLight className=" text-dark" />
            <span
              className={` ${inter.className} w-[26px] h-[13px]size-[12px] text-dark font-medium leading-[13.2px] text-center`}
            >
              {" "}
              cart
            </span>
            <div className=" w-[20px] h-[20px] flex justify-center  ml-3 rounded-full bg-green">
              <span className="text-white text-sm font-medium w-[6px] h-[10px]  pr-2 ">
                0
              </span>
            </div>
          </Button>
        </div>
            </SheetContent>


          
          </Sheet>
        </div>
      </div>
    </div>
  );
}

export default Middle;
