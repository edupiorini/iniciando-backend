import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes'

const routes = Router();

routes.use('/appointments', appointmentsRouter);
/** aqui usamos o 'use('/appointments) da seguinte forma
 * qualquer metodo, seja ele GET, POST, ETC...
 * ja vai receber a rota /appointments caso seja chamado como
 * 'appointmentsRouter.get('/')',
 * desta forma não precisamos especificar a rota a toda chamada
 * pois ela já é recebida por appointmentsRouter
 */
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
