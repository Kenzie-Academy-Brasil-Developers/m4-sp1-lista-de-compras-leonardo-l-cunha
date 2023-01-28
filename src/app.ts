import express, { Application, Request, Response } from "express";
import { data } from "./dataBase";
import { createListOrder, deleteList, readAllList, readUnikList, removeAListItem, uptadeList } from "./logic";
import { ensureListOrdeExist, unikEnsureId } from "./middlewares";

const app: Application = express()
app.use(express.json())


app.post("/purchaseList", createListOrder )

app.get("/purchaseList",readAllList)

app.get("/purchaseList/:id", unikEnsureId, readUnikList )

app.patch("/purchaseList/:id/:listName",ensureListOrdeExist,uptadeList)

app.delete("/purchaseList/:id/:listName",ensureListOrdeExist,removeAListItem)

app.delete("/purchaseList/:id",unikEnsureId, deleteList)

app.listen(3000, () => {
    return console.log("App is running")
})