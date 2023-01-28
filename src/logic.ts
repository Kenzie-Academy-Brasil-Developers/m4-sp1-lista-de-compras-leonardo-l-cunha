import { Request, Response } from "express";
import { data } from "./dataBase";
import { iBuyList, iId, ItemOrderKeys, ListOrderKeys } from "./interfaces";

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
    const id: number = count++;

    const newDataComplete: iId = {
      id: id,
      ...newData,
    };
    data.push(newDataComplete);

    if (parseInt(newDataComplete.listName)) {
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

const readUnikList = (request: Request, response: Response): Response => {
  const id: number = parseInt(request.params.id);

  const findIndex = data.findIndex((ele) => ele.id === id);

  if (findIndex === -1) {
    return response.status(404).json({
      message: "List not found!",
    });
  }

  return response.status(200).json(data[findIndex]);
};

const uptadeList = (request: Request, response: Response): Response => {
  const id: number = parseInt(request.params.id)
  const name: string = request.params.listName
  

  const findIndex = data.findIndex((ele) => ele.id === id);

  if (findIndex === -1) {
    return response.status(404).json({
      message: "not found!",
    });
  }

  const dataItem = data[findIndex].data.findIndex((ele => ele.name === name))
 
  if (dataItem === -1) {
    return response.status(404).json({
      message: "Item not found!"
    })
  }

  
  
  
  const list = data[findIndex].data[dataItem]
  
  



  if(typeof request.body.quantity === "number" || request.body.quantity === "number"){
    return response.status(400).json({message: "nao pode numeros"})
  }
  
  if(!request.body.hasOwnProperty("quantity") || !request.body.hasOwnProperty("name")  ){
    return response.status(400).json({message: "expect input name or quantity"})
  }
  
  

  data[findIndex].data[dataItem] = { ...list, ...request.body }
  
  return response.status(200).json(data[findIndex].data[dataItem])

}

const removeAListItem = (request: Request, response: Response): Response => {
  const id: number = parseInt(request.params.id)
  const name: string = request.params.listName

  const findIndex = data.findIndex((ele) => ele.id === id);

  if (findIndex === -1) {
    return response.status(404).json({
      message: "not found!",
    });
  }
  const dataItem = data[findIndex].data.findIndex((ele => ele.name === name))
  console.log(dataItem)
  if (dataItem === -1) {
    return response.status(404).json({
      message: "Item not found!"
    })
  }


  data[findIndex].data.splice(dataItem, 1)

  return response.status(204).send()
};

const deleteList = (request: Request, response: Response): Response => {
  const id: number = parseInt(request.params.id)

  const findIndex = data.findIndex((ele) => ele.id === id);

  if (findIndex === -1) {
    return response.status(404).json({
      message: "List not found!",
    });
  }

  data.splice(findIndex, 1)

  return response.status(204).send()
}

export { createListOrder, readUnikList, removeAListItem, deleteList, uptadeList };
