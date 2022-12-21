import { Router } from 'express';
import OpenAIRoutes from '@app/openai/routes';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/openai', OpenAIRoutes.router);
router.use('/', (_req, res) => {
	res.status(200).send({ message: 'OpenAI API, powered by Xplorai'});
});

// Export the base-router
export default router;
