import {useEffect, useState} from "react";

const useGetSingleSet = (setId) => {

    const [set, setSet] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.pokemontcg.io/v2/sets/${setId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setSet(result.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [setId])


    return { set, loading, error };
}

export default useGetSingleSet;