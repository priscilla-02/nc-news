import { useState, useEffect } from "react";
import { fetchAllArticles } from "../api";
import HourglassBottomTwoToneIcon from "@mui/icons-material/HourglassBottomTwoTone";
import { useNavigate } from "react-router-dom";

const ArticleList = ({ articles, setArticles }) => {
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    fetchAllArticles().then((articleList) => {
      setArticles(articleList);
      setIsLoading(false);
    });
  }, []);

  const handleClick = (article_id) => {
    console.log("clicked!");
    navigate(`/articles/${article_id}`);
  };

  if (isLoading)
    return (
      <p>
        <HourglassBottomTwoToneIcon className="animate-pulse" />
        Loading...
      </p>
    );

  return (
    <main className="flex flex-wrap px-[50px] justify-center">
      {articles.map((article) => {
        return (
          <section
            key={article.article_id}
            className="desktop:w-[20vw] w-[40vw] m-2"
          >
            <article onClick={() => handleClick(article.article_id)}>
              <img src={article.article_img_url} alt={article.title} />
              <p>{article.title}</p>
            </article>
          </section>
        );
      })}
    </main>
  );
};

export default ArticleList;
