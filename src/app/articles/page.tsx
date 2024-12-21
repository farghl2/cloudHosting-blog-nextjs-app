import { getArticles, getArticlesCount } from "@/apiCalls/articleApiCall";
import ArticleItem from "@/components/articles/ArticleItem";
import Pagination from "@/components/articles/Pagination";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import { ARTICLES_PER_PAGE } from "@/utils/constants";
import { Article } from "@prisma/client";

interface ArticlePageProps {
  searchParams:{pageNumber:string}
}

const ArticlesPage = async ({searchParams}:ArticlePageProps) => {
  const {pageNumber} = searchParams
  
  const articles:Article [] = await getArticles(pageNumber);
  const count:number =await getArticlesCount();
  const pages =Math.ceil(count /ARTICLES_PER_PAGE);
  return (
    <section className="fix-height container m-auto px-5">
      <SearchArticleInput />
      <div className="flex justify-center gap-5 items-center flex-wrap my-8">
        {articles.map((item) => (
          <ArticleItem article={item} key={item.id} />
        ))}
      </div>
      <Pagination pageNumber={+pageNumber} pages={pages}  route="/articles" />
    </section>
  );
};

export default ArticlesPage;
