import {Button, Chip, Input} from "@heroui/react";
import TCGBannerGrid from "../../components/TCGBannerGrid/TCGBannerGrid.jsx";
import {MagnifyingGlassIcon, SparklesIcon} from "@heroicons/react/16/solid/index.js";
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
                <Chip color="primary"
                      variant="flat"
                      startContent={<SparklesIcon className={"fill-primary"} style={{width:'16px', marginLeft:"4px"}} />}
                      classNames={{
                          base: "border-small border-primary shadow-primary-500/30",
                          content: "text-primary",
                      }}
                >
                    Your TCG Journey starts here!
                </Chip>
                <h1 className=" lg:mx-28 leading-none tracking-tight text-gray-900 text-3xl font-semibold md:text-6xl md:mb-4 lg:text-6xl dark:text-white">
                    Begin your adventure in the world of trading card games
                </h1>
                <h2 className="mb-6 text-small font-normal text-gray-500 md:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                    Explore, track, and keep alive your passion for TCGs with tools designed for every trainer,
                    strategist, or collector.
                </h2>
                <div className={"max-w-3xl w-full flex flex-row pr-2 items-center rounded-full bg-default-400/20 dark:bg-default-500/20"}
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
                            onPress={submitSearchInput}
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