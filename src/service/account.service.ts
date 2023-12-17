import prisma from '../utils/prisma';

export enum ROLES {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  ASSISTANT = 'ASSISTANT',
}

export const createAccount = async (user_id: string, role: ROLES) => {
    const account = await prisma.account.create({
        data: {
          user_id: user_id,
          role: role,
          is_verified: false,
        },
      });

  return account;
};

export const getAccountByUserId = async (user_id: string)=>{
  const account = await prisma.account.findUnique({
    where:{
      user_id: user_id,
    },
    include:{
      assistant: true,
      student: true,
    }
  })

  return account
}

export const updateEmailPasswords = async (user_id: string, email:string,password: string) =>{
  const user = await prisma.account.update({
    where:{
      user_id:user_id,
    },
    data:{
      email:email,
      password:password
    },
    select:{
      email:true,
    }
  })

  return user
}

export const addRefreshToken = async (user_id: string, token: string) =>{
  const user = await prisma.account.update({
    where:{
      user_id:user_id,
    },
    data:{
      refresh_token:token,
    },
  })

  return user
}