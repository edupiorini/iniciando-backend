import { Router } from 'express';
/**
 * Funções da Rota:
 *
 *  Receber aquisição;
 *  Chamar outro arquivo;
 *  Devolver uma resposta.
 *
 * O que for alem disso, deve estar em outro lugar
 * */

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    try {

        const {email, password} = request.body;
        
        const authenticateUser = new AuthenticateUserService();
         
       const { user, token } = await authenticateUser.execute({
            email,
            password,
        })

        delete user.password;
        
        return response.json({ user, token });
    
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
export default sessionsRouter;