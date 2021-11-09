import {Router} from 'express';
import controllers from '../controllers';
const router: Router = Router();

router.post('/sign-in', controllers.signIn);
router.post('/sign-up', controllers.signUp);


export default router;
