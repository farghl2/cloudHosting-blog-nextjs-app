export interface CreateArticeDto {
    title:string,
    description:string
}
export interface UpdateArticeDto {
    title?:string,
    description?:string
}

export interface RegisterUserDto {
    username:string,
    email:string,
    password:string
}

export interface LoginDto {
    email:string,
    password:string
}