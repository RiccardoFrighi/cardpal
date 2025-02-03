import {Card, CardHeader, Image, Link} from "@heroui/react";
import PropTypes from "prop-types";
import style from "./TCGBannerGridCard.module.css";

const TCGBannerGridCard = (props) => {

    const {text, image, url, active,} = props;

    return (
        <Link href={active ? url : "#"}
              isDisabled={!active}
              style={{opacity: 100}}
              className={`w-fit block ${!active ? 'cursor-default' : ''}`}>
            <Card className="w-fit border-none">
                <CardHeader className="absolute z-20 top-1 flex-col !items-end">
                    {!active ?
                        <div className={style.comingSoonBox}>
                            <p className="text-tiny text-black/100 font-regular">Coming soon</p>
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
        </Link>
    )
}

export default TCGBannerGridCard;

TCGBannerGridCard.propTypes = {
    text: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired
}