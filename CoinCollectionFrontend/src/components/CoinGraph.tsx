import { LineChart } from "@mantine/charts"
import { useEffect, useState } from "react"
import { CoinDto, CoinsService, CurrenciesService, CurrencyDto, HistoryEntryByCoinDto, HistoryService } from "../api"
import { Button, Grid, Group, NumberInput, Select } from "@mantine/core"
import { useQuery } from "react-query"

type Props = {
    coinId: number
}

function CoinGraph({
    coinId
}: Props) {
    const [coin, setCoin] = useState<CoinDto>()
    const [currency, setCurrency] = useState("")
    const [value, setValue] = useState(0)
    const [year, setYear] = useState(0)
    const [currencies, setCurrencies] = useState<CurrencyDto[]>()
    const [historyData, setHistoryData] = useState<HistoryEntryByCoinDto[]>()
    const [graphData, setGraphData] = useState<HistoryEntryByCoinDto[]>([])
    const [sse, setSse] = useState<EventSource | undefined>(undefined)
    
    useQuery(["getCurrencies"], () => CurrenciesService.getCurrenciesAll().then(data => setCurrencies(data)))
    if (coinId > 0) {
        useQuery(["getCoin"], () => CoinsService.getCoinsById(coinId).then(data => setCoin(data)))
    }

    useEffect(() => {
        if (coin) {
            setCurrency(currencies?.find(c => c.id == coin?.currencyId)?.name ?? "")
            setValue(coin?.value ?? 0)
            setYear(coin?.year ?? 0)
            HistoryService.getHistory(coin.currencyId, coin.value, coin.year).then((data) => {
                setHistoryData(data)
            })
        }
    }, [coin])

    useEffect(() => {
        setCurrency(currencies?.find(c => c.id == coin?.currencyId)?.name ?? "")
    }, [currencies])

    const resetSse = () => {
        sse?.close()
        const currencyId = currencies?.find(c => c.name == currency)?.id
        if (currencyId) {
            console.log("SSE OPENING")
            setSse(new EventSource('https://localhost:44353/History/updates?currencyId=' + currencyId + '&value=' + value + '&year=' + year))
        }
    }

    useEffect(() => {
        if (sse) {
            sse.onopen = () => {
                console.log("SSE OPEN")
            }
            sse.onerror = () => {
                console.log("ERROR")
                sse?.close()
                setSse(undefined)
            }
            sse.addEventListener("data", (e) => {
                console.log("DATA", e.data)
                const dataObj = JSON.parse(e.data) as HistoryEntryByCoinDto
                setGraphData(data => [...data, {
                    dateTime: new Date(dataObj.dateTime ?? "").toLocaleString(),
                    entryValue: dataObj.entryValue
                }])
            })
            sse.addEventListener("close", (e) => {
                console.log("CLOSE", e.data)
                sse?.close()
                setSse(undefined)
            })
        }
    }, [sse])

    useEffect(() => {
        if (historyData) {
            setGraphData(historyData?.map(h => ({
                dateTime: new Date(h.dateTime ?? "").toLocaleString(),
                entryValue: h.entryValue ?? 0
            })) ?? [])
            resetSse()
        }
    }, [historyData])

    useEffect(() => {
        if (currencies) {
            resetSse()
        }
    }, [currencies])

    window.onbeforeunload = () => {
        sse?.close()
    }

    const updateData = (event: any) => {
        event.preventDefault()
        HistoryService.getHistory(currencies?.find(c => c.name == currency)?.id, value, year).then((data) => {
            setHistoryData(data)
        })
    }

    const mock = () => {
        setGraphData([
            { dateTime: "2024-01-01T00:00:00", entryValue: 2},
            { dateTime: "2024-02-01T00:00:00", entryValue: 4},
            { dateTime: "2024-03-01T00:00:00", entryValue: 3},
            { dateTime: "2024-04-01T00:00:00", entryValue: 3},
            { dateTime: "2024-05-01T00:00:00", entryValue: 7}
        ]) 
    }

    return (
        <form onSubmit={updateData}>
            <Grid columns={7}>
                <Grid.Col span={1}>
                    Currency:
                </Grid.Col>
                <Grid.Col span={1}>
                    <Select 
                        data={currencies?.map(c => c.name ?? "")}
                        value={currency}
                        onChange={(v) => setCurrency(v ?? "")} />
                </Grid.Col>
                <Grid.Col span={1}>
                    Value: 
                </Grid.Col>
                <Grid.Col span={1}>
                    <NumberInput 
                        value={value}
                        onChange={(v) => setValue(v as number)} />
                </Grid.Col>
                <Grid.Col span={1}>
                    Year Of Minting:
                </Grid.Col>
                <Grid.Col span={1}>
                    <NumberInput 
                        value={year}
                        onChange={(v) => setYear(v as number)} />
                </Grid.Col>
                <Grid.Col span={1}>
                    <Button type="submit">
                        Update
                    </Button>
                </Grid.Col>
                <Grid.Col span={7}>
                {
                    graphData && graphData.length > 0 ? (
                        <LineChart 
                            h="70vh"
                            data={graphData}
                            dataKey="dateTime"
                            series={[{
                                name: 'entryValue',
                                color: 'red'
                            }]} />
                    ) : (
                        <Group>
                            No data found
                            <Button onClick={mock}>
                                Use mock data
                            </Button>
                        </Group>
                    )
                }
                </Grid.Col>
            </Grid>
        </form>
    )
}

export default CoinGraph
