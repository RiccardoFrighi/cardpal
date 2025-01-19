import TCGListData from "../../assets/data/tcgs.json";
import TCGBannerGridCard from "./TCGBannerGridCard.jsx";

const TCGBannerGrid = () => {

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2 px-4 xl:px-0">
            {TCGListData.map((item) => {
                return (
                    <TCGBannerGridCard key={item.url} text={item.text} image={item.image} active={item.active} url={item.url} />
                )
            })}
        </div>
    )
}

export default TCGBannerGrid;