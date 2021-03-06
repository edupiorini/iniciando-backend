import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload{
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request, 
    response: Response, 
    next: NextFunction)
    : void {
        //validação do token JWT

        const authHeader = request.headers.authorization;

        if(!authHeader){
            throw new Error("JWT token is missing");
        }

        // vamos separar o formato do header 'Bearer hghsjkgjh'

        const [, token] = authHeader.split(' ');
        //estamos dividindo o formato acima através do espaço ' ' e atribuindo
        //à constante token
        //a primeira parte foi atribuida a nada, por isso a virgula no inicio

        try {
            const decoded = verify(token, authConfig.jwt.secret);

            const { sub } = decoded as TokenPayload;

            request.user = {
                id: sub,
            }
            console.log(decoded);
            return next();
        } catch (err) {
            throw new Error('Invalid JWT token.');
        }

}