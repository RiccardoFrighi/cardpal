import {useEffect, useState} from "react";

const useGetCard = (cardId) => {

    const [card, setCard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.pokemontcg.io/v2/cards/${cardId}`);
                if (!response.ok) {
                    return;
                    //throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setCard(result.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [cardId])


    return { card, loading, error };
}

export default useGetCard;