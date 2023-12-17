import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorContext } from "../contexts/ErrorHandlingContext";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { LoadingContext } from "../contexts/LoadingContext";
import Loading from "./Loading";
import { fetchSingleArticle } from "../api";
import { updateArticleVote } from "../api";
import { sqlDateFormatter } from "../utils";
import Comments from "./Comments";
import PostComment from "./PostComment";
import Button from "@mui/material/Button";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const SingleArticle = () => {
  const { setErrMsg } = useContext(ErrorContext);
  const { isDarkMode } = useContext(DarkModeContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [singleArticle, setSingleArticle] = useState({});
  const [commentCount, setCommentCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [clickLike, setClickLike] = useState(false);
  const [likeErrorMsg, setLikeErrorMsg] = useState(undefined);
  const [refreshComment, setRefreshComment] = useState(false);
  const { article_id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetchSingleArticle(article_id)
      .then((article) => {
        setSingleArticle(article);
        setCommentCount(article.comment_count);
        setLikesCount(article.votes);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrMsg(error.response.data.message);
        navigate("/error");
      });
  }, [article_id]);

  const handleVotes = async (vote) => {
    let updateLike;
    let voteNumber = 0;
    if (vote === "like") {
      voteNumber = 1;
      updateLike = likesCount + 1;
    } else if (vote === "unlike") {
      voteNumber = -1;
      updateLike = likesCount - 1;
    }

    const result = await updateArticleVote(article_id, voteNumber);
    if (result.status === 404) {
      setLikeErrorMsg("Like is not registered");
    } else {
      setClickLike(true);
      setLikesCount(updateLike);
      setTimeout(() => {
        setClickLike(false);
      }, 2000);
    }
  };

  const handleClickTopic = (topic) => {
    navigate(`/topics/${topic}`);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div
          className={`flex flex-wrap px-[50px] justify-center pt-10 pb-16 bg-mode ${
            isDarkMode ? "dark" : "light"
          }`}
        >
          <div
            className={` slide-right flex flex-col desktop:w-[80vw] w-[90vw] items-center mx-auto border-solid border-2 rounded-lg p-5 ${
              isDarkMode
                ? "border-secondary text-secondary"
                : "border-primary text-primary"
            }`}
          >
            <div
              className="font-bold text-xl"
              style={{
                fontFamily: "Diplomata SC Regular",
              }}
            >
              {singleArticle.title}
            </div>

            <div className="flex space-between py-4">
              <div className="flex border-solid border-2 border-sky-600 bg-sky-600 text-white rounded-xl px-5 m-5">
                {singleArticle.author} at{" "}
                {sqlDateFormatter(singleArticle.created_at)}
              </div>
              <div
                className="flex items-center bg-sky-600 text-white hover:bg-blue-700 rounded-xl cursor-pointer px-5 m-5"
                onClick={() => handleClickTopic(singleArticle.topic)}
              >
                {singleArticle.topic}
              </div>
            </div>
            <div className="w-[75%] flex justify-center">
              <img src={singleArticle.article_img_url} />
            </div>

            <div className="w-[75%] pt-5">{singleArticle.body}</div>
            <div className="flex justify-evenly w-[75%]">
              <div className="flex border-solid border-2 border-sky-600 bg-sky-600 text-white rounded-xl px-8 m-8">
                {commentCount} comments
              </div>
              <div className="flex border-solid border-2 border-sky-600 bg-sky-600 text-white rounded-xl px-8 m-8">
                <FavoriteOutlinedIcon
                  style={{ color: "white", marginRight: 6 }}
                />
                {likesCount} likes
              </div>
            </div>
            <div className="flex justify-evenly w-[75%]">
              <div>
                <Button
                  variant={clickLike ? "contained" : "outlined"}
                  className="cursor-pointer hover:border-sky-900"
                  onClick={() => handleVotes("unlike")}
                  style={{
                    borderColor: isDarkMode ? "#fff" : "",
                    borderRadius: "10px",
                  }}
                >
                  <FavoriteBorderIcon
                    style={{
                      color: isDarkMode ? "#fff" : "",
                      border: isDarkMode ? "#fff" : "",
                    }}
                  />
                </Button>
              </div>
              <div>
                <Button
                  variant={clickLike ? "contained" : "outlined"}
                  className="cursor-pointer hover:border-sky-900"
                  onClick={() => handleVotes("like")}
                  style={{
                    borderColor: isDarkMode ? "#fff" : "",
                    borderRadius: "10px",
                  }}
                >
                  <FavoriteIcon
                    style={{
                      color: isDarkMode ? "#fff" : "",
                      border: isDarkMode ? "#fff" : "",
                    }}
                  />
                </Button>
                {likeErrorMsg && <p>{likeErrorMsg}</p>}
              </div>
            </div>
          </div>
          <PostComment setRefreshComment={setRefreshComment} />
          <Comments
            article_id={article_id}
            setRefreshComment={setRefreshComment}
            refreshComment={refreshComment}
          />
        </div>
      )}
    </>
  );
};

export default SingleArticle;
