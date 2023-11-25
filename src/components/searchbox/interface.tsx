interface searchItemInterface{
    (content: string): void
}

interface searchItemComp{
    searchItem: searchItemInterface
}

export type {
    searchItemInterface,
    searchItemComp
}
