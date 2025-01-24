import { useState } from 'react';
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    NavbarMenu,
    Button
} from "@heroui/react";
import {LogoTextless} from "../Logos/Logos.jsx";
import TCGListData from "../../assets/data/tcgs"
import {Bars3Icon, XMarkIcon} from "@heroicons/react/16/solid/index.js";
import {ChevronDownIcon} from "@heroicons/react/16/solid/index.js";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch.jsx";


const Header = (props) => {

    // eslint-disable-next-line react/prop-types
    const { navItems } = props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Creates the url to be disabled in the dropdown menu
    const inactiveUrls = TCGListData.filter(item => !item.active).map(item => item.url);

    // Creates the items for the toggle menu when screen is small
    const itemList = navItems.map((item) => {
        return (
            <NavbarItem key={item.url} >
                <NavLink to={item.active ? item.url : "#"}
                         className={`nav-link ${!item.active ? 'cursor-default' : ''}`}>
                    <div>
                        <span className={`${!item.active ? 'w-full text-foreground-500' : ''}`}>{item.text} </span>
                            {!item.active ?
                                <span className="w-full text-tiny text-foreground-500 group-hover:text-current truncate" >
                                    Coming soon
                                </span>
                            :
                                ""
                         }
                    </div>
                </NavLink>
            </NavbarItem>
        )
    });

    // Creates the items for the drowpdown menu when screen is large
    const dropdownItems = TCGListData.map((item) => {
        return (
            <DropdownItem key={item.url}
                          description={item.active ? "" : "Coming soon"}>
                <NavLink to={item.active ? item.url : "#"}
                         className={`nav-link ${!item.active ? 'cursor-default' : ''}`}>
                    {item.text}
                </NavLink>
            </DropdownItem>
        )
    })

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent justify="start flex-grow-0">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                    icon={isMenuOpen ? <XMarkIcon /> : <Bars3Icon />}
                />
                <NavbarBrand className="mr-6">
                    <NavLink exact={true}
                             to={"/"}
                             className="nav-link">
                        <LogoTextless />
                    </NavLink>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-8" justify="center">
                    <NavbarItem key={"/"}>
                        <NavLink exact={true}
                                 to={"/"}
                                 className="nav-link">
                            Home
                        </NavLink>
                    </NavbarItem>
                    <Dropdown>
                        <NavbarItem>
                            <DropdownTrigger>
                                <Button
                                    disableRipple
                                    className="text-base text-inherit p-0 bg-transparent data-[hover=true]:bg-transparent"
                                    radius="sm"
                                    variant="light"
                                    endContent={<ChevronDownIcon className="size-6" size={16} />}
                                >
                                    TCGs
                                </Button>
                            </DropdownTrigger>
                        </NavbarItem>
                        <DropdownMenu
                            aria-label="TCGs"
                            className="w-[340px] gap-4"
                            disabledKeys={inactiveUrls}
                        >
                            { dropdownItems }
                        </DropdownMenu>
                    </Dropdown>
                    <NavbarItem key={"/docs"}>
                        <NavLink exact={true}
                                 to={"/docs"}
                                 className="nav-link">
                            Docs
                        </NavLink>
                    </NavbarItem>
                    <NavbarItem key={"/info"}>
                        <NavLink exact={true}
                                 to={"/info"}
                                 className="nav-link">
                            Infos
                        </NavLink>
                    </NavbarItem>
                </NavbarContent>
            </NavbarContent>

            <ThemeSwitch />

            <NavbarMenu>
                {itemList}
            </NavbarMenu>



        </Navbar>
    );
}

export default Header;

Navbar.propTypes = {
    navItems: PropTypes.array.isRequired,
}