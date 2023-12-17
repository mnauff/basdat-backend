import express from 'express';
import { errors, success } from '../utils/generateResponse';
import { createModule } from '../service/module.service';
import prisma from '../utils/prisma';

export const addModule = async (req: express.Request, res: express.Response) => {
  try {
    const { module_name, practicum_id } = req.body;
    const module = await prisma.module.findMany({
      where:{
        practicum_id: practicum_id
      }
    })
    const module_id = `${practicum_id.split('-')[0]}-M-${String(module.length + 1).padStart(3, '0')}`;    
    const newAssistant = await createModule(module_id,module_name, practicum_id);

    res.status(200).json(success(200, 'OK', { newAssistant }));
  } catch (error) {
    console.log(error);
  }
};
