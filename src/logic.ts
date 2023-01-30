import { Request, Response } from "express";
import { data } from "./dataBase";
import { iBuyList, iId,  ListOrderKeys } from "./interfaces";

let count = 1;

const verifyListOrder = (payload: any): iBuyList => {
  const keys: Array<string> = Object.keys(payload);
  const requiredKeys: Array<ListOrderKeys> = ["listName", "data"];

  const containsAllRequired: boolean = requiredKeys.every((key: string) => {
    return keys.includes(key);
  });

  if (!containsAllRequired) {
    throw new Error(`Required Keys are: ${requiredKeys}`);
  }

  return payload;
};

const createListOrder = (request: Request, response: Response): Response => {
  try {
    const newData: iBuyList = verifyListOrder(request.body);
    const id: number = count;

    const newDataComplete: iId = {
      id: id,
      ...newData,
    };
    

    if (typeof newDataComplete.listName == "number") {
      return response.status(400).json({
        message: "listName cannot be a number",
      });
    }

    

    const expectedKeys = new Set(["listName", "data"]);
    const actualKeys = new Set(Object.keys(newData));

    if (actualKeys.size > expectedKeys.size) {
      const extraKeys = new Set(
        [...actualKeys].filter((prop) => !expectedKeys.has(prop))
      );
      return response.status(400).json({
        message: `U cannot add :${Array.from(extraKeys)} `,
      });
    }
    count++
    data.push(newDataComplete);
    return response.status(201).json(newDataComplete);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({
        message: error.message,
      });
    }
    console.log(error);
    return response.status(500).json({
      message: "Internal server error",
    });
  }
};

const readAllList  =  (request: Request, response: Response): Response => {
  return response.json(data)
}

const readUnikList = (request: Request, response: Response): Response => {
  const findId:number = request.idList.findId

  return response.status(200).json(data[findId]);
};

const uptadeList = (request: Request, response: Response): Response => {
  const findIndex = request.listOrder.findIndex
  const dataItem = request.listOrder.dataItem
  
  
  
  const list = data[findIndex].data[dataItem]
  
 
  
  if(typeof request.body.name !== "string" || typeof request.body.quantity !== "string"  ){
    return response.status(400).json({message: "the input cannot be a number"})
  }

  if(!request.body.hasOwnProperty("quantity") || !request.body.hasOwnProperty("name")  ){
    return response.status(400).json({message: "expect input name or quantity"})
  }


  
  

  data[findIndex].data[dataItem] = { ...list, ...request.body }
  
  return response.status(200).json(data[findIndex].data[dataItem])

}

const removeAListItem = (request: Request, response: Response): Response => {
  const findIndex = request.listOrder.findIndex
  const dataItem = request.listOrder.dataItem


  data[findIndex].data.splice(dataItem, 1)

  return response.status(204).send()
};

const deleteList = (request: Request, response: Response): Response => {
  const findId:number = request.idList.findId

  data.splice(findId, 1)

  return response.status(204).send()
}

export { createListOrder, readAllList ,readUnikList, removeAListItem, deleteList, uptadeList };
