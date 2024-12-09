import { Request, Response, NextFunction } from "express";

export class TestController {
    static async health(req: Request, res: Response, next: NextFunction) {
        res.status(200).send("OK");
    }
}