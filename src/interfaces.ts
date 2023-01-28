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
type ItemOrderKeys = "name" | "quantity"
export {iData, iBuyList,iId,ListOrderKeys,ItemOrderKeys}