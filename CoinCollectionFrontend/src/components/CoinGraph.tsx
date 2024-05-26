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
    const [graphData, setGraphData] = useState<HistoryEntryByCoinDto[]>()

    useEffect(() => {
        HistoryService.getHistoryById(coinId).then((data) => {
            setGraphData(data)
        })
    }, [coinId])

    useEffect(() => {
        sse?.close()
        console.log("SSE OPENING")
        sse = new EventSource('https://localhost:44353/History/by-id/' + coinId + "/updates")
        sse.onopen = () => {
            console.log("SSE OPEN")
        }
        sse.onerror = () => {
            console.log("ERROR")
            sse?.close()
            sse = undefined
        }
        sse.addEventListener("data", (e) => {
            console.log("data", e.data)
            graphData?.push(JSON.parse(e.data))
            console.log(graphData)
        })
        sse.addEventListener("close", (e) => {
            console.log("close", e.data)
            sse?.close()
            sse = undefined
        })
    }, [graphData])

    let sse: EventSource | undefined = undefined;

    window.onbeforeunload = () => {
        sse?.close()
    }

    const mock = () => {
        setGraphData([
            {"dateTime":"2024-01-01T00:00:00","entryValue":2},
            {"dateTime":"2024-02-01T00:00:00","entryValue":4},
            {"dateTime":"2024-03-01T00:00:00","entryValue":3},
            {"dateTime":"2024-04-01T00:00:00","entryValue":3},
            {"dateTime":"2024-05-01T00:00:00","entryValue":7}
        ]) 
    }

    return graphData && graphData.length > 0 ? (
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
            No data for coin with ID {coinId} found
            <Button onClick={mock}>
                Use mock data
            </Button>
        </Group>
    )
}

export default CoinGraph
