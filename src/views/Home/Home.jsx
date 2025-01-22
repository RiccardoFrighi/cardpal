import {Input} from "@heroui/react";
import TCGBannerGrid from "../../components/TCGBannerGrid/TCGBannerGrid.jsx";
import {MagnifyingGlassIcon} from "@heroicons/react/16/solid/index.js";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const Home = () => {

    const [userInput, setUserInput] = useState("");
    const navigate = useNavigate();

    const submitSearchInput = () => {
        navigate(`/search?q=${userInput}`)
        setUserInput("")
    }

    return (
        <div className="container mx-auto my-20">
            <div className="flex flex-col gap-5 m-12 items-center">
                <h1 className="mb-4 text-5xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    The <span className="text-red-orange">Ultimate</span> TCG Platform
                </h1>
                <h2 className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                    Explore, track, and keep alive your passion for TCGs with tools designed for every trainer,
                    strategist, or collector.
                </h2>
                <Input
                    classNames={{
                        base: "max-w-3xl h-14",
                        mainWrapper: "h-full",
                        input: "text-medium",
                        inputWrapper:
                            "rounded-full pl-6 h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                    }}
                    isClearable
                    placeholder="Search a card by name..."
                    size="md"
                    startContent={<MagnifyingGlassIcon className="size-6"/>}
                    type="search"
                    value={userInput}
                    onValueChange={setUserInput}
                    onKeyDown={(e) => {
                        if (e.key === "Enter")
                            submitSearchInput();
                    }}
                />
            </div>
            <div className="flex flex-col pt-14 mb-8 items-center">
                <TCGBannerGrid/>
            </div>
        </div>
    )
}

export default Home;