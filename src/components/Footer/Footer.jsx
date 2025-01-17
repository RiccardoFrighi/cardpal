import {GitHubLogo, Logo} from "../Logos/Logos.jsx";
import {Link, Button, Image} from "@heroui/react";
import { NavLink } from "react-router-dom";


const Footer = () => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-40 m-6 px-10 py-6 items-center justify-between border-1 rounded-3xl bg-onyx">
            <div className="flex items-center md:items-start flex-col">
                <NavLink exact={true}
                         to={"/"}
                         anchorIcon={"src/assets/github-white.svg"}
                         className="nav-link mb-2">
                    <Logo />
                </NavLink>
                <p className="greyText text-center md:text-start md:pl-2 mb-4" >
                    Powered by React, driven by your passion for trading card games. Built to inspire, organize, and enhance every step of your TCG journey.
                </p>
                <Button
                    as={Link}
                    isExternal
                    color="primary"
                    size="md"
                    href="https://github.com/RiccardoFrighi/CardPal.git"
                    variant="solid"
                    className="md:pl-2 bg-red-orange"
                    startContent={<GitHubLogo />}

                >
                    GitHub Page
                </Button>
            </div>

            <div className="flex items-center md:items-end flex-col mt-2 md:pr-2">
                <p className={`text-center md:text-end greyText`}>Project created for the course of <span className="font-medium">
                        <Link className="greyText" underline={"always"} isExternal href={"https://elearning.unimib.it/course/info.php?id=57873#en"}>
                            Applicazioni Web: Progettazione e Sviluppo
                        </Link>
                    </span> 2024/2025,
                    University of Milano-Bicocca (Milan, Italy)
                </p>
                <div className="flex flex-row gap-2">
                    <Link to={"/"}>
                        <Image
                            src="src/assets/images/disco.png"
                            alt= "Disco"
                            className="w-12 h-12 rounded-none"
                        />
                    </Link>
                    <Link to={"/"}>
                        <Image
                            src="src/assets/images/unimib.png"
                            alt= "Unimib"
                            className="w-12 h-12 rounded-none"
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Footer;