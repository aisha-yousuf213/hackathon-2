import { Inter } from "next/font/google";

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

const pageLinks = [
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
    <div>
      <div className="h-[74px] px-0 2xl:px-[300px]  py-[14px] bg-light flex justify-between items-center drop-shadow shadow-lightgray">
        <div className="hidden md:block ">
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
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger className="">
              <IoMenu className="w-6 h-6 text-black" />
            </SheetTrigger>
            <SheetContent className="pt-60 flex flex-col  gap-y-7">
              {/* links */}
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
            </SheetContent>
          </Sheet>
        </div>
        {/* contact */}
        <div className="flex gap-2">
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
