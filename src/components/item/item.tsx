import React, { useEffect, useState, useCallback } from "react";
import { ItemCompInterface } from "./interface";
import "./item.css"

const Item: React.FC<ItemCompInterface> = ({item, changeItemContent, changeItemStatus, deleteItem}) => {
    const [ itemContentState, setitemContentState] = useState(item.content);
    const [ itemClass, setItemClass ] = useState<{checkBox:string, itemContent:string}>();

    const itemContentChangeViewHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>)=>{
        setitemContentState(event.currentTarget?.value)
    }, []);

    const itemContentChangeHandler = useCallback((event: React.KeyboardEvent<HTMLInputElement>)=>{
        if(event.key === 'Enter'){
            changeItemContent(item.id, event.currentTarget?.value);
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
        <li className="item" id={`item-${item.id}`}>
            <span className={itemClass?.checkBox} onClick={()=>{changeItemStatus(item.id, !item.status)}}/>
            <input onChange={itemContentChangeViewHandler} onKeyDown={itemContentChangeHandler} type="text" className={itemClass?.itemContent} value={itemContentState}/>
            <span className="deleteItem" onClick={()=>{deleteItem(item.id)}}/>
        </li>
    )
}

export default Item;
