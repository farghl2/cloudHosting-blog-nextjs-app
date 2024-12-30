

import { getSingleArticle } from "@/apiCalls/articleApiCall";
import AddCommentForm from "@/components/comments/AddCommentForm";
import CommentItem from "@/components/comments/CommentItem";

import { SingleArticle } from "@/utils/types";
import { verifyTokenForPages } from "@/utils/verifyToken";
import { cookies } from "next/headers";



type SingleArticlePageProps = {
  params: { id: string };
};
const SingleArticlePage = async ({ params }: SingleArticlePageProps) => {
  const jwtToken = cookies().get('jwtToken')?.value || ' ';
  const payload = verifyTokenForPages(jwtToken);

 

  const article: SingleArticle = await getSingleArticle(params.id)

  return (
    <section className="fix-height  container m-auto flex flex-col justify-center px-5 pt-8 md:w-3/4">
      <div className="flex flex-col gap-4 w-2/4 p-7 rounded-lg bg-white mb-4">
        <h2 className="text-3xl font-bold text-gray-700">{article.title}</h2>
        <div className="text-gray-400">{new Date(article.createdAt).toDateString()}</div>
        <p className="text-gray-800 text-xl">{article.description}</p>
      </div>
      <div className="mt-7">
        {payload?(
          <AddCommentForm articleId={article.id}/>

        ):(
          <p className="text-blue-700 md:text-xl">You must login to add comment</p>
        )}
      </div>
      <h4 className="text-xl text-gray-800 ps-1 font-semibold mb-2 mt-7">
        Comments
      </h4>
      {article.comments.map(comment=>
      <CommentItem 
      userId={payload?.id || ''}
      isAdmin={payload?.isAdmin ||false}
      key={comment.id} articleComment={comment}/>

      )}
      
      
    </section>
  );
};

export default SingleArticlePage;
