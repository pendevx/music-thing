import React from "react";
import useFetch from "../hooks/useFetch";

type TAccountsContext = {
    register: (username: string, password: string, userInformation: UserInformation) => void;
    login: (username: string, password: string) => void;
    logout: () => void;
    userInformation: UserInformation | null;
};

export type UserInformation = {
    displayName: string;
};

export const AccountsContext = React.createContext<TAccountsContext>({} as TAccountsContext);

export default function AccountsProvider({ children }: { children?: React.ReactNode }) {
    const { data, refreshData, setData } = useFetch<UserInformation | null>(null);

    React.useEffect(() => {
        refreshData("/api/accounts/user");
    }, []);

    const register = (username: string, password: string, userInformation: UserInformation) => {
        refreshData("/api/accounts/register", {
            method: "POST",
            body: JSON.stringify({ ...userInformation, username, password }),
        });
    };

    const login = (username: string, password: string) => {
        refreshData("/api/accounts/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
        });
    };

    const logout = () => {
        refreshData("/api/accounts/logout", {
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
