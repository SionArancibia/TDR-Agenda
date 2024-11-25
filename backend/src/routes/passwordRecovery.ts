import { Router } from 'express';
import { passwordRecovery, resetPassword, resetPasswordMobile,  changePasswordMobile, postChangePasswordMobile } from '../controllers/passwordRecoveryController';

const router = Router();

router.post('/passwordRecovery', passwordRecovery);
router.post('/resetPassword', resetPassword);
router.post('/reset-password-mobile', resetPasswordMobile);
router.get('/change-password-mobile/:token', changePasswordMobile); // get
router.post('/change-password-mobile', postChangePasswordMobile); // post


export default router;