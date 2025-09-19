import {z} from "zod"

/*
1>Yaha hum zod library import kar rahe hain.

2>Zod ek validation library hai jo schema banane aur 
data validate karne ke liye use hoti hai. */


export const signInSchema = z.object({
    identifier: z.string(),
    password: z.string(),
    
})