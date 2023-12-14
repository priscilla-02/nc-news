import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import ArticleList from "./components/ArticleList";
import Header from "./components/Header";
import MenuBar from "./components/MenuBar";
import SingleArticle from "./components/SingleArticle";
import { LoadingProvider } from "./contexts/LoadingContext";
import { UserProvider } from "./contexts/UserContext";
import { ModalProvider } from "./contexts/ModalContext";
import LogInModal from "./components/LoginModal";
import SortedArticle from "./components/SortedArticle";
import ErrorHandling from "./components/ErrorHandling";
import { ErrorProvider } from "./contexts/ErrorHandlingContext";

function App() {
  const [articles, setArticles] = useState([]);
  return (
    <BrowserRouter>
      <LoadingProvider>
        <UserProvider>
          <ModalProvider>
            <ErrorProvider>
              <LogInModal />
              <Header />
              <MenuBar />
              <Routes>
                <Route
                  path="/"
                  element={
                    <ArticleList
                      articles={articles}
                      setArticles={setArticles}
                    />
                  }
                />
                <Route
                  path="/articles/:article_id"
                  element={<SingleArticle />}
                />
                <Route
                  path="/topics/:topic"
                  element={
                    <ArticleList
                      articles={articles}
                      setArticles={setArticles}
                    />
                  }
                />
                <Route path="/*" element={<ErrorHandling />} />
                <Route path="/sortby" element={<SortedArticle />} />
              </Routes>
            </ErrorProvider>
          </ModalProvider>
        </UserProvider>
      </LoadingProvider>
    </BrowserRouter>
  );
}

export default App;
