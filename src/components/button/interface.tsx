interface addItemInterface{
    (description
        : string): void
}

interface addItemComp{
    addItem: addItemInterface
}

export type {
    addItemInterface,
    addItemComp
}