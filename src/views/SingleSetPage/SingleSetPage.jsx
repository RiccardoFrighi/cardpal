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
    Input,
    useDisclosure,
} from "@heroui/react";
import CardsTable from "../../components/CardsTable/CardsTable.jsx";
import useGetSingleSetCards from "../../hooks/useGetSingleSetCards.jsx";
import useGetSingleSet from "../../hooks/useGetSingleSet.jsx";
import ErrorBox from "../../components/ErrorBox/ErrorBox.jsx";
import {MagnifyingGlassIcon} from "@heroicons/react/16/solid/index.js";
import {AdjustmentsHorizontalIcon} from "@heroicons/react/24/solid/index.js";
import {countActiveFilters, extractCardsFilterOptions} from "../../components/Filters/filterFunctions.js";
import SingleSetPageFilters from "../../components/Filters/SingleSetPageFilters.jsx";


const SingleSetPage = () => {

    const {id} = useParams(); // Gets id from URL
    const {set, loading, error} = useGetSingleSet(id);
    const {setCards, setCardsLoading, setCardsError} = useGetSingleSetCards(id);

    const [isGridView, setIsGridView] = React.useState(true);
    const [cardsLoaded, setCardsLoaded] = useState(false);
    const [userFilterInput, setUserFilterInput] = useState("")
    const [filteredCards, setFilteredCards ] = useState()
    const [filterOptions, setFilterOptions] = useState([])
    const [activeFilters, setActiveFilters] = useState({
        rarities: [],
        supertypes: [],
        subtypes: [],
        types: [],
    });

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
    function applyFilters() {
        const filteredItems = setCards.filter((card) =>
            card.name.toLowerCase().includes(userFilterInput.toLowerCase()))

        return filteredItems.filter(card => {
            // Check rarity filter
            const matchesRarity = activeFilters.rarities.length === 0 ||
                (card.rarity && activeFilters.rarities.includes(card.rarity));


            // Check supertype filter
            const matchesSupertype = activeFilters.supertypes.length === 0 ||
                (card.supertype && activeFilters.supertypes.includes(card.supertype));

            // Check subtype filter
            const matchesSubtype = activeFilters.subtypes.length === 0 ||
                (card.subtypes && card.subtypes.some(subtype => activeFilters.subtypes.includes(subtype)));

            // Check type filter
            const matchesType = activeFilters.types.length === 0 ||
                (card.types && card.types.some(type => activeFilters.types.includes(type)));

            return matchesRarity && matchesSupertype && matchesSubtype && matchesType;

        });
    }

    const handleApplyFilters = (filters) => {
        let results = applyFilters(filteredCards, filters);
        setFilteredCards(results);
    };

    const handleResetFilters = () => {
        setFilteredCards(setCards);
        setActiveFilters({
                rarities: [],
                supertypes: [],
                subtypes: [],
                types: [],
        })
    };

    const activeFiltersCount = countActiveFilters(activeFilters);


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
                        startContent={<MagnifyingGlassIcon className="text-default-400 fill-primary" height={20} strokeWidth={2.5} />}
                        variant="faded"
                    />
                    <div className={"flex flex-row w-full justify-between"}>
                        <Button onPress={onOpen}
                                radius={"full"}
                                className={"font-medium"}
                                startContent={<AdjustmentsHorizontalIcon className="fill-inherit w-5" />}
                        >
                            Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ""}
                        </Button>
                        <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
                            <DrawerContent>
                                {(onClose) => (
                                    <>
                                        <DrawerHeader className="flex flex-col gap-1 text-2xl">Filters</DrawerHeader>
                                        <DrawerBody>
                                            <SingleSetPageFilters filterOptions={filterOptions}
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
                {(loading || setCardsLoading) ?
                    <CardsGridLoading/>
                    :
                    ((error || setCardsError) ?
                            ""
                            :
                        (isGridView ?
                            <CardsGrid cards={filteredCards}/>
                        :
                            <CardsTable cards={filteredCards}/>
                        )
                    )
                }

            </section>
        </div>
    );

};

export default SingleSetPage;