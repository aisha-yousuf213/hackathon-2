import { Inter } from "next/font/google";

import Link from "next/link";


export const pageLinks = [
  { name: "Home", href: "/", id: "6" },
  {
    name: "Shop",
    href: "/shop",
    id: 1,
  },
  {
    name: "Product",
    href: "/product",
    id: 2,
  },

  {
    name: "Pages",
    href: "/pages",
    id: 4,
  },
  {
    name: "About",
    href: "/about",
    id: 5,
  },
];

const inter = Inter({ subsets: ["latin"] });

function Links() {
  return (
    <div className="bg-light hidden md:block ">
      <div className="h-[74px]   py-[14px] 2xl:w-[1320px]  px-2 2xl:px-0 2xl:mx-auto flex justify-between items-center drop-shadow shadow-lightgray">
     
          <div className=" flex gap-16 ">
            {/* links */}
            {pageLinks.map((link) => (
              <div key={link.id}>
                <Link
                  href={link.href}
                  className={` ${inter.className}  text-darkgray  font-medium hover:text-green `}
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>
      
       
        {/* contact */}
       
        <div className="flex gap-2 ">
          <p className={` ${inter.className} text-darkgray  font-normal  `}>
            Contact:
          </p>

          <span className={` ${inter.className}  text-dark  font-medium  `}>
            (808) 555-0111
          </span>
        
        </div>
        </div>
      </div>
   
  );
}

export default Links;
