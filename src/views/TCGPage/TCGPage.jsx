import { useEffect, useState} from "react";
import TCGSerieGroup from "../../components/TCGSerie/TCGSerieGroup.jsx";
import { Image, Card } from "@heroui/react";
import PropTypes from "prop-types";

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

    if (error) return <p>Error: {error}</p>;


    return (
        <div className="p-16 flex flex-col gap-y-4">
            <div className="flex flex-row gap-4 h-16">
                <Image src={logo}
                       alt={`${name} Logo`}
                       className="object-contain w-full h-full"
                       loading={"lazy"}
                />
                <div className="flex flex-col items-start justify-center">
                    <h1 className="text-xl font-semibold text-foreground text-start">{name}</h1>
                    <p className="text-sm font-medium text-foreground-500 leading-6">
                        <span className="text-base font-semibold text-foreground text-start">{totalSets}</span> sets
                    </p>
                </div>
            </div>
            <section className="mt-8 flex flex-col gap-12">
                {loading ?
                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:px-0 w-full">
                        <Card>
                            <Image
                                src={"https://app.requestly.io/delay/5000/https://heroui.com/images/hero-card-complete.jpeg"}
                                alt={"Loading..."}
                                height={160}
                            />
                        </Card>
                        <Card>
                            <Image
                                src={"https://app.requestly.io/delay/5000/https://heroui.com/images/hero-card-complete.jpeg"}
                                alt={"Loading..."}
                                height={160}
                            />
                        </Card>
                        <Card>
                            <Image
                                src={"https://app.requestly.io/delay/5000/https://heroui.com/images/hero-card-complete.jpeg"}
                                alt={"Loading..."}
                                height={160}
                            />
                        </Card>
                        <Card>
                            <Image
                                src={"https://app.requestly.io/delay/5000/https://heroui.com/images/hero-card-complete.jpeg"}
                                alt={"Loading..."}
                                height={160}
                            />
                        </Card>
                    </section>
                    :
                    Object.keys(groupedAndSortedSets).reverse().map((series) => (
                        <TCGSerieGroup key={series}
                                       name={series}
                                       serie={groupedAndSortedSets[series]}
                        />
                    ))
                }
            </section>
        </div>
    );
};

export default TCGPage;

TCGPage.propTypes = {
    name: PropTypes.string.isRequired,
    logo: PropTypes.object.isRequired,
}