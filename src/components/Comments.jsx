import { useEffect, useState } from "react";
import { fetchCommentsByArticleId } from "../api";
import { sqlDateFormatter } from "../utils";
import HourglassBottomTwoToneIcon from "@mui/icons-material/HourglassBottomTwoTone";
import { LoadingContext } from "./contexts/LoadingContext";
import { useContext } from "react";

const Comments = ({ article_id }) => {
  const [commentList, setCommentList] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  console.log(isLoading);

  useEffect(() => {
    setIsLoading(true);
    fetchCommentsByArticleId(article_id).then((commentList) => {
      setCommentList(commentList);
      setIsLoading(false);
    });
  }, [article_id]);

  if (isLoading)
    return (
      <p>
        <HourglassBottomTwoToneIcon className="animate-pulse" />
        Loading comments...
      </p>
    );

  return (
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
  );
};

export default Comments;
