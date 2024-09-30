import React from "react";
import useFetch from "../hooks/useFetch";

type TAccountsContext = {
    register: (username: string, password: string) => Promise<void>;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    userInformation: UserInformation | null;
};

type UserInformation = {
    displayName: string;
};

const AccountsContext = React.createContext<TAccountsContext>({} as TAccountsContext);

export default function AccountsProvider({ children }: { children?: React.ReactNode }) {
    const { data: userInformation, error, refreshData, setData: setUserInformation } = useFetch<UserInformation | null>(null);

    const register = async (username: string, password: string) => {
        await fetch("/accounts/register", {
            method: "POST",
            body: JSON.stringify({ username, password }),
        });

        refreshData("/accounts/user");
    };

    const login = async (username: string, password: string) => {
        await fetch("/accounts/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
        });

        refreshData("/accounts/user");
    };

    const logout = async () => {
        await fetch("/accounts/logout", {
            method: "POST",
        });

        setUserInformation(null);
    };

    return (
        <AccountsContext.Provider
            value={{
                userInformation,
                register,
                login,
                logout,
            }}>
            {children}
        </AccountsContext.Provider>
    );
}
