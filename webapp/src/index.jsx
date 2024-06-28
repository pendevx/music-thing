import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./reset.css";
import "./index.css";
import MusicContext from "./contexts/MusicContext";

const res = await fetch("https://describe-files.pendevx.workers.dev/", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
});

const musicList = await res.json();

console.log(musicList);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <MusicContext>
            <App musicList={musicList} />
        </MusicContext>
    </React.StrictMode>
)
