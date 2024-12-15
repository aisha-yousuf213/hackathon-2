import { Inter } from "next/font/google";
import Heading from "../shared/heading";
import Wrapper from "../shared/wrapper";
import Image from "next/image";

const productData = [
  {
    id: 1,
    name: "Wing Chair",
    product: "3,584 Products",
    src: "/assets/Image4.png",
  },
  {
    id: 2,
    name: "Wooden Chair",
    product: "157 Products",
    src: "/assets/Image5.png",
  },
  {
    id: 3,
    name: "Desk Chair",
    product: "154 Products",
    src: "/assets/Image6.png",
  },
];

const inter = Inter({ subsets: ["latin"] });
function TopCategories() {
  return (
    <Wrapper>
      <div className="lg:h-[461px]  ">
        <Heading title="Top categories" className="pl-14 lg:pl-0 " />
       
      <div className=" flex flex-col lg:flex-row justify-between items-center gap-6   ">
          {productData.map((product) => (   
             <div className="relative   sm:w-[424px] h-[424px]" key={product.id}>
                <Image
                  src={product.src}
                  alt="chair"
                  width={600}
                  height={650}
                  className="w-[424px] h-[424px]  " />
                  <div className="w-full xl:w-[424px] h-[85px] top-[339px] rounded-b-[10px] p-[20px] gap-[10px] absolute bg-[#000000] opacity-[70%]">
                      <p
                          className={` ${inter.className} text-light `}
                      >
                          {product.name}
                      </p>
                      <p
                          className={`${inter.className} text-light  opacity-[70%]`}
                      >
                          {product.product}
                      </p>
                  </div>
             </div>
          ))}
      </div>
      </div>
      
    </Wrapper>

)
}

export default TopCategories
