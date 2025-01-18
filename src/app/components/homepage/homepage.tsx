import Hero from "./hero";
import Logo from "./logo";
import Featured from "./feature";
import TopCategories from "./top-categories";
import HotCategory from "./hot-Category";
import OurProducts from "./our-product";
export default function HomePage() {
    return (
        <div>
            <Hero />
            <Logo />
            <Featured />
            <TopCategories />
            <HotCategory />
            <OurProducts />
        </div>
    );
}