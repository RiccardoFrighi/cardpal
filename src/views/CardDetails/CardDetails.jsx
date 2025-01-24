import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {Divider, Image} from "@heroui/react";
import CardDetailsHeading from "../../components/CardDetailsInfo/CardDetailsHeading.jsx";
import CardDetailsInfo from "../../components/CardDetailsInfo/CardDetailsInfo.jsx";
import CardDetailsPrices from "../../components/CardDetailsInfo/CardDetailsPrices.jsx";
import CardDetailsLoading from "../../components/CardDetailsInfo/CardDetailsLoading.jsx";
import useGetCard from "../../hooks/useGetCard.jsx";

const CardDetails = () => {

    const {cardId} = useParams();
    const {card, loading, error} = useGetCard(cardId);

    // Resets the view to top of the page
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="container mx-auto my-20">
            {loading ?
                <CardDetailsLoading />
                :
                (error ?
                    <p>Error: {error}</p>
                :
                    <div className="flex flex-col md:flex-row w-full">
                        <section className={"px-20 md:px-0 mb-10 md:mb-0 md:mr-8" }>
                                <Image
                                    alt={card.name}
                                    src={card.images.large}
                                />

                        </section>

                        <section className={"w-full flex flex-col gap-y-8 items-start "}>
                            <CardDetailsHeading card={card} />
                            <Divider />
                            <CardDetailsPrices tcgplayer={card.tcgplayer} cardmarket={card.cardmarket} />
                            <Divider />
                            <CardDetailsInfo card={card} />
                        </section>
                    </div>
                )
            }
        </div>
    )
}

export default CardDetails;