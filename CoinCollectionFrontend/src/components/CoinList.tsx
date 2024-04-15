import { Table } from "@mantine/core";
import { CoinGroupByCurrencyItemDto } from "../api";
import { useMemo } from "react";
import { NavLink } from "react-router-dom";

type Props = {
    coins: CoinGroupByCurrencyItemDto[]
}

function CoinList({
    coins
}: Props) {
    const coinItems = useMemo(() => coins.map(
        coin => (
        <Table.Tr key={coin.id}>
            <Table.Td>{coin.value}</Table.Td>
            <Table.Td>{coin.year}</Table.Td>
            <Table.Td>
                <NavLink to={"details/" + coin.id}>
                    Details
                </NavLink>
            </Table.Td>
        </Table.Tr>
        )
    ), [coins])

    return (
        <Table stickyHeader>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Value</Table.Th>
                    <Table.Th>Year of Minting</Table.Th>
                    <Table.Th></Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {coinItems}
            </Table.Tbody>
        </Table>
    )
}

export default CoinList
