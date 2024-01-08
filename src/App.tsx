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
import SearchUtil from "./utils/searchUtil";
import SearchBox from "./components/searchbox/searchBox";
import { searchItemInterface } from "./components/searchbox/interface";
import image from "./loading.webp"
import Authenticate from "./utils/authenticate";

function App() {
  const [allItems, setallItems] = useState<ItemInterface[]>()
  const [toDoItems, settoDoItems] = useState<ItemInterface[]>()
  const [completedItems, setCompletedItems] = useState<ItemInterface[]>()
  const [graph, setGraph] = useState<SearchUtil>()
  const [completedCount, setcompletedCount] = useState<number>()
  const [fetching, setFetching] = useState<boolean>(true)
  Authenticate();
  const CORE_URL = process.env.REACT_APP_CORE_DOMAIN

  useEffect(()=>{
      axios.get<ItemInterface[]>(`${CORE_URL}Task`).then(
        (response)=>{
          console.log(response.data);
          setallItems(response.data)
          setGraph(new SearchUtil(response.data || [], setCompletedItems, settoDoItems, setcompletedCount))
          setFetching(false);
        }
      )
  }, [fetching, CORE_URL])

  const changeItemStatus: ChangeItemStatus = useCallback((id: number, status: boolean, description: string)=>{
      axios.put(`${CORE_URL}Task`, {
          status: status,
          description: description,
          taskId: id,
      }).then(response=>{
          if(response.status === 200)
            setFetching(true);
      })
  }, [CORE_URL]);

  const changeItemContent: ChangeItemContent = useCallback((id: number, status: boolean, description: string)=>{
        axios.put(`${CORE_URL}Task`, {
            status: status,
            description: description,
            taskId: id,
        }).then((response)=>{
          if(response.status === 200){
            setFetching(true);
          }
        });
    }, [CORE_URL]);

  const deleteItem: deleteItem = useCallback((id: number)=>{
        axios.delete(`${CORE_URL}Task/${id}`).then(response=>{
            if(response.status === 200)
                setFetching(true);
        })
    }, [CORE_URL]);

    const addItem: addItemInterface = useCallback((description: string)=>{
      axios.post(`${CORE_URL}Task`, {
        description: description
      }).then(response=>{
        if(response.status === 200)
          setFetching(true);
      })
    },[CORE_URL])

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
            {fetching && <img src={image}/>}
            {!fetching && toDoItems && toDoItems.map(item=><Item key={item.taskId} item={item} changeItemContent={changeItemContent} changeItemStatus={changeItemStatus} deleteItem={deleteItem}/>)}
            {!fetching && <Header title={`Completed ${completedCount || ''}`}/>}
            {!fetching && completedItems && completedItems.map(item=><Item key={item.taskId} item={item} changeItemContent={changeItemContent} changeItemStatus={changeItemStatus} deleteItem={deleteItem}/>)}
          </>
        </Container>
        <AddItem addItem={addItem}/>
      </>
    );
}


export default App;
