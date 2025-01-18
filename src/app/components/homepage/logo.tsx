import Image from "next/image";
import Wrapper from "../shared/wrapper";


function Logo() {
    return (
        <Wrapper>
        <div className=" xl:h-[139px]   grid  grid-cols-3 md:grid-cols-7 md:gap-6 place-items-center place-content-between">
            
            {/* logo */}
            <Image src="/assets/logo.png" alt="logo" width={85} height={87} className="w-[85px] h-[87px]"  />
            <Image src="/assets/dri.png" alt="logo" width={107} height={109}  className="w-[107px] h-[109px]" />
            <Image src="/assets/cib.png" alt="logo" width={135} height={139}  className="w-[135px] h-[139px]"  />
            <Image src="/assets/z.png" alt="logo" width={63} height={65}   className="w-[63px] h-[65px]"/>
            <Image src="/assets/brt.png" alt="logo" width={98} height={101}  className="w-[98px] h-[101px]" />
            <Image src="/assets/pd.png" alt="logo" width={113} height={115}  className="w-[113px] h-[115px]" />
            <Image src="/assets/moz.png" alt="logo" width={84} height={87}  className="w-[84px] h-[87px]" />
            
        </div>
        </Wrapper>
    );
}
export default Logo