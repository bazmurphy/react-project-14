import React from "react"
import './App.css'
import WindowTracker02 from "./components/WindowTracker02"

export default function App() {
    
    const [show, setShow] = React.useState(true)

    function toggle() {
        setShow(prevShow => prevShow === true ? false : true)
        // setShow(prevShow => !prevShow)
        console.log(show)
    }

    // when we click toggle
    // the <WindowTracker /> component is UNMOUNTED from the DOM
    // when we click toggle again
    // the <WindowTracker /> component is REMOUNTED
    // and it re-runs the {window.innerWidth} which gets us the updated version if Window Width
    
    // We can improve this, we can add an eventListener to our Window, that listens for the "resize" event
    // And whenever the window is resized, we can set some LOCAL STATE to our WindowTracker so that we can display the correct window width at any time
    // without having to toggle it on, or off, or refresh our page completely.

    // But because it is the Window, we can't add a "onResize={}" event.
    // So we have to do some MANUAL IMPERATIVE DOM MANIPULATION
    // and because we will be interacting with a System outside of our WindowTracker component, the WINDOW itself
    // we need to use useEffect()

    return (
        <div className="App">
            <button onClick={toggle}>Toggle WindowTracker</button>
            {show && <WindowTracker02 />}
        </div>
    )
}
