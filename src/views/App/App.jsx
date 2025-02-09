import './App.css'
import {useNavigate, useHref, Routes, Route} from "react-router-dom";
import { HeroUIProvider} from "@heroui/react";
import MainTemplate from "../../components/MainTemplate/MainTemplate.jsx";
import Home from "../Home/Home.jsx";
import TCGPage from "../TCGPage/TCGPage.jsx";
import SingleSetPage from "../SingleSetPage/SingleSetPage.jsx";
import {pokemonLogo} from "../../utility/utility.js";
import SearchResultsPage from "../SearchResultsPage/SearchResultsPage.jsx";
import {useTheme} from "@heroui/use-theme";
import CardDetails from "../CardDetails/CardDetails.jsx";
import Page404 from "../Page404/Page404.jsx";
import About from "../About/About.jsx";

/*
declare module "@react-types/shared" {
    interface RouterConfig {
        routerOptions: NavigateOptions;
    }
}
*/

function App() {

    const navigate = useNavigate();
    const {theme} = useTheme();

    const nav = [
        {url: "/", text: "Home", active: true},
        {url: "/tcg/pokemon", text: "Pokemon", active: true},
        {url: "/tcg/lorcana", text: "Lorcana", active: false},
        {url: "/tcg/one-piece", text: "One Piece", active: false},
        {url: "/tcg/magic", text: "Magic", active: false},
        {url: "/tcg/yugioh", text: "Yu-gi-oh!", active: false},
        {url: "/tcg/starwars", text: "Star Wars Unlimited", active: false},
        {url: "/about", text: "About", active: true},
    ];

    return (
        <HeroUIProvider navigate={navigate} useHref={useHref} attribute="class"
                        themes={['light', 'dark']}>
            <main className={`${theme} text-foreground bg-background`}>
                <MainTemplate
                    navItems={nav}
                >
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/tcg/pokemon" element={<TCGPage name={"Pokémon"} logo={pokemonLogo}/>}/>
                        <Route path="/tcg/pokemon/:id" element={<SingleSetPage/>}/>
                        <Route path="/search" element={<SearchResultsPage/>}/>
                        <Route path="tcg/pokemon/:setId/:cardId" element={<CardDetails/>} />
                        <Route path="/about" element={<About/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </MainTemplate>
            </main>
        </HeroUIProvider>
)
}

export default App