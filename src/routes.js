import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ ok: true });
});

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.post('/students', authMiddleware, StudentController.store);
routes.put('/students/:id', authMiddleware, StudentController.update);

export default routes;
