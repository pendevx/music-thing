import React from "react";
import { AccountsContext, UserInformation } from "../../../contexts/AccountsContext";
import CommonSettingsTab from "./CommonSettingsTab";
import { RaisedInputPlaceholder } from "../../";

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
            <h4>Currently signed in as: ${userInformation.displayName}</h4>
        </>
    );
}

function Unauthenticated() {
    const [action, setAction] = React.useState<"login" | "register">("register");

    const switchAction = () => {
        setAction(action === "login" ? "register" : "login");
    };

    const actionName = action.charAt(0).toUpperCase() + action.slice(1);

    return (
        <div>
            <h4>Log in or register an account below to unlock more functionality!</h4>
            <div className="relative mb-8 mt-4 w-full">
                <h5 className="mb-2 text-center text-base font-bold">{actionName}</h5>
                <button className="absolute bottom-0 right-0 w-fit cursor-pointer text-sm text-white" onClick={switchAction}>
                    Switch to {action === "login" ? "Register" : "Login"}
                </button>
            </div>

            <form className="flex flex-col items-start gap-4" onKeyDown={e => e.stopPropagation()}>
                {action === "login" ? <LoginForm /> : <RegistrationForm />}

                <div className="grid w-full grid-cols-2 gap-4">
                    <button type="reset" className="w-full border-[1px] border-solid border-white bg-[#333] p-2 text-center text-white">
                        Reset
                    </button>
                    <button type="submit" className="w-full border-[1px] border-solid border-white bg-[#333] p-2 text-center text-white">
                        {actionName}
                    </button>
                </div>
            </form>
        </div>
    );
}

function RegistrationForm() {
    return (
        <div className="grid w-full grid-cols-2 gap-4">
            <RaisedInputPlaceholder placeholder="Username" className="w-full border-[1px] border-solid border-white p-2" type="text" colorClass="text-white bg-[#080808] px-2" />
            <RaisedInputPlaceholder placeholder="Password" className="w-full border-[1px] border-solid border-white p-2" type="password" colorClass="text-white bg-[#080808] px-2" />
            <RaisedInputPlaceholder placeholder="Display Name" className="w-full border-[1px] border-solid border-white p-2" type="text" colorClass="text-white bg-[#080808] px-2" />
            <RaisedInputPlaceholder placeholder="Email" className="w-full border-[1px] border-solid border-white p-2" type="email" colorClass="text-white bg-[#080808] px-2" />
        </div>
    );
}

function LoginForm() {
    return (
        <>
            <RaisedInputPlaceholder placeholder="Username" className="w-full border-[1px] border-solid border-white p-2" type="text" colorClass="text-white bg-[#080808] px-2" />
            <RaisedInputPlaceholder placeholder="Password" className="w-full border-[1px] border-solid border-white p-2" type="password" colorClass="text-white bg-[#080808] px-2" />
        </>
    );
}
