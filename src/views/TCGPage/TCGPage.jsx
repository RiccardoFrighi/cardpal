import { useEffect, useState} from "react";
import TCGSerieGroup from "../../components/TCGSerie/TCGSerieGroup.jsx";
import PropTypes from "prop-types";
import TCGSerieGroupLoading from "../../components/TCGSerie/TCGSerieGroupLoading.jsx";

const TCGPage = (props) => {

    const { name, logo } = props;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalSets, setTotalSets] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.pokemontcg.io/v2/sets?orderBy=releaseDate');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result.data); // `result.data` contiene i set.
                setTotalSets(result.totalCount)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    function groupAndSortSetsBySeries(data) {
        const groupedData = data.reduce((acc, set) => {
            const series = set.series; // Prendi la serie del set
            if (!acc[series]) {
                acc[series] = []; // Crea un array vuoto per la serie, se non esiste
            }
            acc[series].push(set); // Aggiungi il set al gruppo corrispondente
            return acc;
        }, {});


        for (const series in groupedData) {
            groupedData[series].sort((a, b) => {
                const dateA = new Date(a.releaseDate);
                const dateB = new Date(b.releaseDate);

                if (dateA > dateB) return -1; // Più recente prima
                if (dateA < dateB) return 1;  // Più vecchio dopo

                // In caso di data di uscita uguale, ordina per nome in ordine alfabetico
                return a.name.localeCompare(b.name);
        })}

        return groupedData;
    }

    const groupedAndSortedSets = groupAndSortSetsBySeries(data);

    return (
        <div className="py-16 lg:px-16 flex flex-col gap-y-4 w-full">
            <section className="flex flex-col sm:flex-row gap-4 mb-4">
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
                {loading ?
                    <TCGSerieGroupLoading/>
                    :
                    (error ?
                            <p>Error: {error}</p>
                            :
                            Object.keys(groupedAndSortedSets).reverse().map((series) => (
                                <TCGSerieGroup key={series}
                                               name={series}
                                               serie={groupedAndSortedSets[series]}
                                />
                            ))
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