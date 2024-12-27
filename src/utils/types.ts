import {Article , Comment, User} from '@prisma/client'
  export type decodeUser ={
    id:string,
    email: string,
    username:string,
    isAdmin:boolean
  }

  export type CommentWithUser = Comment &{user: User};
export type SingleArticle = Article & {comments: CommentWithUser []};