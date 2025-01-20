import {useState, useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import CardsGrid from "../../components/CardsGrid/CardsGrid.jsx";
import CardsGridLoading from "../../components/CardsGrid/CardsGridLoading.jsx";

const SearchResultsPage = () => {

    const [searchParams] = useSearchParams();
    const query = searchParams.get("q"); // Recupera il valore di "q" dall'URL
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (query) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${query}*&orderBy:set.releaseDate`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const result = await response.json();
                    setResults(result.data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                    console.log(results)
                }
            };

            fetchData();
        }
    }, [query]);

    return (
        <div className="py-16 lg:px-16 flex flex-col gap-y-4">
            <section>
                <div className="flex flex-col items-center sm:items-start gap-x-1 py-1.5">
                    <h1 className="text-xl font-semibold text-foreground text-start">"{query}"</h1>
                    <div className="flex flex-row items-center gap-x-1">
                        <span className="text-base font-semibold text-foreground text-start">{results.length} <span
                            className="text-xs text-foreground-500 leading-6">search results</span>
                        </span>
                    </div>
                </div>
            </section>
            <section>
                {loading ?
                    <CardsGridLoading/>
                    :
                    (error ?
                            <p>Error</p>
                            :
                            <CardsGrid cards={results}/>
                    )
                }
            </section>
        </div>
    )

}

export default SearchResultsPage;