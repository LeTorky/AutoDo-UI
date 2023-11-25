import { ItemInterface } from "../components/item/interface"

interface setters<T>{
    (items: T): void
}

class Graph{
    allItems: ItemInterface[] = [];
    completedSetter: setters<ItemInterface[]>
    toDoSetter: setters<ItemInterface[]>
    completedCountSetter: setters<number>

    constructor(items: ItemInterface[], completedSetter: setters<ItemInterface[]>,
        toDoSetter: setters<ItemInterface[]>, completedCountSetter: setters<number>){
        this.toDoSetter = toDoSetter;
        this.completedSetter = completedSetter;
        this.completedCountSetter = completedCountSetter
        this.allItems = items;
        this.setDefault();
    }

    setItems = (word: string)=>{
        const completedItems: ItemInterface[] = [];
        const toDoItems: ItemInterface[] = [];
        word = word.toLowerCase();
        this.allItems.forEach(item => {
            const itemWord = item.content.toLowerCase()
            if(itemWord.includes(word))
                item.status ? completedItems.push(item) :
                toDoItems.push(item)
        });
        this.completedSetter(completedItems);
        this.toDoSetter(toDoItems);
        this.completedCountSetter(completedItems.length);
    }

    setDefault = ()=>{
        const completedItems: ItemInterface[] = [];
        const toDoItems: ItemInterface[] = [];
        for(let item of this.allItems){
            item.status ? completedItems.push(item) : toDoItems.push(item);
        }
        this.completedSetter(completedItems);
        this.toDoSetter(toDoItems);
        this.completedCountSetter(completedItems.length)
    }
}

export default Graph;
