import {NavLink} from "react-router-dom";
import {reverseDate} from "../../utility/utility.js";
import PropTypes from "prop-types";


const SingleSetHeader = (props) => {

    const { tcgName, setName, images, totalCards, releaseDate } = props;

    return (
        <section className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative h-[64px] w-full sm:w-40">
                <img src={images.logo}
                     alt={`${setName} Logo`}
                     className="object-contain w-full h-full"
                     loading={"lazy"}
                />
            </div>
            <div className="flex flex-col items-center sm:items-start gap-x-1 py-1.5">
                <h1 className="text-xl font-semibold text-foreground text-start">{setName}</h1>
                <div className="flex flex-row items-center gap-x-1">
                    <NavLink to={"/tcg/pokemon"}>
                        <span className="text-base font-semibold text-foreground text-start">{tcgName}</span>
                    </NavLink>
                    <span className="hidden text-xs md:block mx-0.5 font-black text-foreground-500">•</span>
                    <span
                        className="hidden md:block text-base font-semibold text-foreground text-start">{setName}</span>
                    <span className="mx-0.5 text-xs font-black text-foreground-500">•</span>
                    <span className="text-base font-semibold text-foreground text-start h-6">{totalCards} <span
                        className="text-xs text-foreground-500 leading-6">cards</span>
                    </span>
                    <span className="mx-0.5 text-xs font-black text-foreground-500">•</span>
                    <span
                        className="text-base font-semibold text-foreground text-start h-6">{reverseDate(releaseDate)} <span
                            className="text-xs font-medium text-foreground-500 leading-6">release date</span>
                    </span>
                </div>
            </div>
        </section>
    )
}

export default SingleSetHeader;

SingleSetHeader.propTypes = {
    tcgName: PropTypes.string.isRequired,
    setName: PropTypes.string.isRequired,
    images: PropTypes.object.isRequired,
    totalCards: PropTypes.number.isRequired,
    releaseDate: PropTypes.string.isRequired,
}