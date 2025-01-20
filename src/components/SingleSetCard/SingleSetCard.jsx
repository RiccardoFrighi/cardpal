import {NavLink} from "react-router-dom";
import {Card, Image} from "@heroui/react";
import {pokemonDefaultImage, zeroPad, formatUSDollar} from "../../utility/utility";
import PropTypes from "prop-types";


const SingleSetCard = (props) => {

    const {id, setId, card} = props;

    // Cerca il valore di mercato nei dati della carta
    function getLastMarketOrAveragePrice(card) {
        if (!card) {
            return null;
        }

        // Verifica se esiste 'tcgplayer' con 'prices'
        if (card.tcgplayer && card.tcgplayer.prices) {
            const prices = card.tcgplayer.prices;

            // Ottieni le chiavi di prices
            const priceKeys = Object.keys(prices);

            if (priceKeys.length > 0) {
                // Ordina le chiavi alfanumericamente
                priceKeys.sort();

                // Prendi l'ultima chiave
                const lastKey = priceKeys[priceKeys.length - 1];

                // Controlla che l'oggetto corrispondente alla chiave esista e contenga 'market'
                const lastPriceObject = prices[lastKey];
                if (lastPriceObject && typeof lastPriceObject.market !== "undefined") {
                    return lastPriceObject.market; // Restituisci il valore 'market'
                }
            }
        }

        // Se 'prices' non esiste, prova con 'cardmarket'
        if (card.cardmarket && card.cardmarket.prices) {
            const averagePrice = card.cardmarket.prices.averageSellPrice;
            if (typeof averagePrice !== "undefined") {
                return averagePrice; // Restituisci 'averageSellPrice'
            }
        }

        console.warn("Nessun valore di mercato trovato nei dati.");
        return null;
    }
    const marketOrAveragePrice = getLastMarketOrAveragePrice(card);

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
                    <p className="text-base font-semibold text-red-orange" >{formatUSDollar.format(marketOrAveragePrice)}</p>
                </div>
                <div className="flex flex-row justify-between">
                    <p className="text-xs font-medium text-foreground-500">#{zeroPad(card.number, 3)}</p>
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