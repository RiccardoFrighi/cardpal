import {Card, CardBody, Link} from "@heroui/react";
import {zeroPad} from "../../utility/utility.js";
import PropTypes from "prop-types";

const CardDetailsHeading = (props) => {

    const card = props.card;

    return (
        <section className={"w-full flex flex-col gap-y-4 items-start "}>
            <div className="flex flex-row items-center gap-2">
                <Link href={"tcg/pokemon"}>
                    <Card radius={"sm"} className={"text-foreground font-semibold text-sm bg-white dark:bg-content2"}>
                        <CardBody className="py-1.5 px-2.5">
                            POKÉMON
                        </CardBody>
                    </Card>
                </Link>
                <Link href={`tcg/pokemon/${card.set.id}`}>
                    <Card radius={"sm"} className={"text-foreground font-semibold text-sm bg-white dark:bg-content2"}>
                        <CardBody className="py-1.5 px-2.5">
                            {card.set.name.toUpperCase()}
                        </CardBody>
                    </Card>
                </Link>
            </div>
            <div className="flex flex-col items-start gap-1">
                <h1 className={"text-3xl font-bold"}>{card.name}</h1>
                <p className="text-xl font-semibold text-foreground-600 text-start">
                    #{zeroPad(card.number, (card.set.total+'').length)}/{card.set.total}
                </p>
            </div>
        </section>
    )
}

export default CardDetailsHeading;

CardDetailsHeading.propTypes = {
    card: PropTypes.object.isRequired,
}