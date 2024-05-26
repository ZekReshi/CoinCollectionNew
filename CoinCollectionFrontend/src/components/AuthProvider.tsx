import { useContext, createContext, useState } from "react"
import { OpenAPI } from "../api"

const AuthContext = createContext({ isLoggedIn: true, login: (t: string) => {}, logout: () => {}});

export const useAuth = () => useContext(AuthContext)

type Props = {
    children: string | JSX.Element | JSX.Element[]
}

export const AuthProvider = ({ children }: Props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))

    const login = (t: string) => {
        localStorage.setItem('token', t)
        setIsLoggedIn(true)
        OpenAPI.TOKEN = t
    }

    const logout = () => {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        OpenAPI.TOKEN = undefined
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext
