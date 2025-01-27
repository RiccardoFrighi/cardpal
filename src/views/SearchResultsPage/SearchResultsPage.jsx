import {NavLink, useSearchParams} from "react-router-dom";
import CardsGrid from "../../components/CardsGrid/CardsGrid.jsx";
import CardsGridLoading from "../../components/CardsGrid/CardsGridLoading.jsx";
import {Tabs, Tab, Image, Link} from "@heroui/react";
import CardsTable from "../../components/CardsTable/CardsTable.jsx";
import useGetSearchResults from "../../hooks/useGetSearchResults.jsx";
import ErrorBox from "../../components/ErrorBox/ErrorBox.jsx";

const SearchResultsPage = () => {

    const [searchParams] = useSearchParams();
    const query = searchParams.get("q"); // Recupera il valore di "q" dall'URL
    const {results, loading, error} = useGetSearchResults(query.split(" ")[0]);

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
            <section className={`flex flex-col ${(loading || results.length>0 ) ? "items-end" : ""} ${(error || results.length===0 ) ? "items-center" : ""} gap-2 w-full}`}>
                <Tabs isDisabled={loading}
                      className={`${(!loading && (error || results.length===0) ? "hidden" : "")}`}>
                    <Tab key="grid" title="Grid">
                        {loading ?
                            <CardsGridLoading/>
                            :
                            (error ?
                                    <ErrorBox />
                                    :
                                    (results.length > 0 ?
                                            <CardsGrid cards={results}/>
                                            :
                                            <div
                                                className={"flex flex-col items-center pt-8 text-2xl font-medium gap-6"}>
                                            Looks like results we couldn&#39;t find any results for &#34;{query}&#34;
                                                <Image src={"https://www.reactiongifs.com/r/2013/08/no-answer.gif"}
                                                       alt=""
                                        />
                                        <Link href={"/"} className={"underline text-small"}>Back to Home</Link>
                                    </div>
                                )
                            )
                        }
                    </Tab>
                    <Tab key="table" title="Table" className={"w-full"}>
                        <CardsTable cards={results} fromSearch={true} />
                    </Tab>
                </Tabs>
            </section>
        </div>
    )

}

export default SearchResultsPage;