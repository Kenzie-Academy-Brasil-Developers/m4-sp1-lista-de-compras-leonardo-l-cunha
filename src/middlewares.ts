import { Request, Response, NextFunction } from "express"
import { data } from "./dataBase";
const ensureListOrdeExist = ( request:Request , response :Response, next :NextFunction) :Response | void => {

    const id: number = parseInt(request.params.id);
    const name: string = request.params.listName

    const findIndex = data.findIndex((ele) => ele.id === id);
    
    if (findIndex === -1) {
        return response.status(404).json({message: "List not found!"});
    }
  
    const dataItem = data[findIndex].data.findIndex((ele => ele.name === name))
 
    if (dataItem === -1) {
        return response.status(404).json({message: "Item not found!"})
    }

    request.listOrder = {
        findIndex: findIndex,
        dataItem: dataItem
    }

    return next()
}

const unikEnsureId = ( request:Request , response :Response, next :NextFunction) :Response | void => {
    const id: number = parseInt(request.params.id);
    const findId = data.findIndex((ele) => ele.id === id);

    if (findId === -1) {
        return response.status(404).json({message: "List not found!"});
    }
    request.idList = {
        findId: findId
    }
    return next()
}
export {ensureListOrdeExist,unikEnsureId}