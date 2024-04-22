import { useMemo, useState } from "react";
import { CoinGroupByCurrencyDto, CoinsService } from "../api";
import { useQuery } from "react-query";
import { Accordion, Button, Card, Group } from "@mantine/core";
import CoinList from "./CoinList";

function CoinAccordion() {
    const [coinGroups, setCoinGroups] = useState<CoinGroupByCurrencyDto[]>([])

    useQuery("getCoinsByCurrencies", () => CoinsService.getCoinsByCurrencies().then(data => setCoinGroups(data)))

    const coinGroupAccordionItems = useMemo(() => coinGroups.map(
        group => (
            <>
                <Accordion.Item key={group.currency?.id} value={group.currency?.name ?? ""}>
                    <Accordion.Control>
                        {group.currency?.name}
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Card>
                            <CoinList coins={group.items ?? []} />
                        </Card>
                    </Accordion.Panel>
                </Accordion.Item>
            </>
        )
    ), [coinGroups])

    const mock = () => {
        setCoinGroups([
            {
                currency: {
                    id: 1,
                    name: "Schilling"
                },
                items: [
                    {
                        id: 1,
                        value: 1,
                        year: 1987
                    },
                    {
                        id: 2,
                        value: 100,
                        year: 1990
                    },
                    {
                        id: 3,
                        value: 500,
                        year: 1970
                    }
                ]
            },
            {
                currency: {
                    id: 2,
                    name: "Groschen"
                },
                items: [
                    {
                        id: 4,
                        value: 5,
                        year: 1977
                    },
                    {
                        id: 5,
                        value: 10,
                        year: 1980
                    },
                    {
                        id: 6,
                        value: 50,
                        year: 1990
                    }
                ]
            }
        ])
    }

    return coinGroups.length > 0 ? (
        <Accordion variant="contained">
            {coinGroupAccordionItems}
        </Accordion>
    ) : (
        <Group>
            Coins could not be loaded
            <Button onClick={mock}>
                Use mock data
            </Button>
        </Group>
    );
}

export default CoinAccordion
