import { Inter } from "next/font/google";
import Wrapper from "../shared/wrapper";
import Image from "next/image";
import { BsFacebook } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs"; 
import { BsInstagram } from "react-icons/bs";
import { BsPinterest } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const sofas = [
  "Sofa ",
  "Armchair",
  "Wing Chair",
  "Desk Chair",
  "wooden Chair",
  "Park Bench",
];

const support = [
  "Help & Support",
  "Terms & Conditions",
  "Privacy Policy",
  "Help",
];

const inter = Inter({ subsets: ["latin"] });
function Footer() {
  return (
    <div className=" bg-light shadow-inner shadow-footer">
      <div className="xl:w-[1320px] xl:mx-auto space-y-10  flex flex-col lg:flex-row justify-between items-start lg:items-center py-32 pl-5 sm:pl-10 md:pl-20 lg:pl-0 ">


        <div className="md:w-[350px] flex flex-col gap-7">
          <div className="flex gap-3 items-center">
          <Image
            src={"/assets/logo Icon.png"}
            alt="logo"
            width={40}
            height={40}
            className="w-[40px] h-[40px]"
          />
          {/* logo text */}
          <h2
            className={` ${inter.className}  text-2xl font-medium`}
          >
            Comforty
          </h2>
          </div>
          <div>
          <p
            className={` ${inter.className}  text-grays font-medium `}
          >
            Vivamus tristique odio sit amet velit semper,<br /> eu posuere turpis
            interdum. <br /> Cras egestas purus{" "}
          </p>
          </div>
          <div className="flex gap-6 items-center">
          <BsFacebook className="w-[16px] h-[16px] text-darkgray" />
          <BsTwitter className="w-[16px] h-[16px] text-darkgray" />
          <BsInstagram className="w-[16px] h-[16px] text-darkgray" />
          <BsPinterest className="w-[16px] h-[16px] text-darkgray" />
          <FaYoutube className="w-[16px] h-[16px] text-darkgray" />
          </div>
        </div>

        <div className="">
          <h2
            className={` ${inter.className}  text-grays font-medium  pb-5 `}
          >
            CATEGORY
          </h2>
         {sofas.map((sofa,i) => (
            <h4 key={i}
              className={` ${inter.className} text-dark font-medium hover:text-green pb-2 `}
            >
              {sofa}
            </h4>
         ))}
        </div>

        <div className="">
          <h2
            className={` ${inter.className} text-grays font-medium pb-5 `}
          >
            SUPPORT
          </h2>

          {support.map((sup, index) => (
            <h4 key={index}
              className={` ${inter.className} text-dark font-medium hover:text-green pb-2 `}
            >
              {sup}
            </h4>
          ))}
        </div>
        
       <div className="md:w-[424px] flex flex-col gap-7">
       <h2 className={` ${inter.className} text-grays font-medium `}>NEWSLETTER</h2>
       <div className="flex gap-2">
       <input type="email" placeholder="Your email " />
       <Button className="bg-button text-light border-grays">Subscribe</Button>
       </div>
       <p className={` ${inter.className} text-grays font-medium `}>Lorem ipsum dolor sit amet, consectetur <br /> adipiscing  elit. Nullam tincidunt erat enim.</p>
       </div>
  
      </div>
    </div>
  );
}

export default Footer;