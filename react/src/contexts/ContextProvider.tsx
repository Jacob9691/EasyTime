import { createContext, useContext, useState } from "react";

interface User {
    name: string
}

type Token = string | null

const StateContext = createContext<{
    user: User | null,
    token: Token,
    setUser: (user: User) => void,
    setToken: (token: Token) => void
}>({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
})

export const ContextProvider = ({children}: any) => {
    const [user, setUser] = useState<User>({
        name: "Jabber"
    });
    const [token, _setToken] = useState<Token>(localStorage.getItem('ACCESS_TOKEN'));

    const setToken = (token: any) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        }
        else {
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)