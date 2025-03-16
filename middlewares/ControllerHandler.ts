import { Request, Response, NextFunction } from "express";
export const createControllerHandlerFor =
    (controllerFunction: Function) =>
        async (request: Request, response: Response, next: NextFunction) => {
            try {
                const result = await controllerFunction(request, response);
                if ((result as any)?.errorCode) next(result);
                else response.send(result);
            } catch (e) {
                next(e);
            }
        };
