import {  createAssistant, createAssistantPracticum } from './../service/assistant.service';
import express from 'express';
import { errors, success } from '../utils/generateResponse';
import prisma from '../utils/prisma';

export const addAssistant = async(req:express.Request,res:express.Response)=>{
    try {
        const {assistant_name, assistant_id} = req.body

        const newAssistant = await createAssistant(assistant_name, assistant_id)

        res.status(200).json(success(200, 'OK', { newAssistant }));


    } catch (error) {
        console.log(error);
        
    }
}

export const addAssistantPracticum = async(req:express.Request,res:express.Response)=>{
    try {
        const {assistant_id, practicum_id} = req.body
        const assistant_practicum = await prisma.assistantPracticum.findMany({
            where:{
              practicum_id: practicum_id
            }
          })
          const assistant_practicum_id = `${practicum_id.split('-')[0]}-A-${String(assistant_practicum.length + 1).padStart(3, '0')}`; 
        const newAssistant = await createAssistantPracticum(practicum_id,assistant_practicum_id, assistant_id)

        res.status(200).json(success(200, 'OK', { newAssistant }));


    } catch (error) {
        console.log(error);
        
    }
}
