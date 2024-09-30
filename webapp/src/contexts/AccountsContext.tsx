import React from "react";
import useFetch from "../hooks/useFetch";

type TAccountsContext = {
    register: (username: string, password: string) => Promise<void>;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    userInformation: UserInformation | null;
};

export type UserInformation = {
    displayName: string;
};

export const AccountsContext = React.createContext<TAccountsContext>({} as TAccountsContext);

export default function AccountsProvider({ children }: { children?: React.ReactNode }) {
    const { data, error, refreshData, setData } = useFetch<UserInformation | null>(null);

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

        setData(null);
    };

    return (
        <AccountsContext.Provider
            value={{
                userInformation: data,
                register,
                login,
                logout,
            }}>
            {children}
        </AccountsContext.Provider>
    );
}
