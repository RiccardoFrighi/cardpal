import {useEffect, useState} from "react";

const useGetSets = () => {

    const [sets, setSets] = useState([]);
    const [totalSets, setTotalSets] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.pokemontcg.io/v2/sets?orderBy=releaseDate');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setSets(result.data);
                setTotalSets(result.totalCount)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    return { sets, totalSets, loading, error };
}

export default useGetSets;