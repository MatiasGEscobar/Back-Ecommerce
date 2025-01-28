import { NextFunction, Request, Response } from "express";


export function LoggerGlobal(req:Request, res:Response, Next:NextFunction){
    const requestTime = new Date();
    console.log(`la ruta es ${req.url}, el metodo ${req.method} y la fecha y hora llamado al endpoint es ${requestTime}`)
    Next();
}