import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./reset.css";
import "./index.css";
import MusicProvider from "./contexts/MusicContext";
import AccountProvider from "./contexts/AccountsContext";
import AudioTimeProvider from "./contexts/AudioTimeContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <AccountProvider>
            <MusicProvider>
                <AudioTimeProvider>
                    <App />
                </AudioTimeProvider>
            </MusicProvider>
        </AccountProvider>
    </React.StrictMode>
);
