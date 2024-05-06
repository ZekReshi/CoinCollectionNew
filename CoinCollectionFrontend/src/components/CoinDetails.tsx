import { useQuery } from "react-query";
import { CoinDto, CoinsService, CurrenciesService, CurrencyDto, OpenAPI } from "../api"
import { useState } from "react";
import { Button, Grid, Group, Image } from "@mantine/core";

type Props = {
    coinId: number
}

function CoinDetails({
    coinId
}: Props) {
    const [coin, setCoin] = useState<CoinDto>()
    const [currencies, setCurrencies] = useState<CurrencyDto[]>()

    useQuery(["getCoinById", coinId], () => CoinsService.getCoinsById(coinId).then(data => setCoin(data)))
    useQuery(["getCurrencies", coinId], () => CurrenciesService.getCurrenciesAll().then(data => setCurrencies(data)))

    const mock = () => {
        setCoin({
            id: coinId,
            value: 500,
            year: 1970,
            currencyId: 1
        })
        setCurrencies([
            {
                id: 1,
                name: "Schilling"
            },
            {
                id: 2,
                name: "Groschen"
            }
        ])
    }

    return coin ? (
                <Grid columns={3}>
                    <Grid.Col span={1}>
                        Currency:
                    </Grid.Col>
                    <Grid.Col span={2}>
                        {currencies?.find(c => c.id == coin.currencyId)?.name}
                    </Grid.Col>
                    
                    <Grid.Col span={1}>
                        Value:
                    </Grid.Col>
                    <Grid.Col span={2}>
                        {coin?.value}
                    </Grid.Col>
                    
                    <Grid.Col span={1}>
                        Year of Minting:
                    </Grid.Col>
                    <Grid.Col span={2}>
                        {coin?.year}
                    </Grid.Col>

                    <Grid.Col span={1}>
                        <Image 
                            radius="md"
                            src={OpenAPI.BASE + "/Coins/by-id/" + coinId + "/front"} />
                        <br />
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Image 
                            radius="md"
                            src={OpenAPI.BASE + "/Coins/by-id/" + coinId + "/back"} />
                    </Grid.Col>
                </Grid>
    ) : (
        <Group>
            No coin with ID {coinId} found
            <Button onClick={mock}>
                Use mock data
            </Button>
        </Group>
    )
}

export default CoinDetails
