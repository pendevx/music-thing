// import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const danger = <div dangerouslySetInnerHTML={{__html: "<script>alert(1)</script>"}}></div>;

ReactDOM.createRoot(document.getElementById('root')).render(
    danger
)
