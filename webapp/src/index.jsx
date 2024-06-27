import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./reset.css";
import "./index.css";

const res = await fetch("https://describe-files.pendevx.workers.dev/", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
});

const musicList = await res.json();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App musicList={musicList} />
    </React.StrictMode>
)
