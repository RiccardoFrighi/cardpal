import {Link} from "@heroui/react";


const Page404 = () => {

    return (
        <div className="flex flex-col h-full w-full pt-8 justify-center items-center">
            <h1 className={"flex flex-row items-center justify-center font-bold my-8 text-9xl"}>
                404
            </h1>
            <h2 className={"text-2xl font-bold mb-1"}>Looks like this page doesn&#39;t exist!</h2>
            <p className={"mb-6"}>Go back to home and continue exploring.</p>
            <Link href={"/"} className={"underline text-small"}>Back to Home</Link>
        </div>
    );
}

export default Page404;