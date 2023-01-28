import * as express from 'express'

declare global {
    namespace Express {
        interface Request {
            listOrder: {
                findIndex: number,
                dataItem: number
            },
            idList: {
                findId: number
            }
        }
    }
}