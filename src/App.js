import React from "react";
import ReactDOM from "react-dom/client";
import Todo from "./Components/Todo";

const App = () => {
    return (
        <div className="app"> 
        <Todo/>
            </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>)

