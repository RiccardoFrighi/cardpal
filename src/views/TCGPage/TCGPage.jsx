import TCGSerieGroup from "../../components/TCGSerie/TCGSerieGroup.jsx";
import PropTypes from "prop-types";
import TCGSerieGroupLoading from "../../components/TCGSerie/TCGSerieGroupLoading.jsx";
import {
    BreadcrumbItem,
    Breadcrumbs,
    Button,
    Drawer,
    DrawerBody,
    DrawerContent, DrawerFooter,
    DrawerHeader,
    Input, useDisclosure
} from "@heroui/react";
import useGetSets from "../../hooks/useGetSets.jsx";
import ErrorBox from "../../components/ErrorBox/ErrorBox.jsx";
import {useEffect, useState} from "react";
import {MagnifyingGlassIcon} from "@heroicons/react/16/solid/index.js";
import {AdjustmentsHorizontalIcon} from "@heroicons/react/24/solid/index.js";
import {
    countActiveFilters,
    extractSetsFilterOptions,
    filterSets
} from "../../components/Filters/filterFunctions.js";
import SetsFilters from "../../components/Filters/SetsFilters.jsx";
import EmptyFilteredResults from "../../components/Filters/EmptyFilteredResults.jsx";

const TCGPage = (props) => {

    const { name, logo } = props;
    const {sets, totalSets, loading, error} = useGetSets();

    const [setsLoaded, setSetsLoaded] = useState(false);
    const [userFilterInput, setUserFilterInput] = useState("")
    const [filteredSets, setFilteredSets ] = useState([])
    const [filterOptions, setFilterOptions] = useState([])
    const [activeFilters, setActiveFilters] = useState({
        series: [],
        years: [],
    });

    const {isOpen, onOpen, onOpenChange} = useDisclosure();


    // Resets the view to top of the page
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // Checks if the setCards are not empty, if so then the API call was successful we can update our filteredCards state
    useEffect(() => {
        if (!setsLoaded && !loading && !error && sets.length > 0) {
            setFilteredSets(sets);
            setFilterOptions(extractSetsFilterOptions(sets));
        }

        if(!setsLoaded && sets.length > 0) {
            setSetsLoaded(true)
        }

    }, [sets])

    // Filters the setCards based on the userFilterInput entered
    useEffect(() => {
        const filteredItems = applyFilters()
        setFilteredSets(filteredItems);
    }, [userFilterInput, activeFilters])

    // Applies the filters to the cards
    const applyFilters = () => {
        const filteredItems = sets.filter((card) =>
            card.name.toLowerCase().includes(userFilterInput.toLowerCase()) || card.series.toLowerCase().includes(userFilterInput.toLowerCase()))

        return filterSets(filteredItems, activeFilters);
    }

    // Applies the active filters
    const handleApplyFilters = (filters) => {
        let results = applyFilters(filteredSets, filters);
        setFilteredSets(results);
    };

    // Resets the active filters
    const handleResetFilters = () => {
        setFilteredSets(sets);
        setUserFilterInput("")
        setActiveFilters({
            series: [],
            years: [],
        })
    };

    // Stores the active filters count
    const activeFiltersCount = countActiveFilters(activeFilters);

    // Groups the sets by series
    function groupAndSortSetsBySeries(data) {
        const groupedData = data.reduce((acc, set) => {
            const series = set.series;
            if (!acc[series]) {
                acc[series] = [];
            }
            acc[series].push(set);
            return acc;
        }, {});

        for (const series in groupedData) {
            groupedData[series].sort((a, b) => {
                const dateA = new Date(a.releaseDate);
                const dateB = new Date(b.releaseDate);

                if (dateA > dateB) return -1;
                if (dateA < dateB) return 1;

                return a.name.localeCompare(b.name);
        })}

        return groupedData;
    }

    return (
        <div className="py-16 lg:px-16 flex flex-col gap-y-4 w-full">
            <Breadcrumbs key={"md"}
                         size={"md"}
                         className={"mb-4"}
                         itemClasses={{
                             item: "font-semibold data-[current=true]:text-foreground hover:text-foreground",
                         }}
            >
                <BreadcrumbItem isDisabled>All TCGs</BreadcrumbItem>
                <BreadcrumbItem>Pokemon</BreadcrumbItem>
            </Breadcrumbs>
            <section className={`flex flex-col sm:flex-row gap-4 mb-4 ${error ? "hidden" : ""}`}>
                <div className="relative h-[64px] w-full sm:w-40">
                    <img src={logo}
                         alt={`${name} Logo`}
                         className="object-contain w-full h-full"
                         loading={"lazy"}
                    />
                </div>
                <div className="flex flex-col items-center sm:items-start gap-x-1 py-1.5">
                    <h1 className="text-xl font-semibold text-foreground text-start">{name}</h1>
                    <div className="flex flex-row items-center gap-x-1">
                        <span className="text-base font-semibold text-foreground text-start">{totalSets} <span
                            className="text-xs text-foreground-500 leading-6">cards</span>
                        </span>
                    </div>
                </div>
            </section>
            <section className="mt-8 flex flex-col gap-12">
                {(loading || filterOptions.length === 0) ? "" :
                    <div className={"w-full flex flex-row gap-4"}>
                        <Input
                            isClearable
                            type="search"
                            name={"searchValue"}
                            classNames={{
                                base: "w-full sm:max-w-xs h-10",
                                listboxWrapper: "max-h-[40px]",
                                selectorButton: "text-default-500",
                                inputWrapper: "md:rounded-full"
                            }}
                            inputProps={{
                                classNames: {
                                    input: "ml-1",
                                    inputWrapper: "h-[48px]",
                                },
                            }}
                            value={userFilterInput}
                            onValueChange={setUserFilterInput}
                            placeholder="Search this set"
                            startContent={<MagnifyingGlassIcon className="text-default-400 fill-primary" height={20}
                                                               strokeWidth={2.5}/>}
                            variant="faded"
                        />
                        <div className={"flex flex-row justify-between"}>
                            <Button onPress={onOpen}
                                    radius={"full"}
                                    className={"font-medium"}
                                    startContent={<AdjustmentsHorizontalIcon className="fill-inherit w-5"/>}
                            >
                                Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ""}
                            </Button>
                            <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
                                <DrawerContent>
                                    {(onClose) => (
                                        <>
                                            <DrawerHeader
                                                className="flex flex-col gap-1 text-2xl">Filters</DrawerHeader>
                                            <DrawerBody>
                                                <SetsFilters filterOptions={filterOptions}
                                                              activeFilters={activeFilters}
                                                              setActiveFilters={setActiveFilters}
                                                              handleApplyFilters={handleApplyFilters}
                                                />
                                            </DrawerBody>
                                            <DrawerFooter>
                                                <Button color="danger" variant="light" onPress={handleResetFilters}>
                                                    Reset Filters
                                                </Button>
                                                <Button color="primary" onPress={onClose}>
                                                    Apply Filters
                                                </Button>
                                            </DrawerFooter>
                                        </>
                                    )}
                                </DrawerContent>
                            </Drawer>
                        </div>
                    </div>
                }
                {loading ?
                    <TCGSerieGroupLoading/>
                    :
                    (error ?
                            <ErrorBox />
                            :
                            <>
                                {filteredSets.length === 0 &&
                                (userFilterInput.length>0 || Object.values(activeFilters).some(arr => arr.length !== 0)) ?
                                    <EmptyFilteredResults handleResetFilters={handleResetFilters}
                                                          titleMessage={"Sorry, we couldn't find any set"}
                                    />
                                    :
                                    Object.keys(groupAndSortSetsBySeries(filteredSets)).reverse().map((series) => (
                                        <TCGSerieGroup key={series}
                                                       name={series}
                                                       serie={groupAndSortSetsBySeries(filteredSets)[series]}
                                        />
                                    ))
                                }
                            </>
                    )
                }
            </section>
        </div>
    );
};

export default TCGPage;

TCGPage.propTypes = {
    name: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
}