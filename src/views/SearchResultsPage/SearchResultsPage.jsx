import {useSearchParams} from "react-router-dom";
import CardsGrid from "../../components/CardsGrid/CardsGrid.jsx";
import CardsGridLoading from "../../components/CardsGrid/CardsGridLoading.jsx";
import {Tabs, Tab} from "@heroui/react";
import CardsTable from "../../components/CardsTable/CardsTable.jsx";
import useGetSearchResults from "../../hooks/useGetSearchResults.jsx";

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
            <section className="flex flex-col items-end gap-2">
                <Tabs isDisabled={loading}
                      className={`${(!loading && (error || results.length===0) ? "hidden" : "")}`}>
                    <Tab key="grid" title="Grid">
                        {loading ?
                            <CardsGridLoading/>
                            :
                            (error ?
                                <div>Error</div>
                            :
                                <CardsGrid cards={results}/>
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