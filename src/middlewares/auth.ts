import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt"
import config from "../config"
import {IToken} from '../interfaces/token.interface';
import models from '../models';

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret
};

export default new Strategy(options, async(payload: IToken, done)=>{
    const user = await models.user.findById(payload.id);
    if(!user){
        return done(null, null);
    }

    return done(null, user);
})

