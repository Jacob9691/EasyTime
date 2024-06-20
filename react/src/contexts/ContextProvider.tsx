// Imports til createContext, useContext, useState og ReactNode
import { createContext, useContext, useState, ReactNode } from "react";

// Typedefinitioner for brugerdata og token
type User = {
    id: string;
    surname: string;
    last_name: string;
    company_number: number,
    email: string;
    address: string;
    phone: string;
    admin: boolean;
};

type Token = string | null;

// Oprettelse af context
const StateContext = createContext<{
    user: User;
    token: Token;
    setUser: (user: User) => void;
    setToken: (token: Token) => void;
}>({
    user: {
        id: '',
        surname: '',
        last_name: '',
        company_number: 0,
        email: '',
        address: '',
        phone: '',
        admin: false
    },
    token: null,
    setUser: () => {},
    setToken: () => {}
});

// ContextProvider komponent til at håndtere state og context
export const ContextProvider = ({ children }: { children: ReactNode }) => {
    // Tilstande for brugerdata og token
    const [user, setUser] = useState<User>({
        id: '',
        surname: '',
        last_name: '',
        company_number: 0,
        email: '',
        address: '',
        phone: '',
        admin: false
    });
    const [token, _setToken] = useState<Token>(localStorage.getItem('ACCESS_TOKEN'));

    // Funktion til at opdatere token og gemme det i localStorage
    const setToken = (token: Token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    };

    // Returnerer StateContext.Provider med værdierne for user, token, setUser og setToken
    return (
        <StateContext.Provider value={{ user, token, setUser, setToken }}>
            {children}  {/* Viser børnekomponenter, typisk resten af applikationen */}
        </StateContext.Provider>
    );
};

// Hook til at bruge context i komponenter
export const useStateContext = () => useContext(StateContext);
