import Image from "next/image";
import Hero from "./components/homepage/hero";
import Feauture from "./components/homepage/feature";
import Logo from "./components/homepage/logo";
import Top from "./components/widges/navigation/top";
import TopCategories from "./components/homepage/top-categories";
import HotCategory from "./components/homepage/hot-Category";
import OurProducts from "./components/homepage/our-product";

export default function Home() {
  return (
    <div >
<Hero />
<Logo />
<Feauture /> 
<TopCategories />
<HotCategory  />

<OurProducts />

    </div>
  );
}
