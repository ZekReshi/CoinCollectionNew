import { AppShell, Card, Container, Stack } from "@mantine/core"
import { NavLink, Outlet } from "react-router-dom"

function Layout() {
    return (
        <AppShell padding='xl' header={{height: 130}} navbar={{width: 200, breakpoint: 'sm'}}>
            <AppShell.Header>
                <NavLink to="/">
                    <h1 id="header">Coin Collection</h1>
                </NavLink>
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