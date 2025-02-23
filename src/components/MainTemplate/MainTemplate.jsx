import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import PropTypes from "prop-types";

const MainTemplate = (props) => {

    const { navItems, children } = props;

    return (
        <div className="flex flex-col min-h-screen">
            <Header navItems={navItems} />
            <div className="flex flex-grow justify-center w-full max-w-screen-xl self-center px-8" >

                {children}

            </div>
            <Footer />
        </div>
    )
}

export default MainTemplate;

MainTemplate.propTypes = {
    navItems: PropTypes.array.isRequired,
    children: PropTypes.node.isRequired,
}