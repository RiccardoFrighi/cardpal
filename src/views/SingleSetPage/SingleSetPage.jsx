import React, {useState, useEffect} from "react";
import {NavLink, useParams} from "react-router-dom";
import CardsGrid from "../../components/CardsGrid/CardsGrid.jsx";
import SingleSetHeader from "../../components/SingleSetHeader/SingleSetHeader.jsx";
import CardsGridLoading from "../../components/CardsGrid/CardsGridLoading.jsx";
import SingleSetHeaderLoading from "../../components/SingleSetHeader/SingleSetHeaderLoading.jsx";
import {
    BreadcrumbItem,
    Breadcrumbs,
    Button,
    ButtonGroup,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    Input, Select, SelectItem,
    useDisclosure,
} from "@heroui/react";
import CardsTable from "../../components/CardsTable/CardsTable.jsx";
import useGetSingleSetCards from "../../hooks/useGetSingleSetCards.jsx";
import useGetSingleSet from "../../hooks/useGetSingleSet.jsx";
import ErrorBox from "../../components/ErrorBox/ErrorBox.jsx";
import {MagnifyingGlassIcon} from "@heroicons/react/16/solid/index.js";
import {AdjustmentsHorizontalIcon} from "@heroicons/react/24/solid/index.js";
import {countActiveFilters, extractCardsFilterOptions, filterCards} from "../../components/Filters/filterFunctions.js";
import CardsFilters from "../../components/Filters/CardsFilters.jsx";
import EmptyFilteredResults from "../../components/Filters/EmptyFilteredResults.jsx";


const SingleSetPage = () => {

    const {id} = useParams(); // Gets id from URL
    const {set, loading, error} = useGetSingleSet(id);
    const {setCards, setCardsLoading, setCardsError} = useGetSingleSetCards(id);

    const [isGridView, setIsGridView] = React.useState(true);
    const [cardsLoaded, setCardsLoaded] = useState(false);
    const [userFilterInput, setUserFilterInput] = useState("")
    const [filteredCards, setFilteredCards ] = useState([])
    const [filterOptions, setFilterOptions] = useState([])
    const [activeFilters, setActiveFilters] = useState({
        rarities: [],
        supertypes: [],
        subtypes: [],
        types: [],
    });

    const sortOptions = {
        numberAsc: {
            key: "numberAsc",
            label: "Card # (asc)",
            sortFunction: (a, b) => parseInt(a.number) - parseInt(b.number)
        },
        numberDesc: {
            key: "numberDesc",
            label: "Card # (desc)",
            sortFunction: (a, b) => parseInt(b.number) - parseInt(a.number)
        },
        nameAsc: {
            key: "nameAsc",
            label: "Name (asc)",
            sortFunction: (a, b) => a.name.localeCompare(b.name)
        },
        nameDesc: {
            key: "nameDesc",
            label: "Name (desc)",
            sortFunction: (a, b) => b.name.localeCompare(a.name)
        }
    };

    const [selectedSort, setSelectedSort] = useState("numberAsc");

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    // Resets the view to top of the page
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // Checks if the setCards are not empty, if so then the API call was successful we can update our filteredCards state
    useEffect(() => {
        if (!cardsLoaded && !loading && !error && setCards.length > 0) {
            setFilteredCards(setCards);
            setFilterOptions(extractCardsFilterOptions(setCards));
        }

        if(!cardsLoaded && setCards.length > 0) {
            setCardsLoaded(true)
        }

    }, [setCards])

    // Filters the setCards based on the userFilterInput entered
    useEffect(() => {
        const filteredItems = applyFilters()
        setFilteredCards(filteredItems);
    }, [userFilterInput, activeFilters])

    // Applies the filters to the cards
    const applyFilters = () => {
        const filteredItems = setCards.filter((card) =>
            card.name.toLowerCase().includes(userFilterInput.toLowerCase()))

        return filterCards(filteredItems, activeFilters);
    }

    // Applies the active filters
    const handleApplyFilters = (filters) => {
        let results = applyFilters(filteredCards, filters)
        setFilteredCards(results);
    };

    // Resets the active filters
    const handleResetFilters = () => {
        setFilteredCards(setCards);
        setUserFilterInput("")
        setActiveFilters({
                rarities: [],
                supertypes: [],
                subtypes: [],
                types: [],
        })
    };

    // Stores the active filters count
    const activeFiltersCount = countActiveFilters(activeFilters);

    // // Applies the sort order
    const handleSortChange = (e) => {
        if (e.currentKey) {
            setSelectedSort(e.currentKey);
            let results = filteredCards.sort(sortOptions[e.currentKey].sortFunction);
            setFilteredCards(results);
        }

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
                <BreadcrumbItem>
                    <NavLink to={"/tcg/pokemon"}>
                        Pokemon
                    </NavLink>
                </BreadcrumbItem>
                {(!loading && !error) ?
                    <BreadcrumbItem>{set.name}</BreadcrumbItem>
                    :
                    ""}
            </Breadcrumbs>
            <section>
                {(loading || setCardsLoading)?
                    <SingleSetHeaderLoading/>
                    :
                    ((error || setCardsError) ?
                            <ErrorBox/>
                            :
                            <SingleSetHeader tcgName={"Pokémon"}
                                             setName={set.name}
                                             images={set.images}
                                             totalCards={set.total}
                                             releaseDate={set.releaseDate}
                                             className={`${(error || setCards.length === 0) ? "hidden" : ""}`}
                            />
                    )
                }
            </section>
            <section className="flex flex-col items-end gap-4">
                {(loading || setCardsLoading || filterOptions.length===0) ? "" :
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
                        <div className={"flex flex-row w-full justify-between gap-2 overflow-scroll"} style={{scrollbarWidth: "none"}}>
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
                            <div className={"flex flex-row gap-4"}>
                                <Select
                                    label="Sort by:"
                                    variant={"bordered"}
                                    labelPlacement={"outside-left"}
                                    selectedKeys={[selectedSort]}
                                    onSelectionChange={handleSortChange}
                                    disallowEmptySelection={true}
                                    radius={"full"}
                                    classNames={{
                                        base: "w-full items-center",
                                        label: "text-14 font-medium text-foreground-500 w-[6rem]",
                                        value: "text-14 font-medium",
                                        trigger: [
                                            "shadow-none",
                                            "data-[hover=true]:border-default-300",
                                            "data-[focus=true]:border-default-300",
                                            "data-[open=true]:border-default-300",
                                        ],
                                    }}
                                >
                                    {Object.values(sortOptions).map((option) => (
                                        <SelectItem key={option.key}>{option.label}</SelectItem>
                                    ))}
                                </Select>
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
                    </div>
                }
                {(loading || setCardsLoading) ?
                    <CardsGridLoading/>
                    :
                    <>
                        {filteredCards.length === 0 &&
                        (userFilterInput.length > 0 || Object.values(activeFilters).some(arr => arr.length !== 0)) ?
                            <EmptyFilteredResults handleResetFilters={handleResetFilters}
                                                  titleMessage={"Sorry, we couldn't find any card"}/>
                            :
                            (isGridView ?
                                    <CardsGrid cards={filteredCards}/>
                                    :
                                    <CardsTable cards={filteredCards}/>
                            )
                        }
                    </>
                }

            </section>
        </div>
    );

};

export default SingleSetPage;