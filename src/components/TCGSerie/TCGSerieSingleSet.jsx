import {reverseDate} from "../../utility/utility.js";
import PropTypes from "prop-types";
import {NavLink, useLocation} from "react-router-dom";
import {Card, CardBody} from "@heroui/react";
import styles from "./TCGSerie.module.css";

const TCGSerieSingleSet = (props) => {

    const { id, name, images, releaseDate, totalCards } = props;
    let location = useLocation()

    return (
        <NavLink id={id}
                 to={`${location.pathname}/${id.valueOf()}`}
                 state={{
                     id: id,
                     name: name,
                     images: images,
                     releaseDate: releaseDate,
                     totalCards: totalCards
                 }}
                 className="flex flex-col gap-2">
            <Card className={styles.singleSetImageContainer} >
                <CardBody>
                    <img src={images.logo}
                           alt={name}
                           loading={"lazy"}
                           className="w-full h-full object-contain p-5" />
                </CardBody>
            </Card>
            <div className="flex flex-row justify-between gap-4">
                <h3 className="text-base font-semibold text-start">{name}</h3>
                <p className="text-sm font-medium text-foreground-500 leading-6">{reverseDate(releaseDate)}</p>
            </div>
        </NavLink>
    )
}

export default TCGSerieSingleSet;

TCGSerieSingleSet.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    images: PropTypes.object.isRequired,
    releaseDate: PropTypes.string.isRequired,
    totalCards: PropTypes.number.isRequired,
}