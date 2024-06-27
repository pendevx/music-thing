import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./reset.css";
import "./index.css";

import keys from "./keys";

// const musicList = await fetch("thing");

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App musicList={keys} />
    </React.StrictMode>
)
