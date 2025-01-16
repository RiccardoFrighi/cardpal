import {Card, CardHeader, Image} from "@heroui/react";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import style from "./TCGBannerCard.module.css";

const TCGBannerCard = (props) => {

    const { text, image, url, active, } = props;

    return (
        <NavLink to={active ? url : "#"} className="w-fit block" >
            <Card className="w-fit border-none">
                <CardHeader className="absolute z-20 top-1 flex-col !items-end">
                    {!active ?
                        <div className={style.comingSoonBox}>
                            <p className="text-tiny  text-black/100 font-regular">Coming soon</p>
                        </div>
                    :
                        ""
                    }
                </CardHeader>
                <Image alt={text}
                       src={image}
                       className="object-cover w-full"
                       loading={"lazy"}
                />
            </Card>
        </NavLink>
    )
}

export default TCGBannerCard;

TCGBannerCard.propTypes = {
    item: PropTypes.shape({})
}