import {Button} from "@heroui/react";
import PropTypes from "prop-types";

const SetsFilters  = (props) => {
    const {filterOptions, activeFilters, setActiveFilters, handleApplyFilters} = props;

    // Updates the activeFilters
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
                SERIES
                <div className={"flex flex-row flex-wrap gap-2"}>
                    {filterOptions.series.map((filter) => (
                        <Button key={filter}
                                size="sm"
                                className={"font-medium"}
                                color={activeFilters.series.includes(filter) ? "secondary" : "default"}
                                onPress={() => handleChange(filter, 'series')}
                        >{filter.toUpperCase()}</Button>
                    ))}
                </div>
            </div>

            <div key={"supertypes"} className={"flex flex-col gap-2 font-semibold text-small"}>
                YEAR
                <div className={"flex flex-row flex-wrap gap-2"}>
                    {filterOptions.years.map((filter) => (
                        <Button key={filter}
                                size="sm"
                                className={"font-medium"}
                                color={activeFilters.years.includes(filter) ? "secondary" : "default"}
                                onPress={() => handleChange(filter, 'years')}
                        >{filter.toUpperCase()}</Button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SetsFilters;

SetsFilters.propTypes = {
    filterOptions: PropTypes.object.isRequired,
    activeFilters: PropTypes.object.isRequired,
    setActiveFilters: PropTypes.func.isRequired,
    handleApplyFilters: PropTypes.func.isRequired,
}