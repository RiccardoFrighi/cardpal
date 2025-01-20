import PokemonBack from "../assets/images/pokemon-back.png";
import PokemonLogo from "../assets/images/pokemon-logo.png";

export const reverseDate = (str) => str.split('/').reverse().join('/');

export const getPokemonImage = (id) => `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${zeroPad(id, 3)}.png`;

export const pokemonDefaultImage = (onErrorEvent) =>  onErrorEvent.target.src = PokemonBack;

export const pokemonLogo = PokemonLogo;

export const zeroPad = (num, places) => String(num).padStart(places, '0');

export const formatUSDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});