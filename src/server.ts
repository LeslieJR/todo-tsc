import express, {Express, Request, Response, urlencoded} from 'express'
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes'
import './mongodb'
const server: Express = express();
import passport from 'passport';
import auth from './middlewares/auth'

//Settings
server.set('port', 4200)

//Middlewares
server.use(cors())
server.use(morgan('dev'));
server.use(express.json())
server.use(express.urlencoded({extended: false}))
server.use(passport.initialize());
passport.use(auth); //strategy jwt

//Routes
server.get('/', (req: Request, res: Response) : Response=>{
    return res.status(200).json({msg: "Hello Typescript!"})
})
server.use('/users', routes.user);
server.use('/tasks', routes.task);
export default server;

