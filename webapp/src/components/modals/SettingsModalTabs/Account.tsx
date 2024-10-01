import React from "react";
import { AccountsContext, UserInformation } from "../../../contexts/AccountsContext";
import CommonSettingsTab from "./CommonSettingsTab";
import ValidatableForm, { ReportValidity } from "../../ValidatableForm";

export const AccountSettingsContext = React.createContext<number>(0);

export default function AccountTab() {
    const accountsContext = React.useContext(AccountsContext);

    if (accountsContext.userInformation == null) {
        return (
            <CommonSettingsTab title="Account">
                <Unauthenticated />
            </CommonSettingsTab>
        );
    } else {
        return (
            <CommonSettingsTab title="Account">
                <UserDetails userInformation={accountsContext.userInformation} />
            </CommonSettingsTab>
        );
    }
}

function UserDetails({ userInformation }: { userInformation: UserInformation }) {
    return (
        <>
            <h4>Currently signed in as: {userInformation.displayName}</h4>
        </>
    );
}

function Unauthenticated() {
    const [action, setAction] = React.useState<"login" | "register">("register");
    const [formValid, setFormValid] = React.useState<boolean>(false);
    const [inputKey, setInputKey] = React.useState<number>(0);

    const switchAction = () => {
        setAction(action === "login" ? "register" : "login");
    };

    const actionName = action.charAt(0).toUpperCase() + action.slice(1);

    return (
        <AccountSettingsContext.Provider value={inputKey}>
            <div>
                <h4>Log in or register an account below to unlock more functionality!</h4>

                <div className="relative mb-8 mt-4 w-full">
                    <h5 className="mb-2 text-center text-base font-bold">{actionName}</h5>
                    <button className="absolute bottom-0 right-0 w-fit cursor-pointer text-sm text-white" onClick={switchAction}>
                        Switch to {action === "login" ? "Register" : "Login"}
                    </button>
                </div>

                <form className="flex flex-col items-start gap-4" onKeyDown={e => e.stopPropagation()} onReset={() => setInputKey(inputKey + 1)}>
                    {action === "login" ? <LoginForm reportValidity={setFormValid} /> : <RegistrationForm reportValidity={setFormValid} />}

                    <div className="grid w-full grid-cols-2 gap-4">
                        <button type="reset" className="w-full border-[1px] border-solid border-white bg-[#333] p-2 text-center text-white">
                            Reset
                        </button>
                        <button type="submit" className="w-full border-[1px] border-solid border-white bg-[#004317] p-2 text-center text-white disabled:bg-[#355c42]" disabled={!formValid}>
                            {actionName}
                        </button>
                    </div>
                </form>
            </div>
        </AccountSettingsContext.Provider>
    );
}

function RegistrationForm({ reportValidity }: { reportValidity: ReportValidity }) {
    return (
        <ValidatableForm
            fields={[
                { placeholder: "Username", type: "text", required: true },
                { placeholder: "Password", type: "password", required: true },
                { placeholder: "Display Name", type: "text", required: true },
                { placeholder: "Email", type: "email", required: true },
            ]}
            reportValidity={reportValidity}
        />
    );
}

function LoginForm({ reportValidity }: { reportValidity: ReportValidity }) {
    return (
        <ValidatableForm
            fields={[
                { placeholder: "Username", type: "text", required: true },
                { placeholder: "Password", type: "password", required: true },
            ]}
            reportValidity={reportValidity}
        />
    );
}
