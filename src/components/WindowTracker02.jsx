import React from "react"

export default function WindowTracker02() {

    // Challenge:
    // 1. Create state called `windowWidth`, default to 
    //    `window.innerWidth`
    // 2. When the window width changes, update the state
    // 3. Display the window width in the h1 so it updates
    //    every time it changes

    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)   

    React.useEffect(function() {
        window.addEventListener("resize", function() {
            // console.log("Resized")
            setWindowWidth(window.innerWidth)
        })
    }, [])

    // THERE IS A BUG, WE SET AN EVENT LISTENER ON THE DOM
    // BUT WHEN WE "UNMOUNT" OUR COMPONENT
    // THE EVENT LISTENER STAYS ON THE DOM
    // SO WHEN WE GO TO RESIZE IT TRIES TO LOOK FOR THE setWindowWidth AND CANNOT FIND IT
    // this is a Memory Leak
    
    return (
        <h1>Window width: {windowWidth}</h1>
    )
}
