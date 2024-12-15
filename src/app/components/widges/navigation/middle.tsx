import { Inter } from "next/font/google";
import Image from "next/image";
import { PiShoppingCartSimpleLight } from "react-icons/pi";

const inter = Inter({ subsets: ["latin"] });

function Middle() {
  return (
    <div>
      <div className=" h-[84px] flex py-[20px] px-0 2xl:px-[300px]  bg-lightgray justify-between">
        {/* logo */}
        <div className=" flex gap-3 items-center">
          <Image
            src={"/assets/logo Icon.png"}
            alt="logo"
            width={40}
            height={40}
            className="w-[40px] h-[40px]"
          />
          {/* logo text */}
          <p
            className={` ${inter.className} text-2xl font-medium `}
          >
            Comforty
          </p>
        </div  >
        {/* cart */}
        <div className="w-[120px] h-[44px] flex gap-2 px-4 py-[11px] bg-light items-center">
            <PiShoppingCartSimpleLight className=" text-dark" />
            <p className={` ${inter.className} w-[26px] h-[13px]size-[12px] text-dark font-medium leading-[13.2px] text-center` } > cart</p>
            <div className=" w-[20px] h-[20px] flex justify-center  ml-3 rounded-full bg-green">
                <span className="text-white text-sm font-medium w-[6px] h-[10px]  pr-2 ">2</span>
                </div>
        </div>
      </div>
    </div>
  );
}

export default Middle;
