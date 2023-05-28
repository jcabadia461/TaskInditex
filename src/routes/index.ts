import { Request, Response, Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import yamljs from 'yamljs';
import taskRoutes from '../modules/tasks/tasks.routes';
import { trimmer } from '../common/middlewares/trimmer';

const router = Router();

router.use(trimmer);

// Openapi
router.use('/docs', swaggerUi.serve);
router.get('/docs', (req: Request, res: Response) => {
  return res.send(swaggerUi.generateHTML(yamljs.load(`./docs/inditex_1.0.0.yaml`)));
});

// Tasks
router.use('/task', taskRoutes);

export default router;
