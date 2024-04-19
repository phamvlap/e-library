import express from 'express';
import PublisherController from './../controllers/publisher.controller.js';

const router = express.Router();

router.get('/:id', PublisherController.getById);
router.get('/', PublisherController.get);
router.post('/', PublisherController.create);
router.patch('/:id', PublisherController.update);
router.delete('/:id', PublisherController.delete);

export default router;
