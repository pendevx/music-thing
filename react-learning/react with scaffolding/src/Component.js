import React from "react";

function useState(initObj) {
    const [s, ss] = React.useState(initObj);

    return new Proxy({}, {
        get(_, prop) {
            return s[prop];
        },
        set(_, prop, value) {
            ss(s => ({...s, [prop]: value}));
            return true;
        }
    });
}

export default function Component() {
    let state = useState({ count: 0 });

    return <button onClick={() => { state.count++ }}>count is: {state.count}</button>;
}
