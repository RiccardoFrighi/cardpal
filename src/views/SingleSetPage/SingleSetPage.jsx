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
    Input
} from "@heroui/react";
import CardsTable from "../../components/CardsTable/CardsTable.jsx";
import useGetSingleSetCards from "../../hooks/useGetSingleSetCards.jsx";
import useGetSingleSet from "../../hooks/useGetSingleSet.jsx";
import ErrorBox from "../../components/ErrorBox/ErrorBox.jsx";
import {MagnifyingGlassIcon} from "@heroicons/react/16/solid/index.js";



const SingleSetPage = () => {

    const {id} = useParams(); // Gets id from URL
    const {set, loading, error} = useGetSingleSet(id);
    const {setCards, setCardsLoading, setCardsError} = useGetSingleSetCards(id);

    const [userFilterInput, setUserFilterInput] = useState("")
    const [filteredCards, setFilteredCards ] = useState()
    const [isGridView, setIsGridView] = React.useState(true);

    // Resets the view to top of the page
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    // Checks if the users are not empty, if so then the
    // API call was successful and we can update our filteredCards state
    useEffect(() => {
        if (Object.keys(setCards).length > 0) {
            setFilteredCards(setCards)
        }
    }, [setCards])


    useEffect(() => {
        const filteredItems = setCards.filter((card) =>
            card.name.toLowerCase().includes(userFilterInput.toLowerCase())
        )
        setFilteredCards(filteredItems);
    }, [userFilterInput])


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
                <div className={"w-full flex justify-between"}>
                    <Input
                        isClearable
                        type="search"
                        name={"searchValue"}
                        classNames={{
                            base: "max-w-xs h-10",
                            listboxWrapper: "max-h-[40px]",
                            selectorButton: "text-default-500",
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
                        radius="full"
                        startContent={<MagnifyingGlassIcon className="text-default-400 fill-primary" height={20} strokeWidth={2.5} />}
                        variant="faded"
                    />
                    <ButtonGroup>
                        <Button isDisabled={isGridView} onPress={() => setIsGridView(!isGridView)}>Grid</Button>
                        <Button isDisabled={!isGridView} onPress={() => setIsGridView(!isGridView)}>Table</Button>
                    </ButtonGroup>

                </div>
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