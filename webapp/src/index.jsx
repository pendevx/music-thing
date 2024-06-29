import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./reset.css";
import "./index.css";
import MusicContext from "./contexts/MusicContext";

const musicList = await fetch(import.meta.env.VITE_LIST_URL)
    .then(res => res.json());

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <MusicContext musicList={musicList}>
            <App />
        </MusicContext>
    </React.StrictMode>
)
