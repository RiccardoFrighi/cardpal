import {useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import {reverseDate} from "../../utility/utility.js";
import CardsGrid from "../../components/CardsGrid/CardsGrid.jsx";


const SingleSetPage = () => {


    const {id} = useParams(); // Prende l'id dal URL
    const [setData, setSetData] = useState(null);
    const [cardsData, setCardsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSetAndCards = async () => {
            try {
                setLoading(true);

                // URL per il set e le carte
                const setUrl = `https://api.pokemontcg.io/v2/sets/${id}`;
                const cardsUrl = `https://api.pokemontcg.io/v2/cards?q=set.id:${id}`;

                // Fetch parallelo
                const [setResponse, cardsResponse] = await Promise.all([
                    fetch(setUrl),
                    fetch(cardsUrl),
                ]);

                // Controllo errori nelle risposte
                if (!setResponse.ok || !cardsResponse.ok) {
                    throw new Error("Errore durante il recupero dei dati.");
                }

                // Parsing delle risposte
                const setData = await setResponse.json();
                const cardsData = await cardsResponse.json();

                // Aggiornamento stato
                setSetData(setData.data);
                setCardsData(cardsData.data.sort((a, b) => a.number.localeCompare(b.number, undefined, { numeric: true })));

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSetAndCards();
    }, [id]); // Esegui di nuovo se cambia l'id

    // Render della UI
    if (loading) return <p>Caricamento in corso...</p>;
    if (error) return <p>Errore: {error}</p>;

    return (
        <div className="py-16 lg:px-16 flex flex-col">
            <section className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative h-[64px] w-full sm:w-40">
                    <img src={setData.images.logo}
                           alt={`${setData.name} Logo`}
                           className="object-contain w-full h-full"
                           loading={"lazy"}
                    />
                </div>
                <div className="flex flex-col items-center sm:items-start gap-x-1 py-1.5">
                    <h1 className="text-xl font-semibold text-foreground text-start">{setData.name}</h1>
                    <div className="flex flex-row items-center gap-x-1">
                        <NavLink to={"/tcg/pokemon"}>
                            <span className="text-base font-semibold text-foreground text-start">Pokémon</span>
                        </NavLink>
                        <span className="hidden text-xs md:block mx-0.5 font-black text-foreground-500">•</span>
                        <span className="hidden md:block text-base font-semibold text-foreground text-start">{setData.name}</span>
                        <span className="mx-0.5 text-xs font-black text-foreground-500">•</span>
                        <span className="text-base font-semibold text-foreground text-start">{setData.total} <span
                            className="text-xs text-foreground-500 leading-6">cards</span>
                        </span>
                        <span className="mx-0.5 text-xs font-black text-foreground-500">•</span>
                        <span className="text-base font-semibold text-foreground text-start">{reverseDate(setData.releaseDate)} <span
                            className="text-xs font-medium text-foreground-500 leading-6">release date</span>
                        </span>
                    </div>
                </div>
            </section>
            <section className="mt-8 flex flex-col gap-12">
                {loading ?
                    <p>Caricamento in corso...</p>
                    :
                    (error ?
                            <p>Errore: {error}</p>
                    :
                        <CardsGrid setId={setData.id} cards={cardsData} />
                    )
                }
            </section>
        </div>
    );
};

export default SingleSetPage;