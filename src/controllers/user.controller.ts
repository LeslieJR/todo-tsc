import {Request, Response} from 'express';
import models from '../models'
import jwt from 'jsonwebtoken';
import config from '../config';
import { IToken } from '../interfaces/token.interface';

export const signIn = async(req:Request, res:Response)=>{
    try{
        const { email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({err: "Email or password are missing"})
        }    
        const user = await models.user.findOne({email});
        if(!user){
            return res.json(400).json({err:"User does not exist"})
        }
        await user.comparePassword(password);
        const payload: IToken = {
            id:user._id,
            email: user.email
        }
        const token = jwt.sign(payload, config.jwt.secret,
        {
            expiresIn: "1d"
        })

        return res.status(200).json(token)
    }catch(err: any){
        return res.status(400).json({err: err.message})
    }
}

export const signUp = async(req:Request, res:Response)=>{
    try{
        const { email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({err: "Email or password are missing"})
        }    

        const user = await models.user.findOne({email});
        if(user){
            return res.json(400).json({err:"User already exists"})
        }
        const newUser = await models.user.create({email, password})
        return res.status(201).json(newUser)
    }catch(err: any){
        return res.status(400).json({err: err.message})
    }
    
}