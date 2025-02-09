import {NavLink} from "react-router-dom";
import {Card, Image} from "@heroui/react";
import {pokemonDefaultImage, zeroPad, formatUSDollar, getLastMarketPrice} from "../../utility/utility";
import PropTypes from "prop-types";
import pokemonback from "../../assets/images/pokemon-back.png";


const SingleSetCard = (props) => {

    const {id, setId, card} = props;
    const marketPrice = getLastMarketPrice(card);

    return (
        <NavLink to={`/tcg/pokemon/${setId}/${id}`}
                className={`flex flex-col gap-1`}
        >
            <Card className="w-fit border-none hover:-translate-y-1">
                <Image alt={card.name}
                       //isBlurred
                       className="object-cover w-full"
                       src={card.images.small}
                       loading={"lazy"}
                       fallbackSrc={pokemonback}
                       onError={(event) => pokemonDefaultImage(event)}
                />
            </Card>
            <div className="flex flex-col gap-0.5">
                <div className="flex flex-row justify-between gap-2" >
                    <h3 className="text-base font-semibold text-start truncate">{card.name}</h3>
                    <p className="text-base font-semibold text-red-orange" >
                        {marketPrice ?
                            formatUSDollar.format(marketPrice)
                        : ""}
                    </p>
                </div>
                <div className="flex flex-row justify-between">
                    <p className="text-xs font-medium text-foreground-500">#{zeroPad(card.number, (card.set.total+'').length)}</p>
                    <p className="text-xs font-medium text-foreground-500">
                        {card.rarity? card.rarity.charAt(0) : ""}
                    </p>
                </div>
            </div>
        </NavLink>
    )
}

export default SingleSetCard;

SingleSetCard.propTypes = {
    id: PropTypes.string.isRequired,
    setId: PropTypes.string.isRequired,
    card: PropTypes.object.isRequired,
}