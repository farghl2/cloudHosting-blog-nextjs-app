import { Article } from "@prisma/client";

//get articles base on page number
export async function getArticles (pageNumber:string | undefined):Promise<Article []>{
  const res = await fetch(`${process.env.API_URL}/articles?pageNumber=${pageNumber}`,
    {next:{revalidate:50}});
  if(!res.ok) throw new Error('faild to fetch articles')
  return await res.json();
}

//get articles count
export async function getArticlesCount ():Promise<number>{
  const res = await fetch(`${process.env.API_URL}/articles/count`);
  if(!res.ok) throw new Error('faild to fetch articles count')
  const {count} = await res.json() as {count:number}
  return count ;
}

//get articles based on search text 
export async function getArticlesBySearchText (searchText: string):Promise<Article []>{
  const res = await fetch(`${process.env.API_URL}/articles/searchArticle?searchText=${searchText}`);
  if(!res.ok) throw new Error('faild to fetch articles')
  return await res.json();
}