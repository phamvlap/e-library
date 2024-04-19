import express from 'express';
import AccountController from './../controllers/account.controller.js';

const router = express.Router();

router.post('/login', AccountController.login);
router.post('/change-password/:id', AccountController.changePassword);

export default router;
