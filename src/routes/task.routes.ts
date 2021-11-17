import {Router} from 'express';
import passport from 'passport'
import controllers from '../controllers';
const router: Router = Router();

router.post('/create-task', passport.authenticate("jwt", 
{session: false}),
controllers.createTask)

router.get('/all/:user_id',passport.authenticate("jwt", 
{session: false}), controllers.getAll);

router.get('/get/:id',passport.authenticate("jwt", 
{session: false}), controllers.getTask)

router.put('/update/:id', passport.authenticate("jwt", 
{session: false}),controllers.updateTask)

router.delete('/remove/:id', passport.authenticate("jwt", 
{session: false}),controllers.deleteTask)

export default router;