import { Router } from 'express';
import { createGroupController } from '../controller';
import formValidator from '../middlewares/formValidator.middleware';
import { createNewGroupSchema } from '../schemas';

const routes = Router();

routes.post('/', createGroupController);

export default routes;
