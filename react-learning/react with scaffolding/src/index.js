import React from 'react';
import ReactDOM from "react-dom";

function Component(){
    return <h1>hi</h1>;
}

ReactDOM.render(<>
    <Component />
</>, document.getElementById("root"));
