import { useQuery } from "react-query";
import { CoinDto, CoinsService, CurrenciesService, CurrencyDto, OpenAPI } from "../api"
import { useState } from "react";
import { Button, FileInput, Grid, Group, Image } from "@mantine/core";
import toast from "react-hot-toast";
import { useAuth } from "./AuthProvider";

type Props = {
    coinId: number
}

function CoinDetails({
    coinId
}: Props) {
    const auth = useAuth();

    const [coin, setCoin] = useState<CoinDto>()
    const [currencies, setCurrencies] = useState<CurrencyDto[]>()
    const [front, setFront] = useState<File | null>()
    const [back, setBack] = useState<File | null>()

    const postFront = () => {
        let reader = new FileReader()
        reader.readAsDataURL(front!!)
        reader.onload = () => {
            let file = reader.result as string
            let base64 = file.split(',')[1]
            CoinsService.postCoinsByIdFront(coinId, base64).then(() => {
                setFront(null)
                window.location.reload()
                toast('Successfully uploaded image')
            })
        }
    }

    const postBack = () => {
        let reader = new FileReader()
        reader.readAsDataURL(back!!)
        reader.onload = () => {
            let file = reader.result as string
            let base64 = file.split(',')[1]
            CoinsService.postCoinsByIdBack(coinId, base64).then(() => {
                setBack(null)
                window.location.reload()
                toast('Successfully uploaded image')
            })
        }
    }

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
                            src={OpenAPI.BASE + "/Coins/by-id/" + coinId + "/front"}
                            fallbackSrc="https://placehold.co/600x400?text=No Front Side Set" />
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Image 
                            radius="md"
                            src={OpenAPI.BASE + "/Coins/by-id/" + coinId + "/back"}
                            fallbackSrc="https://placehold.co/600x400?text=No Back Side Set" />
                    </Grid.Col>
                    <Grid.Col span={1} />

                    { auth.isLoggedIn &&
                    <>
                    <Grid.Col span={1}>
                        <FileInput
                            label="Upload Front Side Image"
                            placeholder="Select ..."
                            value={front}
                            onChange={setFront}
                            clearable
                            accept="image/png" />
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <FileInput
                            label="Upload Back Side Image"
                            placeholder="Select ..."
                            value={back}
                            onChange={setBack}
                            clearable
                            accept="image/png" />
                    </Grid.Col>
                    <Grid.Col span={1} />

                    {
                        front ?
                        <Grid.Col span={1}>
                            <Button onClick={postFront}>Submit</Button>
                        </Grid.Col> :
                        <Grid.Col span={1} />
                    }
                    {
                        back &&
                        <Grid.Col span={1}>
                            <Button onClick={postBack}>Submit</Button>
                        </Grid.Col>
                    }
                    </>
                    }
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
