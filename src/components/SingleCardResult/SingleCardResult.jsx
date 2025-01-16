import {NavLink} from "react-router-dom";
import {Card, Image} from "@heroui/react";
import {pokemonDefaultImage, zeroPad} from "../../utility/utility";
import PropTypes from "prop-types";
import style from "./SingleCardResult.module.css";

const SingleCardResult = (props) => {
    const {id, name, number, image, rarity, price} = props;

    return (
        <NavLink to={`/tcg/pokemon/${id}`}>
            <Card className="w-fit border-none rounded-lg">
                <Image alt={name}
                       //isBlurred
                       className="object-cover w-full"
                       src={image}
                       loading={"lazy"}
                       fallbackSrc="src/assets/images/pokemonBack.png"
                       onError={(event) => pokemonDefaultImage(event)}
                />
            </Card>
            <div className={style.cardContainer}>
                <div className="flex flex-row justify-between" >
                    <p className="text-base font-semibold">{name}</p>
                    <p className="text-base font-semibold text-red-500" >${price}</p>
                </div>
                <div className="flex flex-row justify-between">
                    <p className="text-xs font-medium text-foreground-500">#{zeroPad(number, 3)}</p>
                    <p className="text-xs font-medium text-foreground-500">{rarity}</p>
                </div>
            </div>
        </NavLink>
    )
}

export default SingleCardResult;

SingleCardResult.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    rarity: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
}