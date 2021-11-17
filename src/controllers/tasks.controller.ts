import {Request, Response} from 'express';
import models from '../models'
import {ITask} from '../models/task.models'
export const createTask = async(req:Request, res:Response)=>{
    try{
        const { title, description, user_id} = req.body;
        if(!title || !description ||!user_id){
            return res.status(400).json({err: "Required fields are missing"})
        }    
        const user = await models.user.findById(user_id);
        if(!user){
            return res.status(400).json({err: 'This user does not exist'})
        }
        const task = await models.task.create({title, description, user})
        return res.status(201).json(task)
    }catch(err: any){
        return res.status(400).json({err: err.message})
    }
}

export const updateTask = async(req:Request, res:Response)=>{
    try{
        const task_id = req.params.id
        const { title, description, ready} = req.body;
        
        //if(!title || !description ||!ready){
        if(!title || !description ||(!ready && ready !== false)){
            return res.status(400).json({err: "Required fields are missing"})
        } 
        const task: ITask | null = await models.task.findById(task_id);
        if(!task){
            return res.status(400).json({err: 'This task does not exist'})
        }
        task.title = title
        task.description = description;
        task.ready = ready;
        await task.save();
        return res.status(200).json(task)   
        
    }catch(err: any){
        return res.status(400).json({err: err.message})
    }
}

export const deleteTask = async(req:Request, res:Response)=>{
    try{
        const task_id = req.params.id;
        const {user_id} = req.body;
        if(!user_id || !task_id){
            return res.status(400).json({err: "Bad request"})
        }
        await models.task.findByIdAndRemove(task_id);
        const user = await models.user.findById(user_id);
        if(!user){
            return res.status(400).json({err:"Bad Request"})
        }
        const tasks = await models.task.find({user})
        return res.status(200).json(tasks)
    }catch(err: any){
        return res.status(400).json({err: err.message})
    }
}

export const getAll = async(req:Request, res:Response)=>{
    try{
        const {user_id} = req.params;
        const user = await models.user.findById(user_id);
        if(!user){
            return res.status(400).json({err: 'This user does not exist'})
        }
        const tasks = await models.task.find({user});
        return res.status(201).json(tasks)
    }catch(err: any){
        return res.status(400).json({err: err.message})
    }
    
}

export const getTask = async(req:Request, res:Response)=>{
    try{
        const task_id = req.params.id;
        const task: ITask | null = await models.task.findById(task_id);
        if(task === null){
            return res.status(400).json({err: 'This task does not exist'})
        }
        return res.status(201).json(task)
    }catch(err: any){
        return res.status(400).json({err: err.message})
    }
    
}

