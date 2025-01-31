import {Card, Divider, Image, Skeleton} from "@heroui/react";
import PokemonBack from "../../assets/images/pokemon-back.png";


const CardDetailsLoading = () => {

    return (
        <div className="flex flex-col md:flex-row w-full">
            <section className={"px-20 md:px-0 mb-10 md:mb-0 md:mr-8"}>
                <Card className={"border-none md:w-96 lg:w-2xl animate-pulse"}>
                    <Image
                        src={PokemonBack}
                        alt={"Loading..."}
                        className={"opacity-0 w-full h-full"}
                        style={{opacity: 0}}
                    />
                </Card>
            </section>
            <div className={"w-full flex flex-col gap-y-8 items-start "}>
                <section className={"w-full flex flex-col gap-y-4 items-start "}>
                    <div className="flex flex-row items-center gap-2">
                        <Card radius={"sm"} className={"w-24 h-8 animate-pulse"}/>
                        <Card radius={"sm"} className={"w-40 h-8 animate-pulse"}/>
                    </div>
                    <div className="flex flex-col items-start gap-1">
                        <Skeleton className="w-64 h-8 animate-pulse rounded-md"/>
                        <Skeleton className="w-28 h-7 animate-pulse rounded-md"/>
                    </div>
                </section>
                <Divider/>
                <section className={"w-full flex flex-col gap-4"}>
                    <Card className={"w-full h-40 animate-pulse"}/>
                    <div className="flex flex-row justify-end items-end w-full gap-2">
                        <Skeleton className="w-32 h-6 animate-pulse rounded-md"/>
                    </div>
                </section>
                <Divider/>
                <div className="w-full grid grid-cols-4 md:grid-cols-2 gap-8 items-start flex-wrap ">
                    <div className="flex flex-col items-start w-full gap-0.5">
                        <Skeleton className="h-5 w-24 animate-pulse rounded-md"/>
                        <Skeleton className=" h-6 w-12 animate-pulse rounded-md"/>
                    </div>
                    <div className="flex flex-col items-start w-full gap-0.5">
                        <Skeleton className="h-5 w-24 animate-pulse rounded-md"/>
                        <Skeleton className=" h-6 w-12 animate-pulse rounded-md"/>
                    </div>
                    <div className="flex flex-col items-start w-full gap-0.5">
                        <Skeleton className="h-5 w-24 animate-pulse rounded-md"/>
                        <Skeleton className=" h-6 w-12 animate-pulse rounded-md"/>
                    </div>
                    <div className="flex flex-col items-start w-full gap-0.5">
                        <Skeleton className="h-5 w-24 animate-pulse rounded-md"/>
                        <Skeleton className=" h-6 w-12 animate-pulse rounded-md"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardDetailsLoading;