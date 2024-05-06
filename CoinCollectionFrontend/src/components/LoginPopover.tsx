import { Button, PasswordInput, Popover, Stack, TextInput } from "@mantine/core"
import { useState } from "react";
import { AuthService } from "../api";

function LoginPopover() {
    const [user, setUser] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const login = () => {
        AuthService.postAuth({
            user: user,
            password: password
        }).then(() => {
            console.log("logged in successfully")
        })
    }

    return false ?
        <Button>
            Log out
        </Button> :
        <Popover>
            <Popover.Target>
                <Button>
                    Log in
                </Button>
            </Popover.Target>
            <Popover.Dropdown>
                <Stack>
                    <TextInput 
                        label="Username" 
                        value={user}
                        onChange={(event) => setUser(event.currentTarget.value)} />
                    <PasswordInput 
                        label="Password" 
                        value={password}
                        onChange={(event) => setPassword(event.currentTarget.value)} />
                    <Button onClick={login}>
                        Submit
                    </Button>
                </Stack>
            </Popover.Dropdown>
        </Popover>
}

export default LoginPopover