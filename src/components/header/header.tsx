import { headerInterface } from "./interface";
import React from "react"
import "./header.css"

const Header: React.FC<headerInterface> = ({title})=>{
    return (<div className="itemHeader">
        {title}
    </div>)
}

export default Header;