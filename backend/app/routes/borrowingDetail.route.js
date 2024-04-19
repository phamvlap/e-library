import express from 'express';
import BorrowingDetailController from './../controllers/borrowingDetail.controller.js';

const router = express.Router();

router.get('/', BorrowingDetailController.get);
router.post('/', BorrowingDetailController.create);
router.patch('/:id', BorrowingDetailController.update);
router.delete('/:id', BorrowingDetailController.delete);

export default router;
