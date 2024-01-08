import React, { useEffect, useState, useCallback } from "react";
import { ItemCompInterface } from "./interface";
import "./item.css"

const Item: React.FC<ItemCompInterface> = ({item, changeItemContent, changeItemStatus, deleteItem}) => {
    const [ itemContentState, setitemContentState] = useState(item.description);
    const [ itemClass, setItemClass ] = useState<{checkBox:string, itemContent:string}>();

    const itemContentChangeViewHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>)=>{
        setitemContentState(event.currentTarget?.value)
    }, []);

    const itemContentChangeHandler = useCallback((event: React.KeyboardEvent<HTMLInputElement>)=>{
        if(event.key === 'Enter'){
            changeItemContent(item.taskId, item.status, event.currentTarget?.value);
            event.currentTarget?.blur();
        }
    },[item, changeItemContent]);

    useEffect(()=>{
        if(item.status)
            setItemClass({checkBox: "checkBoxChecked", itemContent: "itemContentChecked"});
        else
            setItemClass({checkBox: "checkBoxNonChecked", itemContent: "itemContentNonChecked"});
    }, [item]);

    return (
        <li className="item" id={`item-${item.taskId}`}>
            <span className={itemClass?.checkBox} onClick={()=>{changeItemStatus(item.taskId, !item.status, item.description)}}/>
            <input onChange={itemContentChangeViewHandler} onKeyDown={itemContentChangeHandler} type="text" className={itemClass?.itemContent} value={itemContentState}/>
            <span className="deleteItem" onClick={()=>{deleteItem(item.taskId)}}/>
        </li>
    )
}

export default Item;
