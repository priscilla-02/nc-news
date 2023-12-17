import axios from "axios";

const newsAPI = axios.create({
  baseURL: "https://news-api-905c.onrender.com/api",
});

export const fetchAllArticles = (sortBy, order) => {
  return newsAPI
    .get("/articles", { params: { sort_by: sortBy, order: order } })
    .then(({ data }) => {
      return data.articles;
    });
};

export const fetchSingleArticle = (article_id) => {
  return newsAPI.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const fetchCommentsByArticleId = (article_id) => {
  return newsAPI.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
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

export const fetchUsers = () => {
  return newsAPI.get("/users").then(({ data }) => {
    return data.users;
  });
};

export const postComment = (commentInput, article_id, username) => {
  const postBody = {
    username: username,
    body: commentInput,
  };
  return newsAPI
    .post(`/articles/${article_id}/comments`, postBody)
    .then((response) => {
      return response;
    });
};

export const deleteComment = (comment_id) => {
  return newsAPI.delete(`/comments/${comment_id}`).then((data) => {
    return data;
  });
};

export const fetchAllTopics = () => {
  return newsAPI.get("/topics").then(({ data }) => {
    return data.topics;
  });
};

export const ErrorPath = () => {
  return newsAPI
    .get("errorStatus")
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
};

///weather///

export const fetchWeatherData = (latitude, longitude) => {
  const apiKey = "18336912236c83629be18b6ce111d8c9";
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    )
    .then(({ data }) => {
      console.log(data);
      return data;
    });
};
