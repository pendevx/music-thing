import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./reset.css";
import "./index.css";
import MusicProvider from "./contexts/MusicContext";
import { buildListUrl } from "./utils/url-builder.api";

const musicList = await fetch(buildListUrl()).then(res => res.json());

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <MusicProvider musicList={musicList}>
            <App />
        </MusicProvider>
    </React.StrictMode>
);
