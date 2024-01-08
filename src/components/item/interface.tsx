interface ItemInterface{
    description: string,
    status: boolean,
    taskId: number,
};

interface ChangeItemStatus{
    (taskId: number, status: boolean, description: string): void;
}

interface deleteItem{
    (taskId: number): void;
}

interface ChangeItemContent{
    (taskId: number, status: boolean, description: string): void;
}

interface ItemCompInterface{
    item: ItemInterface,
    changeItemStatus: ChangeItemStatus,
    changeItemContent: ChangeItemContent,
    deleteItem: deleteItem
};

export type {ItemInterface, ItemCompInterface, ChangeItemStatus , ChangeItemContent, deleteItem };
