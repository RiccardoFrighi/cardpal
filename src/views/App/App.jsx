import './App.css'
import {useNavigate, useHref, Routes, Route} from "react-router-dom";
import { HeroUIProvider} from "@heroui/react";
import MainTemplate from "../../components/MainTemplate/MainTemplate.jsx";
import Home from "../Home/Home.jsx";
import TCGPage from "../TCGPage/TCGPage.jsx";

/*
declare module "@react-types/shared" {
    interface RouterConfig {
        routerOptions: NavigateOptions;
    }
}
*/

function App() {

    const navigate = useNavigate();

    const nav = [
        {url: "/", text: "Home", active: true, exact: true},
        {url: "/tcg/pokemon", text: "Pokemon", active: true, exact: false},
        {url: "/tcg/lorcana", text: "Lorcana", active: false, exact: false},
        {url: "/tcg/one-piece", text: "One Piece", active: false, exact: false},
        {url: "/tcg/magic", text: "Magic", active: false, exact: false},
        {url: "/tcg/yugioh", text: "Yu-gi-oh!", active: false, exact: false},
        {url: "/tcg/starwars", text: "Star Wars Unlimited", active: false, exact: false},
        {url: "/docs", text: "Docs", active: true, exact: true},
        {url: "/info", text: "Info", active: true, exact: true}
    ];

    return (
        <HeroUIProvider navigate={navigate} useHref={useHref}>
            <MainTemplate
                navItems={nav}
            >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tcg/pokemon" element={<TCGPage name={"Pokémon"} logo={"../src/assets/images/pokemon-logo.png"}/>} />
                </Routes>
            </MainTemplate>
        </HeroUIProvider>
    )
}

export default App

/*
<SingleSetCard id={"xy1-1"}
name={"Venusaur-EX"}
number={"1"}
image={"https://images.pokemontcg.io/xy1/1_hires.png"}
rarity={"Rare Holo EX"}
price={"3.32"}
/>
*/