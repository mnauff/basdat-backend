import express from 'express';
import { errors, success } from '../utils/generateResponse';
import { createPracticum, getPracticum, getPracticumByID } from '../service/practicum.service';

export const AddPracticum = async (req: express.Request, res: express.Response) => {
    try {
      const { practicum_id,practicum_name, place, start_date,end_date } = req.body;
  
      if (!practicum_name||!place||!start_date||!end_date) {
        res
          .status(400)
          .json(errors(400, 'BAD_REQUEST', ['practicum_name is required', 'place is required', 'start_date is required', 'end_date is required']));
      }
  
      const practicum = await createPracticum(practicum_id,practicum_name, place, start_date,end_date);
  
      res.status(200).json(success(200, 'OK', { practicum }));
    } catch (error) {
      console.log(error);
    }
  };

  export const getAllPracticum = async (req: express.Request, res: express.Response) => {
    try {
      const { page, search, limit, sort, asc } = req.query;
  
      const students = await getPracticum(
        page?.toString(),
        limit?.toString(),
        sort?.toString(),
        search?.toString(),
        asc ? asc === 'true' : undefined
      );
      res.status(200).json(success(200, 'OK', { students }));
    } catch (error) {
      console.log(error);
    }
  };
  