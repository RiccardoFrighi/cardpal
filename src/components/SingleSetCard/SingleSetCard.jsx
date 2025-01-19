import {NavLink} from "react-router-dom";
import {Card, Image} from "@heroui/react";
import {pokemonDefaultImage, zeroPad, formatUSDollar} from "../../utility/utility";
import PropTypes from "prop-types";

const SingleSetCard = (props) => {
    const {id, setId, card} = props;

    const prices = card.tcgplayer.prices;
    // Ottieni le chiavi di prices e rdina le chiavi alfanumericamente
    const priceKeys = Object.keys(prices).sort();
    // Accedi all'oggetto corrispondente all'ultima chiave
    const lastPriceObject = prices[priceKeys[priceKeys.length - 1]];

    return (
        <NavLink to={`/tcg/pokemon/${setId}/${id}`}
                className={`flex flex-col gap-1`}
        >
            <Card className="w-fit border-none">
                <Image alt={card.name}
                       //isBlurred
                       className="object-cover w-full"
                       src={card.images.small}
                       loading={"lazy"}
                       fallbackSrc="src/assets/images/pokemonBack.png"
                       onError={(event) => pokemonDefaultImage(event)}
                />
            </Card>
            <div className="flex flex-col gap-0.5">
                <div className="flex flex-row justify-between gap-2" >
                    <h3 className="text-base font-semibold text-start truncate">{card.name}</h3>
                    <p className="text-base font-semibold text-red-orange" >{formatUSDollar.format(lastPriceObject.market)}</p>
                </div>
                <div className="flex flex-row justify-between">
                    <p className="text-xs font-medium text-foreground-500">#{zeroPad(card.number, 3)}</p>
                    <p className="text-xs font-medium text-foreground-500">{card.rarity.charAt(0)}</p>
                </div>
            </div>
        </NavLink>
    )
}

export default SingleSetCard;

SingleSetCard.propTypes = {
    id: PropTypes.string.isRequired,
    setId: PropTypes.func.isRequired,
    card: PropTypes.object.isRequired,
}