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
    console.log(data);
    return data.article;
  });
};
