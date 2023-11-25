interface ItemInterface{
    content: string,
    status: boolean,
    id: number,
};

interface ChangeItemStatus{
    (id: number, status: boolean): void;
}

interface deleteItem{
    (id: number): void;
}

interface ChangeItemContent{
    (id: number, content: string): void;
}

interface ItemCompInterface{
    item: ItemInterface,
    changeItemStatus: ChangeItemStatus,
    changeItemContent: ChangeItemContent,
    deleteItem: deleteItem
};

export type {ItemInterface, ItemCompInterface, ChangeItemStatus , ChangeItemContent, deleteItem };
