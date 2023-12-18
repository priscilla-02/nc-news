import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { LoadingContext } from "../contexts/LoadingContext";
import Loading from "./Loading";
import { deleteComment, fetchCommentsByArticleId } from "../api";
import { sqlDateFormatter } from "../utils";
import Button from "@mui/material/Button";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

const deletedObj = {
  default: "default",
  completedDelete: "completedDelete",
  inProgress: "inProgress",
  failed: "unsuccessful",
};

const Comments = ({ article_id, setRefreshComment, refreshComment }) => {
  const [commentList, setCommentList] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { user } = useContext(UserContext);
  const [deleteCurrentComment, setDeleteCurrentComment] = useState(null);
  const [deletedBol, setDeletedBol] = useState(deletedObj.default);
  const { isDarkMode } = useContext(DarkModeContext);

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

  const handleDeleteComment = async (comment_id) => {
    setDeleteCurrentComment(comment_id);
    setDeletedBol(deletedObj.inProgress);

    try {
      const result = await deleteComment(comment_id);

      if (result && result.status === 204) {
        setTimeout(() => {
          setDeletedBol(deletedObj.completedDelete);
        }, 2000);

        setTimeout(() => {
          setRefreshComment(true);
        }, 3000);
      }
    } catch (error) {
      setDeletedBol(deletedObj.failed);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div
            className={`font-bold text-3xl pt-20 italic  ${
              isDarkMode ? "text-secondary" : "text-primary"
            }`}
          >
            Comments
          </div>
          <ul
            className={`flex flex-wrap justify-center items-center slide-right`}
          >
            {commentList.length === 0 ? (
              <p
                className={`flex flex-col desktop:w-[80vw] w-[90vw] w-10 border-solid border-2 rounded-xl my-4 p-2 ${
                  isDarkMode
                    ? "border-secondary text-secondary"
                    : "border-primary text-primary"
                }`}
              >
                Be the first one to comment!
              </p>
            ) : (
              commentList.map((comment) => {
                return (
                  <li
                    key={comment.comment_id}
                    className={`flex flex-col desktop:w-[40vw] min-h-[250px] w-[90vw] border-solid border-2 rounded-xl m-4 px-3 justify-center items-center ${
                      isDarkMode
                        ? "border-secondary text-secondary"
                        : "border-primary text-black"
                    }`}
                  >
                    <p
                      className={`${
                        isDarkMode ? "text-secondary" : "text-primary"
                      }`}
                    >
                      {comment.author} posted on{" "}
                      {sqlDateFormatter(comment.created_at)}
                    </p>
                    <br />

                    <p
                      className={`${
                        isDarkMode ? "text-secondary" : "text-primary"
                      }`}
                    >
                      "{comment.body}"
                    </p>
                    <div
                      className={
                        user && user.username === comment.author
                          ? "block pt-2"
                          : "hidden"
                      }
                    >
                      <Button
                        variant="outlined"
                        className="cursor-pointer"
                        onClick={() => handleDeleteComment(comment.comment_id)}
                        style={{
                          borderColor: isDarkMode ? "#fff" : "#0284C7",
                        }}
                      >
                        <DeleteForeverRoundedIcon
                          style={{
                            color: isDarkMode ? "#fff" : "#0284C7",
                          }}
                        />
                        <span
                          className={`${
                            isDarkMode ? "text-secondary" : "text-primary"
                          }`}
                        >
                          Delete
                        </span>
                      </Button>
                      <div
                        className={`${
                          deletedBol === deletedObj.inProgress
                            ? "text-emerald-500"
                            : deletedBol === deletedObj.failed
                            ? "text-red-700"
                            : "text-gray-700"
                        }`}
                      >
                        {comment.comment_id === deleteCurrentComment &&
                        deletedBol === deletedObj.inProgress
                          ? "Deleting..."
                          : comment.comment_id === deleteCurrentComment &&
                            deletedBol === deletedObj.completedDelete
                          ? "Deleted"
                          : comment.comment_id === deleteCurrentComment &&
                            deletedBol === deletedObj.failed
                          ? "Deletion Unsuccessful"
                          : ""}
                      </div>
                    </div>
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
