import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { listProducts, showCreate, create, showEdit, edit, remove, detail } from '../controllers/productsController.js';

const router = Router();

router.get('/', listProducts);
router.get('/:id/detail', detail);

router.get('/create', requireAuth, showCreate);
router.post('/create', requireAuth, create);
router.get('/:id/edit', requireAuth, showEdit);
router.post('/:id/edit', requireAuth, edit);
router.get('/:id/delete', requireAuth, remove);

export default router;
