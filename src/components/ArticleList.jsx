import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorContext } from "../contexts/ErrorHandlingContext";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { LoadingContext } from "../contexts/LoadingContext";
import Loading from "./Loading";
import { fetchAllArticles } from "../api";

const ArticleList = ({ articles, setArticles }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  const navigate = useNavigate();
  const { setErrMsg } = useContext(ErrorContext);

  const { topic } = useParams();

  useEffect(() => {
    setIsLoading(true);

    fetchAllArticles()
      .then((articleList) => {
        const allValidTopics = articleList.map((value) => value.topic);

        if (topic) {
          if (!allValidTopics.includes(topic)) {
            handleInvalidTopic();
          }
          const filteredArticles = articleList.filter(
            (article) => article.topic === topic
          );
          setArticles(filteredArticles);
        } else {
          setArticles(articleList);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setErrMsg(error.response.data.message);
        navigate("/error");
      });
  }, [topic]);

  const handleInvalidTopic = () => {
    setErrMsg("Invalid Topic");
    navigate("/error");
  };

  const handleClick = (article_id) => {
    navigate(`/articles/${article_id}`);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <main
          className={`flex flex-wrap px-[50px] justify-center pt-8 pb-16 bg-mode ${
            isDarkMode ? "dark" : "light"
          }`}
        >
          {articles.map((article) => {
            return (
              <section
                key={article.article_id}
                className="desktop:w-[20vw] w-[75vw] m-2 border-2 border-light-gray-700 p-4 m-3 rounded-lg shadow-lg hover:border-sky-600 cursor-pointer hover:scale-110 slide-right"
              >
                <article onClick={() => handleClick(article.article_id)}>
                  <img src={article.article_img_url} alt={article.title} />
                  <p
                    className={`${
                      isDarkMode ? "text-secondary" : "text-primary"
                    }`}
                  >
                    {article.title}
                  </p>
                </article>
              </section>
            );
          })}
        </main>
      )}
    </>
  );
};

export default ArticleList;
