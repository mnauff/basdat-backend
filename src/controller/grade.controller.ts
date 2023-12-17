import express from 'express';
import { errors, success } from '../utils/generateResponse';
import { createGrade } from '../service/grade.service';

export const addGrade = async (req: express.Request, res: express.Response) => {
    try {
      const { student_id, module_id, grade} = req.body;
  
      const newAssistant = await createGrade(student_id, module_id, grade);
  
      res.status(200).json(success(200, 'OK', { newAssistant }));
    } catch (error) {
      console.log(error);
    }
  };