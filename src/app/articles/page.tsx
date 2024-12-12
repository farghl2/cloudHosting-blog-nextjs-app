import ArticleItem from "@/components/articles/ArticleItem";
import Pagination from "@/components/articles/Pagination";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import { Article } from "@/utils/types";

const ArticlesPage = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts",
    {next:{revalidate:50}});
  if(!res.ok) throw new Error('faild to fetch articles')
  const articles: Article[] = await res.json();

  return (
    <section className="fix-height container m-auto px-5">
      <SearchArticleInput />
      <div className="flex justify-center gap-5 items-center flex-wrap my-8">
        {articles.slice(0, 6).map((item) => (
          <ArticleItem article={item} key={item.id} />
        ))}
      </div>
      <Pagination />
    </section>
  );
};

export default ArticlesPage;
