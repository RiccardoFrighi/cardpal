import {useEffect, useState} from "react";

const useGetSingleSetCards = (setId) => {

    const [setCards, setCardsSet] = useState([]);
    const [setCardsLoading, setSetCardsLoading] = useState(true);
    const [setCardsError, setSetCardsError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=set.id:${setId}&orderBy=number`);
                if (!response.ok) {
                    return;
                    // throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setCardsSet(result.data);
            } catch (err) {
                setSetCardsError(err.message);
            } finally {
                setSetCardsLoading(false);
            }
        };

        fetchData();
    }, [setId])


    return { setCards, setCardsLoading, setCardsError };
}

export default useGetSingleSetCards;