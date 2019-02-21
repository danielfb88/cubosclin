import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import * as HTTPStatus from 'http-status';

class Handlers {

    onSuccess(res: Response, data: any) {
        res.status(HTTPStatus.OK).json({ payload: data });
    }

    onError(res: Response, message: string, err: any) {
        console.log(`Error: ${err}`);
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(message);
    }

    errorHandlerApi(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
        console.error(`API error handler foi executada: ${err}`);
        res.status(500).json({
            errorCode: 'ERR-001',
            message: 'Erro interno do Servidor'
        });
    }

}

export default new Handlers();