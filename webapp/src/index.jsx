import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./reset.css";
import "./index.css";
import MusicContext from "./contexts/MusicContext";

const musicList = await fetch("https://describe-files.pendevx.workers.dev/")
    .then(res => res.json());

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <MusicContext musicList={musicList}>
            <App />
        </MusicContext>
    </React.StrictMode>
)
