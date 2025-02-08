import {reverseDate} from "../../utility/utility.js";
import PropTypes from "prop-types";

const CardDetailsInfo = (props) => {

    const cardInfos  = props.card;

    return (
        <div className="w-full grid grid-cols-4 md:grid-cols-2 gap-8 items-start flex-wrap ">
            <div className="flex flex-col items-start w-full gap-0.5">
                <span className="text-xs text-foreground-500 leading-6">Illustrated By</span>
                <span className="text-base font-semibold text-foreground text-start h-6">
                    {cardInfos.artist ? cardInfos.artist : "N/A"}
                </span>
            </div>
            <div className="flex flex-col items-start w-full gap-0.5">
                <span className="text-xs text-foreground-500 leading-6">Rarity</span>
                <span className="text-base font-semibold text-foreground text-start h-6">
                    {cardInfos.rarity ? cardInfos.rarity : "N/A"}
                </span>
            </div>
            <div className="flex flex-col items-start w-full gap-0.5">
                <span className="text-xs text-foreground-500 leading-6">Release date</span>
                <span className="text-base font-semibold text-foreground text-start h-6">
                    {cardInfos.set.releaseDate ? reverseDate(cardInfos.set.releaseDate) : "N/A"}
                </span>
            </div>
            <div className="flex flex-col items-start w-full gap-0.5">
                <span className="text-xs text-foreground-500 leading-6">Tags</span>
                <span className="text-base font-semibold text-foreground text-start h-6">
                    {cardInfos.subtypes ? cardInfos.subtypes.join(", ") : "N/A"}
                </span>
            </div>
        </div>
    )
}

export default CardDetailsInfo;

CardDetailsInfo.propTypes = {
    card: PropTypes.object.isRequired
}