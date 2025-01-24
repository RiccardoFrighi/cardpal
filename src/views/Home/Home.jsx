import {Button, Form, Input} from "@heroui/react";
import TCGBannerGrid from "../../components/TCGBannerGrid/TCGBannerGrid.jsx";
import {MagnifyingGlassIcon} from "@heroicons/react/16/solid/index.js";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const Home = () => {

    const [userInput, setUserInput] = useState("");
    let trimmedInput = ""
    const navigate = useNavigate();

    const submitSearchInput = () => {
        trimmedInput = userInput.trim();

        if(trimmedInput.length === 0) {
            setUserInput("");
            return;
        }
        navigate(`/search?q=${trimmedInput}`)
    }

    return (
        <div className="container mx-auto mt-6 mb-10">
            <div className="flex flex-col gap-5 m-12 items-center">
                <h1 className="mb-4 text-6xl font-extrabold leading-none tracking-tight text-gray-900 md:text-6xl lg:text-7xl dark:text-white">
                    The <span className="text-red-orange">Ultimate</span> TCG Platform
                </h1>
                <h2 className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                    Explore, track, and keep alive your passion for TCGs with tools designed for every trainer,
                    strategist, or collector.
                </h2>
                <div className={" max-w-3xl w-full h-14 flex flex-row pr-2 items-center rounded-full h-full bg-default-400/20 dark:bg-default-500/20"}
                >
                    <Input
                        classNames={{
                            base: "max-w-3xl h-14",
                            mainWrapper: "h-full bg-none",
                            input: "text-medium",
                            inputWrapper:
                                "rounded-full pl-6 h-full font-normal text-foreground bg-default-400/0 dark:bg-default-500/0 shadow-none border-none",
                        }}
                        isClearable
                        placeholder="Search a card by name..."
                        size="md"
                        type="search"
                        variant={"bordered"}
                        value={userInput}
                        onValueChange={setUserInput}
                        onKeyDown={(e) => {
                            if (e.key === "Enter")
                                submitSearchInput();
                        }}
                    />
                    <Button isIconOnly
                            aria-label="Like"
                            color="primary"
                            radius="full"
                            onClick={submitSearchInput}
                    >
                        <MagnifyingGlassIcon className="size-6" />
                    </Button>
                </div>
            </div>
            <div className="flex flex-col pt-14 mb-8 items-center">
                <TCGBannerGrid/>
            </div>
        </div>
    )
}

export default Home;