import axios from "axios";

const newsAPI = axios.create({
  baseURL: "https://news-api-905c.onrender.com/api",
});

export const fetchAllArticles = () => {
  return newsAPI.get("/articles").then(({ data }) => {
    return data.articles;
  });
};

export const fetchSingleArticle = (article_id) => {
  return newsAPI.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const updateArticleVote = (article_id, vote) => {
  return newsAPI
    .patch(`/articles/${article_id}`, { inc_votes: vote })
    .then(({ data }) => {
      return data.article;
    })
    .catch(function (error) {
      return error.toJSON();
    });
};
