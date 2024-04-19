import express from 'express';
import TopicController from './../controllers/topic.controller.js';

const router = express.Router();

router.get('/:id', TopicController.getById);
router.get('/', TopicController.get);
router.post('/', TopicController.create);
router.patch('/:id', TopicController.update);
router.delete('/:id', TopicController.delete);

export default router;
