import { useEffect, useState } from "react";
import { fetchCommentsByArticleId } from "../api";
import { sqlDateFormatter } from "../utils";
import { LoadingContext } from "../contexts/LoadingContext";
import { useContext } from "react";
import Loading from "./Loading";

const Comments = ({ article_id, setRefreshComment, refreshComment }) => {
  const [commentList, setCommentList] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (refreshComment) {
      setIsLoading(true);
    }
    fetchCommentsByArticleId(article_id).then((commentList) => {
      setCommentList(commentList);
      setIsLoading(false);
      setRefreshComment(false);
    });
  }, [article_id, refreshComment]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="font-bold text-2xl pt-20">Comments</div>
          <ul className="flex flex-col items-center ">
            {commentList.length === 0 ? (
              <p className="flex flex-col desktop:w-[80vw] w-[90vw] w-10 border-solid border-2 border-sky-500 rounded-xl my-4 p-2">
                Be the first one to comment!
              </p>
            ) : (
              commentList.map((comment) => {
                return (
                  <li
                    key={comment.comment_id}
                    className="flex flex-col desktop:w-[80vw] w-[90vw] border-solid border-2 border-sky-500 rounded-xl my-4 p-2"
                  >
                    <p>
                      {comment.author} posted on{" "}
                      {sqlDateFormatter(comment.created_at)}
                    </p>
                    <br />

                    <p>"{comment.body}"</p>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default Comments;
