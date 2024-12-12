import AddCommentForm from "@/components/comments/AddCommentForm";
import CommentItem from "@/components/comments/CommentItem";
import { Article } from "@/utils/types";

type SingleArticlePageProps = {
  params: { id: string };
};
const SingleArticlePage = async ({ params }: SingleArticlePageProps) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const article: Article = await res.json();

  return (
    <section className="fix-height  container m-auto flex justify-center px-5 pt-8 md:w-3/4">
      <div className="flex flex-col gap-4 w-2/4 p-7 rounded-lg bg-white mb-4">
        <h2 className="text-3xl font-bold text-gray-700">{article.title}</h2>
        <div className="text-gray-400">1/1/2024</div>
        <p className="text-gray-800 text-xl">{article.body}</p>
      </div>
      <AddCommentForm />
      <h4 className="text-xl text-gray-800 ps-1 font-semibold mb-2 mt-7">
        Comments
      </h4>
      <CommentItem />
      <CommentItem />
      <CommentItem />
    </section>
  );
};

export default SingleArticlePage;
