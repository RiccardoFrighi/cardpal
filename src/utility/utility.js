import PokemonBack from "../assets/images/pokemonBack.png";

export const reverseDate = (str) => str.split('/').reverse().join('/');

export const getPokemonImage = (id) => `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${zeroPad(id, 3)}.png`;

export const pokemonDefaultImage = (onErrorEvent) =>  onErrorEvent.target.src = PokemonBack;

export const zeroPad = (num, places) => String(num).padStart(places, '0');