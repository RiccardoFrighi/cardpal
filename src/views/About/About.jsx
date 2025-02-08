import {Link} from "@heroui/react";

const About = () => {
    return (
        <div className="container mx-auto mt-6 mb-10">
            <h1 className=" lg:mx-28 leading-none tracking-tight text-gray-900 text-3xl font-semibold md:text-5xl md:mb-8 dark:text-white">
                About CardPal
            </h1>
            <section className={"m-12 text-left"}>
                <p className="mb-6 text-small font-normal text-gray-500 md:text-lg sm:px-16 xl:px-30 dark:text-gray-400">
                    <b>CardPal</b> is a Web Application developed in React for the visualization of Trading Card Games
                    (TCG), created as a university project for the course of Applicazioni Web: Progettazione e Sviluppo
                    2024/2025, Università degli studi di Milano-Bicocca.
                </p>
            </section>

            <section className={"m-12 text-left sm:px-16 xl:px-30"}>
                <h2 className="text-2xl font-semibold mt-6 mb-2">Features</h2>
                <p className="mb-6 text-small font-normal text-gray-500 md:text-lg dark:text-gray-400">
                    CardPal offers a series of features present in the various pages of the application:
                    <ul className="list-disc ml-6">
                        <li className={"my-1 text-small font-normal md:text-medium"}>
                            <b>TCG Navigation</b> – Seamlessly browse through various Trading Card Games.
                        </li>
                        <li className={"my-1 text-small font-normal md:text-medium"}>
                            <b>Set Exploration</b> – View and navigate through TCG sets, organized by release series
                            series.
                        </li>
                        <li className={"my-1 text-small font-normal md:text-medium"}>
                            <b>Card Collection</b> – Browse the cards within a set, available in both grid and list
                            views
                        </li>
                        <li className={"my-1 text-small font-normal md:text-medium"}>
                            <b>Advanced Search</b> – Find specific cards quickly using the search functionality.
                        </li>
                        <li className={"my-1 text-small font-normal md:text-medium"}>
                            <b>Card Details</b> – Access detailed information about each card, including pricing and
                            other key details.
                        </li>
                    </ul>
                </p>


            </section>

            <section className={"m-12 text-left sm:px-16 xl:px-30"}>
                <h2 className="text-2xl font-semibold mt-6 mb-2">Informations</h2>
                <p className="mb-1 text-small font-normal text-gray-500 md:text-medium dark:text-gray-400">
                    CardPal takes inspiration from sites and applications currently on the market, such as:
                    <ul className="list-disc ml-6">
                        <li>
                            <Link isExternal
                                  href={"https://rarecandy.com/"}
                                  className="mb-1 text-small font-normal md:text-medium">
                                RareCandy
                            </Link>
                        </li>
                        <li>
                            <Link isExternal
                                  href={"https://pkmn.gg/"}
                                  className="mb-1 text-small font-normal md:text-medium">
                                Pkmn.gg
                            </Link>
                        </li>
                        <li>
                            <Link isExternal
                                  href={"https://tcg.gg/"}
                                  className="mb-1 text-small font-normal md:text-medium">
                                Tcg.gg
                            </Link>
                        </li>
                        <li className="mb-1 text-small font-normal text-gray-500 md:text-medium">
                            <Link isExternal
                                  href={"https://www.cardmarket.com/it"}
                                  className="mb-1 text-small font-normal md:text-medium">
                                Cardmarket</Link>
                        </li>
                    </ul>
                    The application utilizes <Link isExternal href={"https://pokemontcg.io/"}>Pokémon TCG API</Link>, a
                    REST API that provides access to a vast database of Pokémon cards.
                    This API allows retrieving detailed information on sets, cards, rarities, types, and more.
                </p>
            </section>

            <section className={"m-12 text-left sm:px-16 xl:px-30"}>
                <p className="mb-1 text-small font-normal text-gray-500 md:text-medium  dark:text-gray-400">
                    CardPal in not produced, endorced, supported, or affiliated in any way with Nintendo, GameFreak
                    or The Pokemon Company.
                </p>
                <p className="mb-1 text-small font-normal text-gray-500 md:text-medium dark:text-gray-400">
                    Full documentation for the project is
                    available <Link isExternal
                                    className="mb-1 text-small font-normal md:text-medium"
                                    href={""}
                    >here</Link>.
                </p>
            </section>
        </div>
    );
};

export default About;