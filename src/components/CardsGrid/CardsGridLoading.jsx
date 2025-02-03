import {Card, Image, Skeleton} from "@heroui/react";
import pokemonBack from "../../assets/images/pokemon-back.png";


const CardsGridLoading = () => {

    return (
        <section className="grid grid-cols-3 gap-2 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5">
            {[...Array(10)].map((x, i) =>
                <div key={i} className="flex flex-col gap-2">
                    <Card className="w-full h-full border-none animate-pulse">
                        <Image
                            src={pokemonBack}
                            alt={"Loading..."}
                            className={"opacity-0 w-full h-full"}
                            style={{opacity: 0}}

                        />
                    </Card>
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row justify-between gap-4">
                            <Skeleton className="h-6 w-4/5 rounded-lg animate-pulse"></Skeleton>
                            <Skeleton className="h-6 w-1/5 rounded-lg animate-pulse"></Skeleton>
                        </div>
                        <div className="flex flex-row justify-between">
                            <Skeleton className="h-5 w-1/3 rounded-lg animate-pulse"></Skeleton>
                            <Skeleton className="h-5 w-1/3 rounded-lg animate-pulse"></Skeleton>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default CardsGridLoading;