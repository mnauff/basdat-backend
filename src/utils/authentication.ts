import argon2 from 'argon2'

export const hashPassword = ( password:string) =>{
    return argon2.hash(password)
}

