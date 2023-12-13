import { useEffect, useState } from "react";
import { fetchSingleArticle } from "../api";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { sqlDateFormatter } from "../utils";
import HourglassBottomTwoToneIcon from "@mui/icons-material/HourglassBottomTwoTone";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Comments from "./Comments";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { updateArticleVote } from "../api";

const SingleArticle = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [singleArticle, setSingleArticle] = useState({});
  const [commentCount, setCommentCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [clickLike, setClickLike] = useState(false);
  const [errorMsg, setErrorMsg] = useState(undefined);
  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetchSingleArticle(article_id).then((article) => {
      setSingleArticle(article);
      setCommentCount(article.comment_count);
      setLikesCount(article.votes);
      setIsLoading(false);
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
      setErrorMsg("Like is not registered");
    } else {
      setClickLike(true);
      setLikesCount(updateLike);
      setTimeout(() => {
        setClickLike(false);
      }, 2000);
    }
  };

  if (isLoading)
    return (
      <p>
        <HourglassBottomTwoToneIcon className="animate-pulse" />
        Loading...
      </p>
    );

  return (
    <div>
      <div className="flex flex-col desktop:w-[80vw] w-[90vw] items-center mx-auto mt-10 border-solid border-2 rounded-lg p-5 border-indigo-800">
        <div className="font-bold text-2xl">{singleArticle.title}</div>

        <div className="flex space-even">
          <div className="flex border-solid border-2 border-sky-500 rounded-xl px-5 m-5">
            {singleArticle.author} at{" "}
            {sqlDateFormatter(singleArticle.created_at)}
          </div>
          <div className="flex items-center border-solid border-2 border-sky-500 hover:border-sky-900 rounded-xl cursor-pointer px-5 m-5">
            {singleArticle.topic}
          </div>
        </div>
        <div className="w-[75%]">
          <img src={singleArticle.article_img_url} />
        </div>

        <div className="w-[75%] py-5">{singleArticle.body}</div>
        <div className="flex space-even">
          <div className="flex border-solid border-2 border-sky-500 rounded-xl px-5 m-5">
            {commentCount} comments
          </div>
          <div className="flex border-solid border-2 border-sky-500 rounded-xl px-5 m-5 ">
            <FavoriteOutlinedIcon />
            {likesCount} likes
          </div>
          <Button
            variant={clickLike ? "contained" : "outlined"}
            className="cursor-pointer"
            onClick={() => handleClickLikes()}
          >
            <FavoriteOutlinedIcon />
            Like
          </Button>
        </div>
        <Comments article_id={article_id} />
        <div>
          <Button
            variant={clickLike ? "contained" : "outlined"}
            className="cursor-pointer"
            onClick={() => handleVotes("unlike")}
          >
            <FavoriteBorderIcon />
          </Button>
          <Button
            variant={clickLike ? "contained" : "outlined"}
            className="cursor-pointer"
            onClick={() => handleVotes("like")}
          >
            <FavoriteIcon />
          </Button>
          {errorMsg && <p>{errorMsg}</p>}
        </div>
      </div>
    </div>
  );
};

export default SingleArticle;
