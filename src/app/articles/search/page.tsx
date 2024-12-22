import { getArticlesBySearchText } from '@/apiCalls/articleApiCall'
import ArticleItem from '@/components/articles/ArticleItem';
import { Article } from '@prisma/client';
import React from 'react'

interface SearchArticlePageProps {
  searchParams: {searchText:string}
}
const SearchPage = async({searchParams:{searchText}}:SearchArticlePageProps) => {
  const articles: Article [] = await getArticlesBySearchText(searchText);
  return (
    <section className="fix-height container m-auto px-5">
      {articles.length === 0?(
        <h2 className='text-gray-800 text-2xl font-bold p-5'>
          Article based on
          <span className='text-red-500 mx-1'>{searchText}</span>
          not found
        </h2>
      ):(
        <>
        <h1 className='text-2xl font-bold mb-2 mt-7 text-gray-800'>Articles based on:
        <span className='ms-1 text-green-700 text-3xl font-bold'>{searchText}</span>
      </h1>
    <div  className="flex justify-center gap-5 items-center flex-wrap my-8">
      {articles.map(article=><ArticleItem article={article} key={article.id}/>)}
    </div>
        </>
      )}
    </section>
  )
}

export default SearchPage