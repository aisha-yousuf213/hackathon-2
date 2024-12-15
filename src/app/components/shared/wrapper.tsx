
import { FC } from "react";


const Wrapper:FC<{ children: React.ReactNode; className?: string
     }>= ({ children, className }) => {
    

    return (
    <div className={` ${className} xl:w-[1320px]  xl:mx-auto`} >
                {children}
           </div>
    );
}

export default Wrapper