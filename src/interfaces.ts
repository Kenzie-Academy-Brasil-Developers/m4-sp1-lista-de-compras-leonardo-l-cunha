interface iData {
    name: string,
    quantity:string
}
interface iBuyList {
    listName: string,
    data: iData[],
    id?:number
}
interface iId extends iBuyList{
    id: number
}

type ListOrderKeys = "listName" | "data"

export {iData, iBuyList,iId,ListOrderKeys}