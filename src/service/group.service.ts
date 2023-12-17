import prisma from "../utils/prisma"



export const createGroup =async (group_id:string,student_id:string[], practicum_id: string) => {
    const group = await prisma.group.create({
        data:{
            group_id: group_id,
            practicum_id: practicum_id,
            student:{
                connect:student_id.map((studentId) => ({ student_id: studentId })),
            }
        },
        include: {
            student: true, 
            practicum: true
          },
    })

    return group
}

export const connectGroupToModule = async (group_id:string, assistant_id:string, module_id:string, date:Date) =>{
    const groupToModel = await prisma.groupToModule.create({
        data:{
            assistant:{
                connect:{
                    asistant_practicum_id:assistant_id
                }
            },
            group:{
                connect:{
                    group_id: group_id,
                }
            },
            modules:{
                connect:{
                    module_id: module_id,
                }
            },
            date: date
        },
        include: {
            assistant:true,
            group:true,
            modules:true,
          },
    })

    return groupToModel
}