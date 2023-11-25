import { addItemComp } from "./interface";
import "./button.css"
import { useState, useCallback } from "react";

const AddItem:React.FC<addItemComp> = ({addItem})=>{
    const [content, setContent] = useState('');
    const addItemViewHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>)=>{
        setContent(event.currentTarget?.value)
    }, []);
    const addItemHandler = useCallback((event: React.KeyboardEvent<HTMLInputElement>)=>{
        if(event.key === 'Enter'){
            if(content)
                addItem(content);
            event.currentTarget?.blur();
            if(event.currentTarget)
                event.currentTarget.value = '';
        }
    },[addItem, content]);
    return(
        <div className="addItem">
            <input style={{textAlign:"center"}} placeholder="Add new task..." onChange={addItemViewHandler} onKeyDown={addItemHandler} className="addItemHolder"/>
        </div>
    )
}

export default AddItem;
