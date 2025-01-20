import SingleSetCard from "../SingleSetCard/SingleSetCard.jsx";
import PropTypes from "prop-types";

const CardsGrid = (props) => {

    const {cards } = props;

    function getStringBeforeDash(input) {
        return input.slice(0, input.indexOf("-"));
    }

    return (
        <section className="grid grid-cols-3 gap-2 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5">
            {cards.map((card) => (
                <SingleSetCard key={card.id}
                               id={card.id}
                               setId={getStringBeforeDash(card.id)}
                               card={card}
                />
            ))}
        </section>
    )
}

export default CardsGrid;

CardsGrid.propTypes = {
    cards: PropTypes.array.isRequired
}