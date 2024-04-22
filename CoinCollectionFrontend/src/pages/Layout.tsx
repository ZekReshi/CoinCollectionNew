import { AppShell, Button, Card, Group, PasswordInput, Popover, Stack, TextInput } from "@mantine/core"
import { NavLink, Outlet } from "react-router-dom"

function Layout() {
    return (
        <AppShell padding='xl' header={{height: 100}} navbar={{width: 200, breakpoint: 'sm'}}>
            <AppShell.Header>
                <Group id="header" justify="space-between">
                    <NavLink to="/">
                        <h1>Coin Collection</h1>
                    </NavLink>
                    {
                        false ?
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
                                    <TextInput label="Username" />
                                    <PasswordInput label="Password" />
                                    <Button>
                                        Submit
                                    </Button>
                                </Stack>
                            </Popover.Dropdown>
                        </Popover>
                    }
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <nav>
                    <Stack gap='xs'>
                        <NavLink 
                            to="/"
                            className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""}>
                            <Card withBorder>
                                Home
                            </Card>
                        </NavLink>
                        <NavLink 
                            to="/details/1"
                            className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""}>
                            <Card withBorder>
                                Details of Coin #1
                            </Card>
                        </NavLink>
                        <NavLink 
                            to="/details/2"
                            className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""}>
                            <Card withBorder>
                                Details of Coin #2
                            </Card>
                        </NavLink>
                        <NavLink 
                            to="/details/3"
                            className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""}>
                            <Card withBorder>
                                Details of Coin #3
                            </Card>
                        </NavLink>
                        <NavLink 
                            to="/statistics"
                            className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""}>
                            <Card withBorder>
                                Statistics
                            </Card>
                        </NavLink>
                    </Stack>
                </nav>
            </AppShell.Navbar>

            <AppShell.Main style={{width: '90%'}}>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    )
}

export default Layout