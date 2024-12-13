import {z} from 'zod'

export const createArticleSchema = z.object({
    title:z.string(
        {
            required_error:'title is reuired',
            invalid_type_error:'tite should be of type string'
        }
    ).min(2).max(200),
    description:z.string().min(10)
})

export const CreateUserSchema = z.object({
    username: z.string().min(2).max(100),
    email: z.string().email(),
    password:z.string().min(6).max(32)
})
export const LoginSchema = z.object({
    email: z.string().email(),
    password:z.string().min(6).max(32)
})