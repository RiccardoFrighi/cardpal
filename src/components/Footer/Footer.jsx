import {GitHubLogo, Logo} from "../Logos/Logos.jsx";
import {Link, Button, Image} from "@heroui/react";
import { NavLink } from "react-router-dom";
import disco from "../../assets/images/disco.png";
import unimib from "../../assets/images/unimib.png";


const Footer = () => {

    return (
        <footer className="flex flex-col md:flex-row self-center gap-6 md:gap-48 xl:gap-96 mx-6 mt-16 mb-4 px-10 py-6 items-start justify-between rounded-3xl bg-onyx"
                style={{maxWidth: "1280px"}}
        >
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
                    className="md:pl-2 "
                    startContent={<GitHubLogo />}
                >
                    GitHub Page
                </Button>
            </div>
            <div className="flex items-center md:items-end flex-col mt-2 md:pr-2">
                <p className={`text-center md:text-end greyText mb-4` }>Project created for the course of <span className="font-medium">
                        <Link className="greyText" underline={"always"} isExternal href={"https://elearning.unimib.it/course/info.php?id=57873#en"}>
                            Applicazioni Web: Progettazione e Sviluppo
                        </Link>
                    </span> 2024/2025,
                    University of Milano-Bicocca (Milan, Italy)
                </p>
                <div className="flex flex-row gap-4">
                    <Link href={"https://www.disco.unimib.it/en"} isExternal>
                        <Image
                            src={disco}
                            alt= "Disco"
                            className="w-12 h-12 rounded-none cursor-pointer"
                        />
                    </Link>
                    <Link href={"https://en.unimib.it/"} isExternal>
                        <Image
                            src={unimib}
                            alt= "Unimib"
                            className="w-12 h-12 rounded-none cursor-pointer"
                        />
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer;