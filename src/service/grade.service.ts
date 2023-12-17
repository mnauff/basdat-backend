import prisma from "../utils/prisma";

export const createGrade = async (student_id: string, module_id: string, grade:number) => {
    const student = await prisma.grade.create({
      data: {
        student_id: student_id,
        module_id: module_id,
        grade: grade,
      },
    });
  
    return student;
  };