import {Skeleton} from "@heroui/react";
import {pokemonLogo} from "../../utility/utility.js";


const SingleSetHeaderLoading = () => {

    return (
        <section className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative h-[64px] animate-pulse w-full sm:w-40">
                <img src={pokemonLogo}
                     alt={`Loading Set Logo`}
                     className="object-contain w-full h-full"
                     loading={"lazy"}

                />
            </div>
            <div className="flex flex-col items-center sm:items-start gap-x-1 gap-y-1 py-1.5">
                <Skeleton className="w-48 h-7 animate-pulse rounded-lg" />
                <div className="flex flex-row items-center gap-x-1">
                    <Skeleton className="w-14 md:w-28 h-5 animate-pulse rounded-md" />
                    <div className="hidden md:block mx-0.5 text-xs text-foreground-300 font-black animate-pulse">•</div>
                    <Skeleton className="w-28 h-5 hidden md:block animate-pulse rounded-md" />
                    <div className="mx-0.5 text-xs text-foreground-300 font-black animate-pulse">•</div>
                    <Skeleton className="w-14 md:w-28 h-5 animate-pulse rounded-md" />
                    <div className="mx-0.5 text-xs text-foreground-300 font-black animate-pulse">•</div>
                    <Skeleton className="w-14 md:w-28 h-5 animate-pulse rounded-md" />
                </div>
            </div>
        </section>
    );
}

export default SingleSetHeaderLoading;