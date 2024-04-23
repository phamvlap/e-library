import express from 'express';
import AccountController from './../controllers/account.controller.js';

const router = express.Router();

router.get('/me', AccountController.getMe);
router.post('/login', AccountController.login);
router.post('/change-password/:id', AccountController.changePassword);
router.post('/logout', AccountController.logout);

export default router;
