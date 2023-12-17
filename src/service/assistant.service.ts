import prisma from "../utils/prisma";

export const createAssistant = async (assistant_name: string, assistant_id: string) => {
    const assistant = await prisma.assistant.create({
      data: {
        assistant_name: assistant_name,
        assistant_id: assistant_id,
        account: {
          create: {
            user_id: assistant_id,
            is_verified: false,
            role: 'ASSISTANT',
          },
        },
      },
    });
  
    return assistant;
  };
  export const createAssistantPracticum = async (practicum_id: string, asistant_practicum_id: string, assistant_id:string) => {
    const assistantPracticum = await prisma.assistantPracticum.create({
      data: {
        asistant_practicum_id:asistant_practicum_id,
        practicum:{
          connect:{
            practicum_id:practicum_id
          },
        },
        assistant:{
          connect:{
            assistant_id:assistant_id,
          }
        }
      },
      include: {
        assistant: true,
        practicum: true,
      },
    });
  
    return assistantPracticum;
  };
  
  