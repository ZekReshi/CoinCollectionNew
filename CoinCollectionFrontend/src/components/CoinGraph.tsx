import { LineChart } from "@mantine/charts"
import { useEffect, useState } from "react"
import { HistoryEntryByCoinDto, HistoryService } from "../api"
import { Button, Group } from "@mantine/core"

type Props = {
    coinId: number
}

function CoinGraph({
    coinId
}: Props) {
    const [sseOpen, setSseOpen] = useState<boolean>(true)
    const [data, setData] = useState<HistoryEntryByCoinDto[]>()

    useEffect(() => {
        HistoryService.getHistoryById(coinId).then((data) => {
            setData(data)
        })
    }, [coinId])

    /*let sse: EventSource | undefined = new EventSource('https://localhost:44353/Coins/by-id/' + coinId + "/history")
    sse.onmessage = data => {
        console.log(data.data)
    }
    sse.onerror = () => {
        console.log("ERROR")
        sse?.close()
        sse = undefined
        setSseOpen(false)
    }*/

    const mock = () => {
        setData([
            {"dateTime":"2024-01-01T00:00:00","entryValue":2},
            {"dateTime":"2024-02-01T00:00:00","entryValue":4},
            {"dateTime":"2024-03-01T00:00:00","entryValue":3},
            {"dateTime":"2024-04-01T00:00:00","entryValue":3},
            {"dateTime":"2024-05-01T00:00:00","entryValue":7}
        ]) 
    }

    return data && data.length > 0 ? (
        <LineChart 
            h={"70vh"}
            data={data}
            dataKey="dateTime"
            series={[{
                name: 'entryValue',
                color: 'red'
            }]} />
    ) : (
        <Group>
            No data for coin with ID {coinId} found
            <Button onClick={mock}>
                Use mock data
            </Button>
        </Group>
    )
}

export default CoinGraph
