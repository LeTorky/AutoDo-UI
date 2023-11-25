import React from "react";
import ContainerCompInterface from "./interface";
import './container.css';

const Container: React.FC<ContainerCompInterface> = ({children}) => {
    return (
        <ul className="container">
            {children}
        </ul>
    )
}

export default Container;
