import { useQuery } from "react-query";
import { CoinDto, CoinsService } from "../api"
import { useState } from "react";
import { Button, Grid, Group } from "@mantine/core";

type Props = {
    coinId: number
}

function CoinDetails({
    coinId
}: Props) {
    const [coin, setCoin] = useState<CoinDto>()

    useQuery(["getCoinById", coinId], () => CoinsService.getCoinsById(coinId).then(data => setCoin(data)))

    const mock = () => {
        setCoin({
            id: coinId,
            value: 500,
            year: 1970,
            currency: "Schilling"
        })
    }

    return coin ? (
        <Grid columns={2}>
            <Grid.Col span={1}>
                <Grid columns={2}>
                    <Grid.Col span={1}>
                        Currency:
                    </Grid.Col>
                    <Grid.Col span={1}>
                        {coin?.currency}
                    </Grid.Col>
                    
                    <Grid.Col span={1}>
                        Value:
                    </Grid.Col>
                    <Grid.Col span={1}>
                        {coin?.value}
                    </Grid.Col>
                    
                    <Grid.Col span={1}>
                        Year of Minting:
                    </Grid.Col>
                    <Grid.Col span={1}>
                        {coin?.year}
                    </Grid.Col>
                </Grid>
            </Grid.Col>
            <Grid.Col span={1}>
                #Image of the front side#
                <br />
                #Image of the back side#
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
