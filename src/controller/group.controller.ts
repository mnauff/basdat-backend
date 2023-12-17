import express from 'express';
import { errors, success } from '../utils/generateResponse';

import { connectGroupToModule, createGroup } from "../service/group.service";
import prisma from '../utils/prisma';


export const createGroups = async (req: express.Request, res: express.Response) => {
    try {
        const { student_id, practicum_id } = req.body;
        const group = await prisma.group.findMany({
            where:{
                practicum_id:practicum_id,
            }
        })
        const group_id = `${practicum_id.split('-')[0]}-G-${String(group.length + 1).padStart(3, '0')}`;        
        const newGroup = await createGroup(group_id, student_id, practicum_id);

        res.status(200).json(success(200, 'OK', { newGroup }));
    } catch (error) {
        console.log(error);
    }
}

export const addGroupToModule = async(req:express.Request,res:express.Response)=>{
    try {
        const {group_id, assistant_id, module_id, date} = req.body

        const newGroupToModel = await connectGroupToModule(group_id, assistant_id, module_id, date)

        res.status(200).json(success(200, 'OK', { newGroupToModel }));


    } catch (error) {
        console.log(error);
        
    }
}