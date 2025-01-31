import TCGSerieSingleSet from "./TCGSerieSingleSet.jsx";
import PropTypes from "prop-types";

const TCGSerieGroup = (props) => {

    const{ name, serie } = props;

    return (
        <div key={name} className="flex flex-col items-start gap-4">
            <h2 className="text-lg sm:text-2xl font-semibold">{name}</h2>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 md:gap-x-4 gap-y-4 xl:px-0 w-full">
                {serie.map((set) => (
                    <TCGSerieSingleSet key={set.id}
                                       id={set.id}
                                       name={set.name}
                                       images={set.images}
                                       releaseDate={set.releaseDate}
                                       totalCards={set.printedTotal}
                    />
                ))}
            </section>
        </div>

    )
}

export default TCGSerieGroup;

TCGSerieGroup.propTypes = {
    name: PropTypes.string.isRequired,
    serie: PropTypes.array.isRequired,
}