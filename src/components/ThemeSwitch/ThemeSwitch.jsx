import {MoonIcon, SunIcon} from "@heroicons/react/16/solid/index.js";
import {cn, Switch} from "@heroui/react";
import {useTheme} from "@heroui/use-theme";


const ThemeSwitch = () => {

    const {theme, setTheme}= useTheme();

    const changeTheme = () => {
        if (theme === "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }

    return (
        <Switch
            defaultSelected={theme==="light" ? false : true}
            startContent={<SunIcon />}
            endContent={<MoonIcon />}
            onValueChange={changeTheme}
            thumbIcon={() =>
                theme==="light" ?
                    <SunIcon style={{fill: "black", width: "18px"}}/>
                    :
                    <MoonIcon style={{fill: "black", width: "18px"}} />
            }
            size="lg"
            style={{backgroundColor: "none"}}
            classNames={{
                thumb: cn(
                    "bg-[white]",
                ),
                thumbIcon: "fill-black",
                base:"bg-none"
            }}
        />
    )
}

export default ThemeSwitch;