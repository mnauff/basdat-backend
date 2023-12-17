import prisma from '../utils/prisma';

export const createModule = async (module_id:string,module_name: string, practicum_id: string) => {
  const module = await prisma.module.create({
    data: {
      module_id: module_id,
      module_name: module_name,
      practicum: {
        connect: {
          practicum_id: practicum_id,
        },
      },
    },
    include: {
      practicum: true,
    },
  });

  return module;
};
