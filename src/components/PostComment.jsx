import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { ModalContext } from "../contexts/ModalContext";
import { useParams } from "react-router-dom";
import { postComment } from "../api";

const PostComment = ({ setRefreshComment }) => {
  const { user } = useContext(UserContext);
  const { setOpenModal } = useContext(ModalContext);
  const [commentInput, setCommentInput] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const { article_id } = useParams();

  const msgObj = {
    success: "Successfully Posted!",
    error: "Please type in your comment...",
  };

  const handlePostComment = () => {
    if (!user) {
      setOpenModal(true);
    } else {
      if (commentInput !== "") {
        postComment(commentInput, article_id, user.username).then(() => {
          setRefreshComment(true);
          setSubmitMessage(msgObj.success);
          setCommentInput("");
        });
      } else {
        setSubmitMessage(msgObj.error);
      }
    }
  };

  return (
    <form className="flex flex-col items-center mt-16">
      <div className="flex flex-col desktop:w-[80vw] w-[90vw] border-solid border-2 rounded-lg p-5 border-indigo-800">
        <div>
          <div>
            <div className="sm:col-span-4">
              <label
                htmlFor="comment"
                className="block text-sm font-medium leading-6 text-gray-900"
              ></label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="comment"
                    id="comment"
                    className="w-12/12 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-black focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Write a comment..."
                    disabled={!user}
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {submitMessage !== "" && (
          <p
            className={`${
              submitMessage == msgObj.success
                ? "text-emerald-500"
                : "text-red-700"
            } pt-5`}
          >
            {submitMessage}
          </p>
        )}

        <div className="mt-6 flex items-center justify-center gap-x-6">
          <button
            type="button"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handlePostComment}
          >
            {user ? "Post" : " Log In To Post"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostComment;
