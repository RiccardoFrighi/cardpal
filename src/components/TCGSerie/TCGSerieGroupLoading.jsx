import {Card, Image} from "@heroui/react";
import {Skeleton} from "@heroui/react";

const TCGSerieGroupLoading = () => {

    return (
        <div className="flex flex-col items-start gap-4">
            <Skeleton className="animate-pulse h-8 w-1/2 rounded-lg"></Skeleton>
            <section
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:px-0 w-full">
                {[...Array(12)].map((x, i) =>
                    <div key={i} className="flex flex-col gap-2">
                        <Card className="animate-pulse">
                            <Image
                                src={""}
                                alt={"Loading..."}
                                height={160}
                            />
                        </Card>
                        <div className="flex flex-row justify-between items-center gap-4">
                            <Skeleton className="h-6 w-full animate-pulse rounded-lg"></Skeleton>
                            <Skeleton className="h-5 w-20 animate-pulse rounded-lg"></Skeleton>
                        </div>
                    </div>
                )}
            </section>
        </div>
    )
}

export default TCGSerieGroupLoading;