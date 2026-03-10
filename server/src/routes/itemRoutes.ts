import { Router } from 'express';

import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} from '../controllers/itemController';
import authenticateUser from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getItems);
router.get('/:id', getItemById);
router.post('/', authenticateUser, createItem);
router.put('/:id', authenticateUser, updateItem);
router.delete('/:id', authenticateUser, deleteItem);

export default router;
