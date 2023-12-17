import prisma from '../utils/prisma';

export const getPracticum = async (
  page?: string,
  limit?: string,
  sort: string = 'practicum_name',
  query?: string,
  asc: boolean = true
) => {
    const parsedLimit = limit ? parseInt(limit) : 5;
    const parsedPage = page ? parseInt(page) : 1;

  const practicums = await prisma.practicum.findMany({
    take: parsedLimit || 5,
    skip: (parsedPage ? parsedPage - 1 : 0) * (parsedLimit || 5),
    orderBy: {
      [sort]: asc ?  "asc" : "desc",
    },
    where: {
      OR: [
        {
          practicum_name: {
            contains: query || '',
            mode: 'insensitive',
          },
        },
        {
          place: {
            contains: query || '',
            mode: 'insensitive',
          },
        },
      ],
    },
  });

  return practicums
};


export const getPracticumByID = async (practicum_id: string) => {
    const practicum = await prisma.practicum.findUnique({
      where: {
        practicum_id: practicum_id,
      },
    });
  
    
    return practicum;
  };
  
  export const createPracticum = async (practicum_id:string,practicum_name: string, place: string, start_date: Date, end_date: Date) => {
    const practicum = await prisma.practicum.create({
      data: {
        practicum_id: practicum_id,
        practicum_name: practicum_name,
        place: place,
        start_date: start_date,
        end_date: end_date,
      },
    });
  
    return practicum;
  };
  