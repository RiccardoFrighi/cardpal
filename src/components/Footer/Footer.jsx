import { Logo } from "../Logo/Logos.jsx";
import {Link} from "@heroui/react";

const Footer = () => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-6 px-10 items-center justify-between">
            <div className="flex items-center md:items-start flex-col">
                <Logo />
                <p>Lorem ipsum</p>
                <Link>GitHub Page</Link>
            </div>
            <div className="flex items-center md:items-end flex-col mt-2">
                <p className=" text-center md:text-end">Project created for the course of
                    <span className="font-medium">
                        <Link color={"foreground"} underline={"always"} isExternal href={"https://elearning.unimib.it/course/info.php?id=57873#en"}>
                            Applicazioni Web: Progettazione e Sviluppo
                        </Link>
                    </span> 2024/2025,
                    University of Milano-Bicocca (Milan, Italy)</p>
            </div>


        </div>
    )
}

export default Footer;