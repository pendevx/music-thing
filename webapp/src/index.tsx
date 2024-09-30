import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./reset.css";
import "./index.css";
import MusicProvider from "./contexts/MusicContext";
import AccountProvider from "./contexts/AccountsContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <AccountProvider>
            <MusicProvider>
                <App />
            </MusicProvider>
        </AccountProvider>
    </React.StrictMode>
);
