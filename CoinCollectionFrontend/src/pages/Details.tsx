import { useParams } from "react-router-dom"
import CoinDetails from "../components/CoinDetails"

function Details() {
    const params = useParams();

    const coinId = params.id ?? "0";

    return (
        <CoinDetails coinId={+coinId} />
    )
}

export default Details