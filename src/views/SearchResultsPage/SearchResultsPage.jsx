import React, {useState, useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import CardsGrid from "../../components/CardsGrid/CardsGrid.jsx";
import CardsGridLoading from "../../components/CardsGrid/CardsGridLoading.jsx";
import {
    useDisclosure,
    Input,
    Button,
    Drawer,
    DrawerContent,
    DrawerHeader, DrawerBody, DrawerFooter, ButtonGroup, Image, Link
} from "@heroui/react";
import CardsTable from "../../components/CardsTable/CardsTable.jsx";
import useGetSearchResults from "../../hooks/useGetSearchResults.jsx";
import {countActiveFilters, extractCardsFilterOptions, filterCards} from "../../components/Filters/filterFunctions.js";
import {MagnifyingGlassIcon} from "@heroicons/react/16/solid/index.js";
import {AdjustmentsHorizontalIcon} from "@heroicons/react/24/solid/index.js";
import CardsFilters from "../../components/Filters/CardsFilters.jsx";
import ErrorBox from "../../components/ErrorBox/ErrorBox.jsx";
import EmptyFilteredResults from "../../components/Filters/EmptyFilteredResults.jsx";


const SearchResultsPage = () => {

    const [searchParams] = useSearchParams();
    const query = searchParams.get("q"); // Recupera il valore di "q" dall'URL
    const {results, loading, error} = useGetSearchResults(query.split(" ")[0]);

    const [isGridView, setIsGridView] = React.useState(true);
    const [cardsLoaded, setCardsLoaded] = useState(false);
    const [userFilterInput, setUserFilterInput] = useState("")
    const [filteredResults, setFilteredResults ] = useState()
    const [filterOptions, setFilterOptions] = useState([])
    const [activeFilters, setActiveFilters] = useState({
        rarities: [],
        supertypes: [],
        subtypes: [],
        types: []
    });

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    // Resets the view to top of the page
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // Checks if the setCards are not empty, if so then the API call was successful we can update our filteredCards state
    useEffect(() => {
        if (!cardsLoaded && !loading && !error && results.length > 0) {
            setFilteredResults(results);
            setFilterOptions(extractCardsFilterOptions(results));
        }

        if(!cardsLoaded && results.length > 0) {
            setCardsLoaded(true)
        }

    }, [results])

    // Filters the setCards based on the userFilterInput entered
    useEffect(() => {
        const filteredItems = applyFilters()
        setFilteredResults(filteredItems);
    }, [userFilterInput, activeFilters])

    // Applies the filters to the cards
    const applyFilters = () => {
        const filteredItems = results.filter((card) =>
            card.name.toLowerCase().includes(userFilterInput.toLowerCase()))

        return filterCards(filteredItems, activeFilters);
    }

    // Applies the active filters
    const handleApplyFilters = (filters) => {
        let results = applyFilters(filteredResults, filters);
        setFilteredResults(results);
    };

    // Resets the active filters
    const handleResetFilters = () => {
        setFilteredResults(results);
        setUserFilterInput("")
        setActiveFilters({
            rarities: [],
            supertypes: [],
            subtypes: [],
            types: []
        })
    };

    //Store the active filters count
    const activeFiltersCount = countActiveFilters(activeFilters);

    return (
        <div className="py-16 lg:px-16 flex flex-col gap-y-4 w-full">
            <section className="h-20">
                <div className="flex flex-col items-center sm:items-start gap-x-1 py-1.5">
                    <h1 className="text-3xl font-semibold text-foreground text-start">&#34;{query}&#34;</h1>
                    <div className="flex flex-row items-center gap-x-1">
                        <span className="text-base font-semibold text-foreground text-start">{results.length} <span
                            className="text-xs text-foreground-500 leading-6">search results</span>
                        </span>
                    </div>
                </div>
            </section>
            <section className="flex flex-col items-end gap-4">
                {(loading || filterOptions.length === 0) ?
                    ""
                    :
                    <div className={"w-full flex flex-col md:flex-row gap-2 md:gap-4"}>
                        <Input
                            isClearable
                            type="search"
                            name={"searchValue"}
                            classNames={{
                                base: "w-full md:max-w-xs h-10",
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
                        <div className={"flex flex-row w-full justify-between"}>
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
                                                <CardsFilters filterOptions={filterOptions}
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
                            <ButtonGroup>
                                <Button isDisabled={isGridView}
                                        radius={"full"}
                                        className={"font-medium"}
                                        onPress={() => setIsGridView(!isGridView)}
                                >
                                    Grid
                                </Button>
                                <Button isDisabled={!isGridView}
                                        radius={"full"}
                                        className={"font-medium"}
                                        onPress={() => setIsGridView(!isGridView)}
                                >
                                    Table
                                </Button>
                            </ButtonGroup>
                        </div>
                    </div>
                }
                {loading ?
                    <CardsGridLoading/>
                    :
                    (error ?
                            <ErrorBox />
                            :
                            <>
                            {results.length === 0 ?
                                    <div className="flex flex-col w-full pt-8 items-center" >
                                        <Image src={"https://gbatemp.net/attachments/squirtle-cries-water-puddles-on-pokemon-gif.273223"}
                                               alt={"No results found"}
                                               height={144}
                                               className={"mb-4"}
                                        />
                                        <h2 className={"text-2xl font-bold mb-1"}>Oops! We couldn&#39;t find any matches</h2>
                                        <p className={"mb-6"}>Try refining your search or using different keywords.</p>
                                        <Link href={"/"} className={"underline text-small"}>Back to Home</Link>
                                    </div>
                                    :
                                    (filteredResults.length === 0 && (userFilterInput.length>0 || Object.values(activeFilters).some(arr => arr.length !== 0)) ?
                                        <EmptyFilteredResults handleResetFilters={handleResetFilters} titleMessage={"Sorry, we couldn't find any card"} />
                                    :
                                        (isGridView ?
                                            <CardsGrid cards={filteredResults}/>
                                        :
                                            <CardsTable cards={filteredResults}/>
                                        )
                                    )
                            }
                            </>

                    )
                }

            </section>
        </div>
    )

}

export default SearchResultsPage;