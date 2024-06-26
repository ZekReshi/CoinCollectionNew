import { Button, NumberInput, Popover, Select, Stack } from "@mantine/core"
import { useEffect, useState } from "react";
import { CoinsService, CurrenciesService, CurrencyDto } from "../api";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useAuth } from "./AuthProvider";

function AddCoinPopover() {
    const [currency, setCurrency] = useState("")
    const [value, setValue] = useState(0)
    const [year, setYear] = useState(0)
    const [currencies, setCurrencies] = useState<CurrencyDto[]>()

    const auth = useAuth()

    const addCoin = (event: any) => {
        event.preventDefault()
        CoinsService.postCoins({
            currencyId: currencies?.find(c => c.name == currency)?.id,
            value: value,
            year: year
        }).then(
            () => toast.success("Coin added successfully"),
            (e) => {
                if (e.status == 401) {
                    toast.error("Please login again")
                    auth.logout()
                } else {
                    toast.error("Error adding coin")
                }
            })
    }

    useEffect(() => {
        if (currencies) {
            setCurrency(currencies[0].name ?? "")
        }
    }, [currencies])
    
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
                            allowDeselect={false}
                            onChange={(v) => setCurrency(v ?? "")}
                            comboboxProps={{ withinPortal: false }} />
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