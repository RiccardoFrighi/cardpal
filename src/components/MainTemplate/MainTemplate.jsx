import React from "react";
// import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import PropTypes from "prop-types";

const MainTemplate = (props) => {

    const { navItems, children } = props;

    return (
        <>
            <Header navItems={navItems} />
            <div>

                {children}

            </div>
        </>
    )
}

export default MainTemplate;

MainTemplate.propTypes = {
    navItems: PropTypes.array.isRequired,
    children: PropTypes.node.isRequired,
}