import Link from "next/link";

interface PaginationProps {
  pageNumber: number;
  route: string;
  pages: number;
}
const Pagination = ({ pageNumber, pages, route }: PaginationProps) => {
  const articlePage: number[] = [];
  for (let i = 1; i <= pages; i++) {
    articlePage.push(i);
  }
  const prev = pageNumber - 1;
  const next = pageNumber + 1;
  return (
    <div className=" flex items-center justify-center mt-2 mb-10 ">
      {pageNumber !== 1 && (
        <Link
          href={`${route}?pageNumber=${prev}`}
          className="border border-gray-700 text-gray-700 py-1 px-3
text-xl cursor-pointer hover:bg-gray-200 transition"
        >
          Prv
        </Link>
      )}
      {articlePage.map((page) => (
        <Link
          href={`{route}?pageNumber`}
          className={`${pageNumber === page? 'bg-gray-400':''} border border-gray-700 text-gray-700 py-1 px-2
            text-xl cursor-pointer hover:bg-gray-200 transition`}
          key={page}
        >
          {page}
        </Link>
      ))}
      {pageNumber !== pages && (
        <Link
          href={`${route}?pageNumber=${next}`}
          className="border border-gray-700 text-gray-700 py-1 px-3
        text-xl cursor-pointer hover:bg-gray-200 transition"
        >
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
