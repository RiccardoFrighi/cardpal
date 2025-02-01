import PokemonBack from "../assets/images/pokemon-back.png";
import PokemonLogo from "../assets/images/pokemon-logo.png";

export const reverseDate = (str) => str.split('/').reverse().join('/');

export const pokemonDefaultImage = (onErrorEvent) =>  onErrorEvent.target.src = PokemonBack;

export const pokemonLogo = PokemonLogo;

export const zeroPad = (num, places) => String(num).padStart(places, '0');

export const formatUSDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export const formatCamelCase = (str) => str.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase()).trim(); // Rimuove eventuali spazi iniziali o finali

export const getLastMarketPrice = (card) => {
    if (!card) {
        return null;
    }

    if (card.tcgplayer && card.tcgplayer.prices) {
        const prices = card.tcgplayer.prices;
        const priceKeys = Object.keys(prices);

        if (priceKeys.length > 0) {
            const priceObject = prices[priceKeys[0]];
            if (priceObject && typeof priceObject.market !== "undefined") {
                return priceObject.market;
            }
        }
    }

    return null;
}