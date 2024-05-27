import { Button, PasswordInput, Popover, Stack, TextInput } from "@mantine/core"
import { useState } from "react";
import { AuthService } from "../api";
import toast from "react-hot-toast";
import { useAuth } from "./AuthProvider";

function LoginPopover() {
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")

    const auth = useAuth();

    const login = (event: any) => {
        event.preventDefault()
        AuthService.postAuth({
            user: user,
            password: password
        }).then((data) => {
            auth.login(data)
            toast("Logged in successfully")
            setUser("")
            setPassword("")
        }).catch(() => toast("Login Error"))
    }

    return auth.isLoggedIn ?
        <Button onClick={() => {
            auth.logout()
            toast("Logged out successfully")
            }}>
            Log out
        </Button> :
        <Popover>
            <Popover.Target>
                <Button>
                    Log in
                </Button>
            </Popover.Target>
            <Popover.Dropdown>
                <form onSubmit={login} action="">
                    <Stack>
                        <TextInput 
                            label="Username" 
                            value={user}
                            onChange={(event) => setUser(event.currentTarget.value)} />
                        <PasswordInput 
                            label="Password" 
                            value={password}
                            onChange={(event) => setPassword(event.currentTarget.value)} />
                        <Button type="submit">
                            Submit
                        </Button>
                    </Stack>
                </form>
            </Popover.Dropdown>
        </Popover>
}

export default LoginPopover