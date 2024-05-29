import { useQuery } from "react-query";
import { CoinDto, CoinsService, CurrenciesService, CurrencyDto, OpenAPI } from "../api"
import { useEffect, useState } from "react";
import { Button, FileInput, Grid, Group, Image, Modal, NumberInput, Select } from "@mantine/core";
import toast from "react-hot-toast";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

type Props = {
    coinId: number
}

function CoinDetails({
    coinId
}: Props) {
    const auth = useAuth();

    const frontSrcBase = OpenAPI.BASE + "/Coins/by-id/" + coinId + "/front";
    const backSrcBase = OpenAPI.BASE + "/Coins/by-id/" + coinId + "/back";

    const [coin, setCoin] = useState<CoinDto>()
    const [currencies, setCurrencies] = useState<CurrencyDto[]>()
    const [frontSrc, setFrontSrc] = useState(frontSrcBase)
    const [backSrc, setBackSrc] = useState(backSrcBase)
    const [front, setFront] = useState<File | null>()
    const [back, setBack] = useState<File | null>()
    const [deleteOpened, setDeleteOpened] = useState(false)
    
    const [currency, setCurrency] = useState("");
    const [value, setValue] = useState(0);
    const [year, setYear] = useState(0);

    useEffect(() => {
        setCurrency(currencies?.find(c => c.id == coin?.currencyId)?.name ?? "")
        setValue(coin?.value ?? 0)
        setYear(coin?.year ?? 0)
    }, [coin])

    useEffect(() => {
        setCurrency(currencies?.find(c => c.id == coin?.currencyId)?.name ?? "")
    }, [currencies])

    const postFront = () => {
        let reader = new FileReader()
        reader.readAsDataURL(front!!)
        reader.onload = () => {
            let file = reader.result as string
            let base64 = file.split(',')[1]
            CoinsService.postCoinsByIdFront(coinId, base64).then(() => {
                toast('Successfully uploaded image')
                setFront(null)
                setFrontSrc(frontSrc.endsWith('/') ? frontSrcBase : frontSrcBase + '/')
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
                toast('Successfully uploaded image')
                setBack(null)
                setBackSrc(backSrc.endsWith('/') ? backSrcBase : backSrcBase + '/')
            })
        }
    }

    const updateCoin = () => {
        CoinsService.putCoins({
            id: coinId,
            currencyId: currencies?.find(c => c.name == currency)?.id,
            value: value,
            year: year
        }).then(
            () => toast("Coin updated successfully"), 
            () => toast("Error while updating coin"))
    }

    const navigate = useNavigate()

    const deleteCoin = () => {
        CoinsService.deleteCoinsById(coinId).then(
            () => {
                toast("Coin deleted successfully")
                navigate("/")
            }, 
            () => toast("Error while deleting coin"))
        setDeleteOpened(false)
    }

    useQuery(["getCoinById", coinId], () => CoinsService.getCoinsById(coinId).then(data => setCoin(data)))
    useQuery(["getCurrencies"], () => CurrenciesService.getCurrenciesAll().then(data => setCurrencies(data)))

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
        <>
            <Grid columns={3}>
                <Grid.Col span={1}>
                    Currency:
                </Grid.Col>
                {
                auth.isLoggedIn ?
                <>
                <Grid.Col span={1}>
                    <Select 
                        data={currencies?.map(c => c.name ?? "ERROR")}
                        value={currency}
                        onChange={(value) => setCurrency(value ?? "")}
                        allowDeselect={false} />
                </Grid.Col>
                <Grid.Col span={1}>
                    <Button onClick={updateCoin}>
                        Update Coin
                    </Button>
                </Grid.Col>
                </> :
                <Grid.Col span={2}>
                    {currencies?.find(c => c.id == coin.currencyId)?.name}
                </Grid.Col>
                }
                
                <Grid.Col span={1}>
                    Value:
                </Grid.Col>
                {
                auth.isLoggedIn ?
                <>
                <Grid.Col span={1}>
                    <NumberInput 
                        value={value}
                        onChange={(v) => setValue(v as number)} />
                </Grid.Col>
                <Grid.Col span={1}>
                    <Button onClick={() => setDeleteOpened(true)}>
                        Delete Coin
                    </Button>
                </Grid.Col>
                </> :
                <Grid.Col span={2}>
                    {coin?.value}
                </Grid.Col>
                }
                
                <Grid.Col span={1}>
                    Year of Minting:
                </Grid.Col>
                {
                auth.isLoggedIn ?
                <>
                <Grid.Col span={1}>
                    <NumberInput 
                        value={year}
                        onChange={(v) => setYear(v as number)} />
                </Grid.Col>
                <Grid.Col span={1}>
                    <Button onClick={() => navigate('/statistics/' + coinId)}>
                        Statistics
                    </Button>
                </Grid.Col>
                </> :
                <Grid.Col span={2}>
                    {coin?.year}
                </Grid.Col>
                }

                <Grid.Col span={1}>
                    <Image 
                        radius="md"
                        src={frontSrc}
                        fallbackSrc="https://placehold.co/600x400?text=No Front Side Set" />
                </Grid.Col>
                <Grid.Col span={1}>
                    <Image 
                        radius="md"
                        src={backSrc}
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
            <Modal title="Do you really want to delete this coin?" opened={deleteOpened} onClose={() => {}}>
                <Group>
                    <Button onClick={deleteCoin}>
                        Delete Coin
                    </Button>
                    <Button onClick={() => setDeleteOpened(false)}>
                        Cancel
                    </Button>
                </Group>
            </Modal>
        </>
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
