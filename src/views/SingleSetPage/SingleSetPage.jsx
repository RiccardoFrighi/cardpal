import {NavLink, useParams} from "react-router-dom";
import CardsGrid from "../../components/CardsGrid/CardsGrid.jsx";
import SingleSetHeader from "../../components/SingleSetHeader/SingleSetHeader.jsx";
import CardsGridLoading from "../../components/CardsGrid/CardsGridLoading.jsx";
import SingleSetHeaderLoading from "../../components/SingleSetHeader/SingleSetHeaderLoading.jsx";
import {BreadcrumbItem, Breadcrumbs, Tab, Tabs} from "@heroui/react";
import CardsTable from "../../components/CardsTable/CardsTable.jsx";
import useGetSingleSetCards from "../../hooks/useGetSingleSetCards.jsx";
import useGetSingleSet from "../../hooks/useGetSingleSet.jsx";


const SingleSetPage = () => {

    const {id} = useParams(); // Gets id from URL
    const {set, loading, error} = useGetSingleSet(id);
    const {setCards, setCardsLoading, setCardsError} = useGetSingleSetCards(id);

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
                            <p>Error: {error}</p>
                            :
                            <SingleSetHeader tcgName={"Pokémon"}
                                             setName={set.name}
                                             images={set.images}
                                             totalCards={set.total}
                                             releaseDate={set.releaseDate}
                            />
                    )
                }
            </section>
            <section className="flex flex-col items-end gap-2">
                <Tabs isDisabled={loading}
                      className={`${(!loading && (error || setCards.length === 0) ? "hidden" : "")}`}>
                    <Tab key="grid" title="Grid">
                        {(loading || setCardsLoading) ?
                            <CardsGridLoading/>
                            :
                            ((error || setCardsError) ?
                                    <p>Error</p>
                                    :
                                    <CardsGrid cards={setCards}/>
                            )
                        }
                    </Tab>
                    <Tab key="table" title="Table" className={"w-full"}>
                        <CardsTable cards={setCards} fromSearch={false} />
                    </Tab>

                </Tabs>
            </section>
    </div>
);
};

export default SingleSetPage;