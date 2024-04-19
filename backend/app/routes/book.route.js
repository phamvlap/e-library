import express from 'express';
import BookController from './../controllers/book.controller.js';

const router = express.Router();

router.get('/:id', BookController.getById);
router.get('/', BookController.get);
router.post('/', BookController.create);
router.patch('/:id', BookController.update);
router.delete('/:id', BookController.delete);

export default router;
