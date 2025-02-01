import TCGBannerGridCard from "./TCGBannerGridCard.jsx";
import pokemon from "../../assets/images/pokemon-banner.png";
import lorcana from "../../assets/images/lorcana-banner.png";
import onepiece from "../../assets/images/onepiece-banner.png";
import yugioh from "../../assets/images/yugioh-banner.png";
import magic from "../../assets/images/magic-banner.png";
import starwars from "../../assets/images/starwars-banner.png";

const TCGBannerGrid = () => {

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2 px-4 xl:px-0">
            <TCGBannerGridCard key={"pokemon"} text={"Pokémon"} image={pokemon} active={true} url={"tcg/pokemon"} />
            <TCGBannerGridCard key={"lorcana"} text={"Lorcana"} image={lorcana} active={false} url={"tcg/lorcana"} />
            <TCGBannerGridCard key={"onepiece"} text={"One Piece"} image={onepiece} active={false} url={"tcg/onepiece"} />
            <TCGBannerGridCard key={"magic"} text={"Magic"} image={magic} active={false} url={"tcg/magic"} />
            <TCGBannerGridCard key={"yugioh"} text={"Yu-gi-oh!"} image={yugioh} active={false} url={"tcg/yugioh"} />
            <TCGBannerGridCard key={"starwars"} text={"Star Wars Unlimited"} image={starwars} active={false} url={"tcg/starwars"} />
        </div>
    )
}

export default TCGBannerGrid;