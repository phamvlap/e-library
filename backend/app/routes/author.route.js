import express from 'express';
import AuthorController from './../controllers/author.controller.js';

const router = express.Router();

router.get('/:id', AuthorController.getById);
router.get('/', AuthorController.get);
router.post('/', AuthorController.create);
router.patch('/:id', AuthorController.update);
router.delete('/:id', AuthorController.delete);

export default router;
