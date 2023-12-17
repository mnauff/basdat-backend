import prisma from "../utils/prisma";

export const getAllStudent = async (
  page?: string,
  limit?: string,
  sort: string = 'name',
  query?: string,
  asc: boolean = true
) => {
  const parsedLimit = limit ? parseInt(limit) : 5;
  const parsedPage = page ? parseInt(page) : 1;

  const students = await prisma.student.findMany({
    take: parsedLimit || 5,
    skip: (parsedPage ? parsedPage - 1 : 0) * (parsedLimit || 5),
    orderBy: {
      [sort]: asc ?  "asc" : "desc",
    },
    where: {
      OR: [
        {
          student_id: {
            contains: query || "",
            mode: "insensitive",
          },
        },
        {
          name: {
            contains: query || "",
            mode: "insensitive",
          },
        },
      ],
    },
    include:{
      group:true
    }
  });
  return students;
};

export const getStudentByID = async (student_id: string) => {
  const student = await prisma.student.findUnique({
    where: {
      student_id: student_id,
    },
  });

  
  return student;
};

export const createStudentWithAccount = async (name: string, student_id: string) => {

  const student = await prisma.student.create({
    data: {
      student_id: student_id,
      name: name,
      account: {
        create: {
          user_id: student_id,
          is_verified: false,
          role: 'STUDENT',
        },
      },
    },
    include: {
      account: true,
      group: false,
    },
  });

  return student;
};

