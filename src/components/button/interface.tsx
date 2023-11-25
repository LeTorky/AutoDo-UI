interface addItemInterface{
    (content: string): void
}

interface addItemComp{
    addItem: addItemInterface
}

export type {
    addItemInterface,
    addItemComp
}