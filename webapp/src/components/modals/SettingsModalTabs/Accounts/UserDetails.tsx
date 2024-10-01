import { UserInformation, AccountsContext } from "../../../../contexts/AccountsContext";
import React from "react";

export default function UserDetails() {
    const { userInformation } = React.useContext(AccountsContext) as { userInformation: UserInformation };

    console.log(userInformation);

    return (
        <>
            <h4>Currently signed in as: {userInformation.displayName}</h4>
        </>
    );
}
