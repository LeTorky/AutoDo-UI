import { searchItemComp } from "./interface";
import "./searchBox.css"
import { useCallback } from "react";

const SearchBox:React.FC<searchItemComp> = ({searchItem})=>{
    const searchItemHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>)=>{
        let contentToSet = event.currentTarget?.value;
        searchItem(contentToSet);
    }, [searchItem]);
    return(
        <div className="searchBox">
            <input style={{textAlign:"center"}} placeholder="Find task..." onChange={searchItemHandler} className="searchBoxHolder"/>
        </div>
    )
}

export default SearchBox;
