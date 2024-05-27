import { Button, NumberInput, Popover, Select, Stack } from "@mantine/core"
import { useState } from "react";
import { CoinsService, CurrenciesService, CurrencyDto } from "../api";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

function AddCoinPopover() {
    const [currency, setCurrency] = useState("")
    const [value, setValue] = useState(0)
    const [year, setYear] = useState(0)
    const [currencies, setCurrencies] = useState<CurrencyDto[]>()

    const addCoin = (event: any) => {
        event.preventDefault()
        CoinsService.postCoins({
            currencyId: currencies?.find(c => c.name == currency)?.id,
            value: value,
            year: year
        }).then(() => toast("Coin added successfully")
        ).catch(() => toast("Error adding coin"))
    }
    
    useQuery(["getCurrencies"], () => CurrenciesService.getCurrenciesAll().then(data => setCurrencies(data)))

    return (
        <Popover>
            <Popover.Target>
                <Button>
                    Add Coin
                </Button>
            </Popover.Target>
            <Popover.Dropdown>
                <form onSubmit={addCoin}>
                    <Stack>
                        <Select 
                            label="Currency" 
                            data={currencies?.map(c => c.name ?? "")}
                            value={currency}
                            onChange={(v) => setCurrency(v ?? "")} />
                        <NumberInput 
                            label="Value" 
                            value={value}
                            onChange={(v) => setValue(v as number)} />
                        <NumberInput 
                            label="Year Of Minting" 
                            value={year}
                            onChange={(v) => setYear(v as number)} />
                        <Button type="submit">
                            Submit
                        </Button>
                    </Stack>
                </form>
            </Popover.Dropdown>
        </Popover>
    )
}

export default AddCoinPopover