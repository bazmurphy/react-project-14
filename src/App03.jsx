import React from "react"
import './App.css'
import WindowTracker03 from "./components/WindowTracker03"

export default function App() {
    
    const [show, setShow] = React.useState(true)

    function toggle() {
        setShow(prevShow => prevShow === true ? false : true)
        // setShow(prevShow => !prevShow)
        console.log(show)
    }

    return (
        <div className="App">
            <button onClick={toggle}>Toggle WindowTracker</button>
            {show && <WindowTracker03 />}
        </div>
    )
}
