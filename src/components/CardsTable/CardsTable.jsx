import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell, Link,
} from "@heroui/react";
import PropTypes from "prop-types";
import {formatUSDollar, getLastMarketPrice, zeroPad} from "../../utility/utility.js";


const CardsTable = (props) => {

    const { cards } = props;

    const columns = [
        {
            key: "image",
            label: "",
        },
        {
            key: "name",
            label: "NAME",
        },
        {
            key: "price",
            label: "PRICE",
        },
        {
            key: "number",
            label: "NUMBER",
        },
        {
            key: "rarity",
            label: "RARITY",
        },
    ];


    return (
        <Table aria-label="Cards table">
            <TableHeader className={"w-full"}>
                {columns.map((column) =>
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
            </TableHeader>
            <TableBody>
                {cards.map((card) =>
                        <TableRow key={card.id}
                                  className={"w-full"}>
                            <TableCell className={"w-20"}>
                                <Link href={`/tcg/pokemon/${card.set.id}/${card.id}`}>
                                    <img src={card.images.small} alt={`${card.name} image`}  className={""}/>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link href={`/tcg/pokemon/${card.set.id}/${card.id}`}
                                    className={"text-base font-semibold text-start truncate text-foreground"}
                                >
                                    {card.name}
                            </Link>
                            </TableCell>
                            <TableCell className="text-base font-semibold text-red-orange">
                                {getLastMarketPrice(card) ?
                                    formatUSDollar.format(getLastMarketPrice(card))
                                    : "N/A"}

                            </TableCell>
                            <TableCell className={"font-medium text-foreground-500"}>
                                #{zeroPad(card.number, (card.set.total+'').length)}
                            </TableCell>
                            <TableCell className={"font-medium text-foreground-500"}>
                                {card.rarity}
                            </TableCell>
                        </TableRow>
                )}
            </TableBody>
        </Table>
    )

}

export default CardsTable;

CardsTable.propTypes = {
    cards: PropTypes.array.isRequired,
}