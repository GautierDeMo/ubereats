// Légère explication de express
import express, { NextFunction } from "express";

const middleware = (req: Request, res: Response, next: NextFunction) => {}
const middlewareError = (error: Error, req: Request, res: Response, next: NextFunction) => {}
