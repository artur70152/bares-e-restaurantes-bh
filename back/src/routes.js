import {Router}from 'express'
//import User from './app/models/users';
import Sessioncontroller from './app/controllers/sessioncontroller';
import authMiddleware from './app/midlewares/auth';
import placescontroller from './app/controllers/placescontroller';
import Usercontroller from './app/controllers/usercontroller';
//import Signscontroler from './app/controlers/signscontroler';


const routes=new Router();

routes.post('/users',Usercontroller.store)
routes.post('/sessions',Sessioncontroller.store)
routes.use(authMiddleware)
routes.post('/sessions',Sessioncontroller.store)
routes.post('/dashboard',placescontroller.addplace)
routes.get('/dashboard',placescontroller.index)
routes.put('/dashboard',placescontroller.updateplace)
routes.get('/dashboard2',placescontroller.index2)
export default routes