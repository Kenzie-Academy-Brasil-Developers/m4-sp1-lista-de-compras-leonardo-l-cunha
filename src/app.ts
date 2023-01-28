import express, { Application, Request, Response } from "express";
import { data } from "./dataBase";
import { createListOrder, deleteList, readUnikList, removeAListItem, uptadeList } from "./logic";

const app: Application = express()
app.use(express.json())


app.post("/purchaseList", createListOrder )

app.get("/purchaseList", (request: Request, response: Response): Response => {
    return response.json(data)
})
app.get("/purchaseList/:id", readUnikList )

app.patch("/purchaseList/:id/:listName",uptadeList)

app.delete("/purchaseList/:id/:listName",removeAListItem)

app.delete("/purchaseList/:id", deleteList)

app.listen(3000, () => {
    return console.log("App is running")
})