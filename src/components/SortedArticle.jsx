import { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { fetchAllArticles } from "../api";
import { sqlDateFormatter } from "../utils";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { DarkModeContext } from "../contexts/DarkModeContext";

export const sortByObj = {
  created_at: "created_at",
  votes: "votes",
  topic: "topic",
  author: "author",
};

const SortedArticle = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [sortedArticles, setSortedArticles] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sort_by = searchParams.get("sort_by");
  const order = searchParams.get("order");

  useEffect(() => {
    fetchAllArticles(sort_by, order).then((articles) => {
      setSortedArticles(articles);
    });
  }, [sort_by, order]);

  const handleClick = (article_id) => {
    navigate(`/articles/${article_id}`);
  };

  return (
    <main
      className={`flex flex-wrap px-[50px] justify-center bg-mode ${
        isDarkMode ? "dark" : "light"
      }`}
    >
      {sortedArticles.map((article) => {
        return (
          <section
            key={article.article_id}
            className={`flex justify-center w-[50vw] m-2 border-solid border-2 rounded-lg p-5 mb-5 cursor-pointer ${
              isDarkMode
                ? "border-secondary text-secondary"
                : "border-primary text-primary"
            }`}
          >
            <article onClick={() => handleClick(article.article_id)}>
              <img src={article.article_img_url} alt={article.title} />
              <p>{article.title}</p>

              <div className="flex justify-center ">
                <div className="border-solid border-2 border-sky-500 rounded-xl px-5 m-5 desktop:w-[20vw] w-[100%]">
                  {sort_by == sortByObj.votes ? (
                    <>
                      {article.votes} <FavoriteIcon />
                    </>
                  ) : sort_by == sortByObj.created_at ? (
                    sqlDateFormatter(article.created_at)
                  ) : sort_by == sortByObj.author ? (
                    <>By {article.author}</>
                  ) : (
                    <>{article.topic}</>
                  )}
                </div>
              </div>
            </article>
          </section>
        );
      })}
    </main>
  );
};

export default SortedArticle;
