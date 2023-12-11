import { useEffect, useState } from "react";
import { fetchSingleArticle } from "../api";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import HourglassBottomTwoToneIcon from "@mui/icons-material/HourglassBottomTwoTone";

const SingleArticle = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [singleArticle, setSingleArticle] = useState({});
  const [commentCount, setCommentCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [clickLike, setClickLike] = useState(false);
  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetchSingleArticle(article_id).then((article) => {
      setSingleArticle(article);
      setCommentCount(article.comment_count);
      setIsLoading(false);
    });
  }, [article_id]);

  const sqlDateFormatter = (created_at) => {
    return new Date(created_at).toLocaleString();
  };

  const handleClickLikes = () => {
    let updatedLike = likesCount + 1;
    setLikesCount(updatedLike);
    setClickLike(true);
    setTimeout(() => {
      setClickLike(false);
    }, 2000);
  };

  if (isLoading)
    return (
      <p>
        <HourglassBottomTwoToneIcon className="animate-pulse" />
        Loading...
      </p>
    );

  return (
    <div className="flex flex-col desktop:w-[80vw] w-[90vw] items-center mx-auto mt-10 border-solid border-2 rounded-lg p-5 border-indigo-800">
      <div className="font-bold text-2xl">{singleArticle.title}</div>

      <div className="flex space-even">
        <div className="flex border-solid border-2 border-sky-500 rounded-xl px-5 m-5">
          {singleArticle.author} at {sqlDateFormatter(singleArticle.created_at)}
        </div>
        <div className="flex items-center border-solid border-2 border-sky-500 rounded-xl cursor-pointer px-5 m-5">
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
          {likesCount} likes
        </div>
      </div>
      <Button
        variant={clickLike ? "contained" : "outlined"}
        className="cursor-pointer"
        onClick={() => handleClickLikes()}
      >
        Like
      </Button>
    </div>
  );
};

export default SingleArticle;
