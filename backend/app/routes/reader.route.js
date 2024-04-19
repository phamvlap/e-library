import express from 'express';
import ReaderController from './../controllers/reader.controller.js';

const router = express.Router();

router.get('/:id', ReaderController.getById);
router.get('/', ReaderController.get);
router.post('/', ReaderController.register);
router.patch('/:id', ReaderController.update);
router.delete('/:id', ReaderController.delete);

export default router;
