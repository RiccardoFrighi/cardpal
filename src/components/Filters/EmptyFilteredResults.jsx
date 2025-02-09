import {Button, Card, Image,} from "@heroui/react";
import PropTypes from "prop-types";
import pokemonback from "../../assets/images/pokemon-back.png";

const EmptyFilteredResults = (props) => {

    const {handleResetFilters, titleMessage} = props;

    return (
        <div className="flex flex-col items-center relative gap-4">
            <div className="flex flex-col h-fit items-center absolute z-50 top-24">
                <Image src={"https://media.tenor.com/StMx6F8h5RQAAAAe/psyduck-confused.png"}
                     alt={titleMessage}
                     height={144}
                     className={"mb-4"}
                />
                <h2 className={"text-2xl font-bold mb-1"}>{titleMessage}</h2>
                <p className={"mb-6"}>Try adjusting your search term and/or filters applied.</p>
                <Button className={"w-fit"}
                        color={"primary"}
                        onPress={handleResetFilters}
                >
                    Remove filters
                </Button>
            </div>
            <section className="grid grid-cols-3 gap-2 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5">
                {[...Array(10)].map((x, i) =>
                    <div key={i} className="flex flex-col gap-2">
                        <Card className="w-full h-full border-none">
                            <Image
                                src={pokemonback}
                                alt={"Loading..."}
                                className={"opacity-0 w-full h-full"}
                                style={{opacity: 0}}

                            />
                        </Card>
                    </div>
                )}
            </section>
        </div>
    )
}

export default EmptyFilteredResults;

EmptyFilteredResults.propTypes = {
    handleResetFilters: PropTypes.func.isRequired,
    titleMessage: PropTypes.string.isRequired,
}