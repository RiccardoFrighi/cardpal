import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/react";
import {formatCamelCase, formatUSDollar, reverseDate} from "../../utility/utility.js";
import PropTypes from "prop-types";

const CardDetailsPrices = (props) => {

    const tcgplayer = props.tcgplayer;

    const columns = [
        {
            key: "variant",
            label: "VARIANT",
        },
        {
            key: "price",
            label: "MARKET PRICE",
        },

    ];

    return (
        <div className={"w-full flex flex-col gap-4"}>
            <Table aria-label="Prices table">
                <TableHeader className={"w-full"}>
                    {columns.map((column) =>
                        <TableColumn key={column.key}>{column.label}</TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={"No prices were found."}>
                    {(tcgplayer && tcgplayer.prices) ?
                        (Object.entries(tcgplayer.prices).map((price) => (
                            <TableRow key={price.id}>
                                <TableCell className="text-base font-semibold text-start">
                                    {formatCamelCase(price[0])}
                                </TableCell>
                                <TableCell className="text-base font-semibold text-red-orange">
                                    {formatUSDollar.format(price[1].market)}
                                </TableCell>
                            </TableRow>
                        )))
                        : []
                    }
                </TableBody>
            </Table>
            {(tcgplayer && tcgplayer.prices) ?
                <div className="flex flex-row justify-end items-end w-full gap-2">
                    <span className="text-sm font-semibold text-foreground text-start h-6">
                        <span className="text-tiny text-foreground-500 leading-6">Updated at
                        </span> {reverseDate(tcgplayer.updatedAt)}
                    </span>
                </div>
                :
                ""
            }
        </div>
    )
}

export default CardDetailsPrices;

CardDetailsPrices.propTypes = {
    tcgplayer: PropTypes.object.isRequired
}