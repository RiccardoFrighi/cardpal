import {useEffect, useState} from "react";

const useGetSearchResults = (query) => {

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${query}*&orderBy:set.releaseDate`);
                if (!response.ok) {
                    return;
                    //throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setResults(result.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [query])

    return {results, loading, error}
}

export default useGetSearchResults;