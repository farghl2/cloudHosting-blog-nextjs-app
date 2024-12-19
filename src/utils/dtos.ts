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

export interface UpdatedUserDto {
    email?:string,
    password?:string,
    username?:string
}

export interface CreateCommentDto {
    articleId: string,
    userId: string,
    text: string
}

export interface UpdateCommentDto {
    text?:string
}