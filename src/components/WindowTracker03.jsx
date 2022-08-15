import React from "react"

export default function WindowTracker03() {

    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)   

    React.useEffect(function() {

        // window.addEventListener("resize", function() {
        //     // console.log("Resized")
        //     setWindowWidth(window.innerWidth)
        // })

        // THERE IS A BUG, WE SET AN EVENT LISTENER ON THE DOM
        // BUT WHEN WE "UNMOUNT" OUR COMPONENT
        // THE EVENT LISTENER STAYS ON THE DOM
        // SO WHEN WE GO TO RESIZE IT TRIES TO LOOK FOR THE setWindowWidth AND CANNOT FIND IT
        // this is a Memory Leak

        // BE AWARE OF ANY POTENTIAL SIDE EFFECTS
        // IF YOU DONT "CLEANUP" THINGS THAT YOU DO IN THAT SIDE EFFECT
        // WE ARE ADDING AN EVENT LISTENER THAT DOESNT GET CLEANED UP WHEN THIS COMPONENT UNMOUNTS  


        // WE CAN RETURN A CLEANUP FUNCTION FROM USE EFFECT
        // WHEN REACT RUNS OUR USEEFFECT FUNCTION IT WILL RECIEVE IN RETURN ANOTHER FUNCTION THAT IT CAN USE
        // TO THEN CLEANUP ANY SID EFFECTS THAT YOU HAVE CREATED
        // IN REALITY IT HAS NO IDEA WHAT THE SIDE EFFECTS ARE THAT WE CREATED
        // SO WHAT WE PUT IN THE BODY OF OUR CLEANUP FUNCTION SHOULD BE SOMETHING THAT WE WRITE
        // TO CLEANUP OUR OWN SIDE EFFECTS

        function watchWidth() {
            console.log("watchWidth functiong running...")
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener("resize", watchWidth)
        
        return function() {
            console.log("Cleaning up...")
            window.removeEventListener("resize", watchWidth)
        } 

        // EXPLANATION :

        // OUR APP COMPONENT IS DECIDING WHEN THE WindowTracker03 should be Rendered.
        // As soon as we toggle that ON, and it renders it to the screen
        // it sets the initial windowWidth STATE (based on the current windowWidth) at the moment the Component gets Rendered.
        // useEffect will ONLY run after the DOM has been painted

        // And then it will register our useEffect
        // our useEffect has no dependencies (inside its dependency array)
        // Because there is nothing inside of the useEffect callback function that will register a new eventListener

        // so it registers the window.addEventListener("resize", watchWidth) on the resize of the window
        // and anytime we resize it is reacting to the eventListener we set up.

        // and when we toggle OFF the WindowTracker03 Component...
        // REACT realises that this Component has reached the end of it's life cycle and it will be removed from the DOM
        // and so REACT takes the Function that it recieved from us when it first setup its useEffect
        // and it just runs it
        // and so we remove the eventListener we added (to watch the Window resizing)

        // RECAP :
        // useEffect takes 2 Parameters
        // 1st: the effect that you want to run
        // 2nd: any dependencies that REACT should watch for changes in, to re-run your useEffect function
        // and your useEffect function is allowed to return another Function that can cleanup after any side effects that might lingering in case your Component dies.

        // for many useEffects you setup, you will find yourself not needing a Cleanup function at all
        // it is not REQUIRED for useEffect to work

    }, [])  

    return (
        <h1>Window width: {windowWidth}</h1>
    )
}
