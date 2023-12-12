import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import ArticleList from "./components/ArticleList";
import Header from "./components/Header";
import MenuBar from "./components/MenuBar";
import SingleArticle from "./components/SingleArticle";
import { LoadingProvider } from "./contexts/LoadingContext";

function App() {
  const [articles, setArticles] = useState([]);
  return (
    <BrowserRouter>
      <LoadingProvider>
        <Header />
        <MenuBar />
        <Routes>
          <Route
            path="/"
            element={
              <ArticleList articles={articles} setArticles={setArticles} />
            }
          />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
        </Routes>
      </LoadingProvider>
    </BrowserRouter>
  );
}

export default App;
