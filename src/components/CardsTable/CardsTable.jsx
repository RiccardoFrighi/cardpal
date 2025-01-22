import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@heroui/react";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {zeroPad} from "../../utility/utility.js";


const CardsTable = (props) => {

    const { cards } = props;

    const columns = [
        {
            key: "images.small",
            label: "",
        },
        {
            key: "name",
            label: "NAME",
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

    const navigate = useNavigate();

    return (
        <Table aria-label="Cards table" className="w-full">
            <TableHeader>
                {columns.map((column) =>
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
            </TableHeader>
            <TableBody>
                {cards.map((card) =>
                    <TableRow key={card.id}
                              className={"cursor-pointer"}
                              onClick={() => navigate(`tcg/pokemon/${card.set.id}/${card.id}`)}>
                        <TableCell className={"w-20"}>
                            <img src={card.images.small} className={""}/>
                        </TableCell>
                        <TableCell>{card.name}</TableCell>
                        <TableCell>#{zeroPad(card.number, 3)}</TableCell>
                        <TableCell>{card.rarity}</TableCell>
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