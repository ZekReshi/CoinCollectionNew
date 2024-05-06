import { useParams } from "react-router-dom";
import CoinGraph from "../components/CoinGraph";

function Statistics() {
    const params = useParams();

    const coinId = params.id ?? "0";

    return (
        <CoinGraph coinId={+coinId} />
    )
}

export default Statistics
