import express from 'express';
import {
  createStudentWithAccount,
  getAllStudent,
  getStudentByID,
} from '../service/student.service';
import { errors, success } from '../utils/generateResponse';

export const AddStudent = async (req: express.Request, res: express.Response) => {
  try {
    const { name, student_id } = req.body;

    if (!name || !student_id) {
      res
        .status(400)
        .json(errors(400, 'BAD_REQUEST', ['name is required', 'student_id is required']));
    }

    const existingStudent = await getStudentByID(student_id);

    if (existingStudent) {
      res.status(400).json(errors(400, 'BAD_REQUEST', ['Student is already existed']));
    }

    const student = await createStudentWithAccount(name, student_id);

    res.status(200).json(success(200, 'OK', { student }));
  } catch (error) {
    console.log(error);
  }
};

export const getStudent = async (req: express.Request, res: express.Response) => {
  try {
    const { page, search, limit, sort, asc } = req.query;

    const students = await getAllStudent(
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



