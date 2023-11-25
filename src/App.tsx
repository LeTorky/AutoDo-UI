import Container from "./components/container/container";
import Item from "./components/item/item";
import AddItem from "./components/button/addItem";
import { useEffect, useState, useCallback } from "react"
import axios from 'axios';
import {
  ItemInterface,
  ChangeItemStatus,
  ChangeItemContent,
  deleteItem
} from "./components/item/interface";
import {
  addItemInterface
} from "./components/button/interface";
import Header from "./components/header/header";
import Graph from "./utils/graph";
import SearchBox from "./components/searchbox/searchBox";
import { searchItemInterface } from "./components/searchbox/interface";

function App() {
  const [allItems, setallItems] = useState<ItemInterface[]>()
  const [toDoItems, settoDoItems] = useState<ItemInterface[]>()
  const [completedItems, setCompletedItems] = useState<ItemInterface[]>()
  const [graph, setGraph] = useState<Graph>()
  const [completedCount, setcompletedCount] = useState<number>()
  const [fetching, setFetching] = useState<boolean>(false)

  useEffect(()=>{
      axios.get<ItemInterface[]>("http://localhost:8000/items").then(
        (response)=>{
          setallItems(response.data)
          setGraph(new Graph(response.data || [], setCompletedItems, settoDoItems, setcompletedCount))
          setFetching(false);
        }
      )
  }, [fetching])

  const changeItemStatus: ChangeItemStatus = useCallback((id: number, status: boolean)=>{
      axios.patch(`http://localhost:8000/items/${id}`, {
          status: status
      }).then(response=>{
          if(response.status === 200)
            setFetching(true);
      })
  }, []);

  const changeItemContent: ChangeItemContent = useCallback((id: number, content: string)=>{
        axios.patch(`http://localhost:8000/items/${id}`, {
            content: content
        }).then((response)=>{
          if(response.status === 200){
            setFetching(true);
          }
        });
    }, []);

  const deleteItem: deleteItem = useCallback((id: number)=>{
        axios.delete(`http://localhost:8000/items/${id}`).then(response=>{
            if(response.status === 200)
                setFetching(true);
        })
    }, []);

    const addItem: addItemInterface = useCallback((content: string)=>{
      axios.post("http://localhost:8000/items", {
        content: content,
        status:false
      }).then(response=>{
        if(response.status === 201)
          setFetching(true);
      })
    },[])

    const searchItem: searchItemInterface = useCallback((content: string)=>{
      if(content)
        graph?.setItems(content)
      else
        graph?.setDefault()
    }, [graph])

    return (
      <>
        <SearchBox searchItem={searchItem}/>
        <Container>
          <>
            {toDoItems && toDoItems.map(item=><Item key={item.id} item={item} changeItemContent={changeItemContent} changeItemStatus={changeItemStatus} deleteItem={deleteItem}/>)}
            <Header title={`Completed ${completedCount || ''}`}/>
            {completedItems && completedItems.map(item=><Item key={item.id} item={item} changeItemContent={changeItemContent} changeItemStatus={changeItemStatus} deleteItem={deleteItem}/>)}
          </>
        </Container>
        <AddItem addItem={addItem}/>
      </>
    );
}


export default App;
