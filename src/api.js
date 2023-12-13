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
  // console.log(commentInput);
  // console.log(article_id);
  console.log(username);
  const postBody = {
    username: username,
    body: commentInput,
  };
  return newsAPI
    .post(`/articles/${article_id}/comments`, postBody)
    .then((response) => {
      console.log(response);
      return response;
    });
};

export const deleteComment = (comment_id) => {
  return newsAPI.delete(`/comments/${comment_id}`).then((data) => {
    console.log(data);
    return data;
  });
};
