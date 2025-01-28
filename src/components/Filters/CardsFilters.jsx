import {Button} from "@heroui/react";
import PropTypes from "prop-types";

const CardsFilters  = (props) => {

    const {filterOptions, activeFilters, setActiveFilters, handleApplyFilters} = props;

    const handleChange = (filter, key) => {
        const prevState = activeFilters[key].includes(filter);

        const selected = activeFilters[key];
        const newActiveFilters = {
            ...activeFilters,
            [key]: selected.includes(filter)
                ? selected.filter(item => item !== filter) // Deletes the filter
                : [...selected, filter] //Adds the new filter to his specific array
        };

        const nextState = newActiveFilters[key].includes(filter);
        if (prevState !== nextState) {
            setActiveFilters(newActiveFilters);
            handleApplyFilters(newActiveFilters)
        }
    };

    return (
        <div className={"flex flex-col gap-8"}>
            <div key={"rarities"} className={"flex flex-col gap-2 font-semibold text-small"}>
                RARITY
                <div className={"flex flex-row flex-wrap gap-2"}>
                    {filterOptions.rarities.map((filter) => (
                        <Button key={filter}
                                size="sm"
                                className={"font-medium"}
                                color={activeFilters.rarities.includes(filter) ? "secondary" : "default"}
                                onPress={() => handleChange(filter, 'rarities')}
                        >{filter.toUpperCase()}</Button>
                    ))}
                </div>
            </div>

            <div key={"supertypes"} className={"flex flex-col gap-2 font-semibold text-small"}>
                SUPERTYPE
                <div className={"flex flex-row flex-wrap gap-2"}>
                    {filterOptions.supertypes.map((filter) => (
                        <Button key={filter}
                                size="sm"
                                className={"font-medium"}
                                color={activeFilters.supertypes.includes(filter) ? "secondary" : "default"}
                                onPress={() => handleChange(filter, 'supertypes')}
                        >{filter.toUpperCase()}</Button>
                    ))}
                </div>
            </div>

            <div key={"subtypes"} className={"flex flex-col gap-2 font-semibold text-small"}>
                SUPERTYPE
                <div className={"flex flex-row flex-wrap gap-2"}>
                    {filterOptions.subtypes.map((filter) => (
                        <Button key={filter}
                                size="sm"
                                className={"font-medium"}
                                color={activeFilters.subtypes.includes(filter) ? "secondary" : "default"}
                                onPress={() => handleChange(filter, 'subtypes')}
                        >{filter.toUpperCase()}</Button>
                    ))}
                </div>
            </div>

            <div key={"types"} className={"flex flex-col gap-2 font-semibold text-small"}>
                TYPE
                <div className={"flex flex-row flex-wrap gap-2"}>
                    {filterOptions.types.map((filter) => (
                        <Button key={filter}
                                size="sm"
                                className={"font-medium"}
                                color={activeFilters.types.includes(filter) ? "secondary" : "default"}
                                onPress={() => handleChange(filter, 'types')}
                        >{filter.toUpperCase()}</Button>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default CardsFilters;

CardsFilters.propTypes = {
    filterOptions: PropTypes.object.isRequired,
    activeFilters: PropTypes.object.isRequired,
    setActiveFilters: PropTypes.func.isRequired,
    handleApplyFilters: PropTypes.func.isRequired,
}