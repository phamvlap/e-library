import express from 'express';
import StaffController from './../controllers/staff.controller.js';

const router = express.Router();

router.get('/:id', StaffController.getById);
router.get('/', StaffController.get);
router.post('/', StaffController.create);
router.patch('/:id', StaffController.update);
router.delete('/:id', StaffController.delete);

export default router;
