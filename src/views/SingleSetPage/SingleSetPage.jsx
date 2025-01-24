import {useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import CardsGrid from "../../components/CardsGrid/CardsGrid.jsx";
import SingleSetHeader from "../../components/SingleSetHeader/SingleSetHeader.jsx";
import CardsGridLoading from "../../components/CardsGrid/CardsGridLoading.jsx";
import SingleSetHeaderLoading from "../../components/SingleSetHeader/SingleSetHeaderLoading.jsx";
import {BreadcrumbItem, Breadcrumbs, Tab, Tabs} from "@heroui/react";
import CardsTable from "../../components/CardsTable/CardsTable.jsx";


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
    if (error) return <p>Error: {error}</p>;


    return (
        <div className="py-16 lg:px-16 flex flex-col gap-y-4 w-full">
            <Breadcrumbs key={"md"}
                         size={"md"}
                         className={"mb-4"}
                         itemClasses={{
                             item: "font-semibold data-[current=true]:text-foreground hover:text-foreground",
                         }}
            >
                <BreadcrumbItem isDisabled>All TCGs</BreadcrumbItem>
                <BreadcrumbItem>
                    <NavLink to={"/tcg/pokemon"}>
                        Pokemon
                    </NavLink>
                </BreadcrumbItem>
                {(!loading && !error) ?
                    <BreadcrumbItem>{setData.name}</BreadcrumbItem>
                :
                    ""}
            </Breadcrumbs>
            <section>
                {loading ?
                    <SingleSetHeaderLoading/>
                    :
                    (error ?
                            <p>Error: {error}</p>
                            :
                            <SingleSetHeader tcgName={"Pokémon"}
                                             setName={setData.name}
                                             images={setData.images}
                                             totalCards={setData.total}
                                             releaseDate={setData.releaseDate}
                            />
                    )
                }
            </section>
            <section className="flex flex-col items-end gap-2">
                <Tabs isDisabled={loading}
                      className={`${(!loading && (error || cardsData.length === 0) ? "hidden" : "")}`}>
                    <Tab key="grid" title="Grid">
                        {loading ?
                            <CardsGridLoading/>
                            :
                            (error ?
                                    <p>Error</p>
                                    :
                                    <CardsGrid cards={cardsData}/>
                            )
                        }
                    </Tab>
                    <Tab key="table" title="Table" className={"w-full"}>
                        <CardsTable cards={cardsData} fromSearch={false} />
                    </Tab>

                </Tabs>
            </section>
    </div>
);
};

export default SingleSetPage;