import { useContext, useEffect, useState } from "react";
import { fetchSingleArticle } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { sqlDateFormatter } from "../utils";
import HourglassBottomTwoToneIcon from "@mui/icons-material/HourglassBottomTwoTone";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Comments from "./Comments";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { updateArticleVote } from "../api";
import PostComment from "./PostComment";
import { ErrorContext } from "../contexts/ErrorHandlingContext";

const SingleArticle = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [singleArticle, setSingleArticle] = useState({});
  const [commentCount, setCommentCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [clickLike, setClickLike] = useState(false);
  const [likeErrorMsg, setLikeErrorMsg] = useState(undefined);
  const [refreshComment, setRefreshComment] = useState(false);
  const { article_id } = useParams();
  const { setErrMsg } = useContext(ErrorContext);
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

  if (isLoading)
    return (
      <p>
        <HourglassBottomTwoToneIcon className="animate-pulse" />
        Loading...
      </p>
    );

  return (
    <div className="pt-10">
      <div className="flex flex-col desktop:w-[80vw] w-[90vw] items-center mx-auto border-solid border-2 rounded-lg p-5 border-sky-600">
        <div className="font-bold text-2xl">{singleArticle.title}</div>

        <div className="flex space-between py-4">
          <div className="flex border-solid border-2 border-sky-600 rounded-xl px-5 m-5">
            {singleArticle.author} at{" "}
            {sqlDateFormatter(singleArticle.created_at)}
          </div>
          <div
            className="flex items-center border-solid border-2 border-sky-600 hover:border-sky-900 rounded-xl cursor-pointer px-5 m-5"
            onClick={() => handleClickTopic(singleArticle.topic)}
          >
            {singleArticle.topic}
          </div>
        </div>
        <div className="w-[75%]">
          <img src={singleArticle.article_img_url} />
        </div>

        <div className="w-[75%] pt-5">{singleArticle.body}</div>
        <div className="flex justify-evenly w-[75%]">
          <div className="flex border-solid border-2 border-sky-600 rounded-xl px-8 m-8">
            {commentCount} comments
          </div>
          <div className="flex border-solid border-2 border-sky-600 rounded-xl px-8 m-8">
            <FavoriteOutlinedIcon style={{ color: "#0284C7" }} />
            {likesCount} likes
          </div>
        </div>
        <div className="flex justify-evenly w-[75%]">
          <div>
            <Button
              variant={clickLike ? "contained" : "outlined"}
              className="cursor-pointer hover:border-sky-900"
              onClick={() => handleVotes("unlike")}
            >
              <FavoriteBorderIcon />
            </Button>
          </div>
          <div>
            <Button
              variant={clickLike ? "contained" : "outlined"}
              className="cursor-pointer hover:border-sky-900"
              onClick={() => handleVotes("like")}
            >
              <FavoriteIcon />
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
  );
};

export default SingleArticle;
