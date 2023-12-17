import Button from "@mui/material/Button";
import { useState, useEffect, useContext } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { fetchAllTopics } from "../api";
import { sortByObj } from "./SortedArticle";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export const sortByText = {
  [sortByObj.created_at]: "Date",
  [sortByObj.votes]: "Votes",
  [sortByObj.topic]: "Topic",
  [sortByObj.author]: "Author",
};

const MenuBar = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [showMenuBol, setShowMenuBol] = useState(false);
  const [topicsList, setTopicsList] = useState([]);
  const [selectTopic, setSelectTopic] = useState("");
  const [slug, setSlug] = useState("");
  const [orderDropdown, setOrderDropdown] = useState(false);
  const [sortBydropdown, setSortByDropdown] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [sortBy, setSortBy] = useState(sortByObj.created_at);
  const [order, setOrder] = useState("desc");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllTopics(sortBy).then((topics) => {
      setTopicsList(topics);
    });
  }, [setTopicsList]);

  const handleSelectTopic = (topic, description) => {
    setAnimate(true);
    setSelectTopic(topic);
    setSlug(description);
    if (topic == "all") {
      navigate("/");
    } else {
      navigate(`/topics/${topic}`);
    }
  };

  const handleSelectSortBy = (category) => {
    setSortBy(category);
    setSortByDropdown(false);
    navigate({
      pathname: "/sortby/",
      search: createSearchParams({
        sort_by: category,
        order: order,
      }).toString(),
    });
  };

  const handleSelectOrder = (order) => {
    setOrder(order);
    setOrderDropdown(false);
    navigate({
      pathname: "/sortby/",
      search: createSearchParams({
        sort_by: sortBy,
        order: order,
      }).toString(),
    });
  };

  return (
    <div className={`bg-mode ${isDarkMode ? "dark" : "light"}`}>
      <Button
        sx={{
          textTransform: "none",
          color: isDarkMode ? "#fff" : "",
          borderColor: isDarkMode ? "#fff" : "",
        }}
        variant="outlined"
        onClick={() => setShowMenuBol((prev) => !prev)}
      >
        {showMenuBol ? " Hide Filter" : "Show Filter"}
        {showMenuBol ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </Button>

      <div className={showMenuBol ? "block pt-5" : "hidden"}>
        <section className="flex justify-center">
          <div key="all" className=" m-1">
            <button
              onClick={() => handleSelectTopic("all", "All topics")}
              className={`${
                selectTopic == "all" ? "bg-blue-700 " : "bg-sky-600"
              } bg-sky-600 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full x-5 w-[80px]`}
            >
              <div>All</div>
            </button>

            <p
              className={`${
                animate && selectTopic == "all"
                  ? "absolute slide-right-topic left-[50%] w-[80vw] translate-center"
                  : "hidden"
              } ${
                isDarkMode ? "text-secondary" : "text-primary"
              } pb-2 my-5  text-xl italic`}
            >
              {slug}
            </p>
          </div>

          {topicsList.length > 0 &&
            topicsList.map((topic) => {
              return (
                <div key={topic.slug} className="m-1">
                  <button
                    onClick={() =>
                      handleSelectTopic(topic.slug, topic.description)
                    }
                    className={`${
                      selectTopic == topic.slug ? "bg-blue-700 " : "bg-sky-600"
                    } bg-sky-600 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full x-5 w-[90px]`}
                  >
                    <div>{topic.slug}</div>
                  </button>

                  <p
                    className={`${
                      animate && selectTopic == topic.slug
                        ? "absolute slide-right-topic left-[50%] w-[80vw] translate-center"
                        : "hidden"
                    } ${
                      isDarkMode ? "text-secondary" : "text-primary"
                    } pb-2 my-5 text-xl italic`}
                  >
                    {slug}
                  </p>
                </div>
              );
            })}
        </section>

        <div className="flex justify-center items-center w-[100vw] pt-20 pb-3">
          <div className="relative">
            <div className="mx-4">
              <button
                type="button"
                className={`inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold ${
                  isDarkMode
                    ? "bg-dark text-white ring-1 ring-white hover:bg-sky-600"
                    : "bg-white text-sky-600 ring-1 ring-sky-600 "
                }`}
                onClick={() => setSortByDropdown((prev) => !prev)}
              >
                Sort By
              </button>
            </div>
            <div
              className={`${
                sortBydropdown ? "absolute" : "hidden"
              } max-w-[100px] z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
              onChange={handleSelectSortBy}
            >
              <div className="py-1">
                <a
                  className="text-sky-600 block px-4 py-2 text-sm cursor-pointer"
                  onClick={() => handleSelectSortBy(sortByObj.created_at)}
                  value={sortByObj.created_at}
                >
                  {sortByText[sortByObj.created_at]}
                </a>
                <a
                  className="text-sky-600 block px-4 py-2 text-sm cursor-pointer"
                  onClick={() => handleSelectSortBy(sortByObj.votes)}
                  value={sortByObj.votes}
                >
                  {sortByText[sortByObj.votes]}
                </a>
                <a
                  className="text-sky-600 block px-4 py-2 text-sm cursor-pointer"
                  onClick={() => handleSelectSortBy(sortByObj.topic)}
                  value={sortByObj.topic}
                >
                  {sortByText[sortByObj.topic]}
                </a>
                <a
                  className="text-sky-600 block px-4 py-2 text-sm cursor-pointer"
                  onClick={() => handleSelectSortBy(sortByObj.author)}
                  value={sortByObj.author}
                >
                  {sortByText[sortByObj.author]}
                </a>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="mx-4">
              <button
                type="button"
                className={`inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold ${
                  isDarkMode
                    ? "bg-dark text-white ring-1 ring-white hover:bg-sky-600"
                    : "bg-white text-sky-600 ring-1 ring-sky-600 shadow-sm"
                }`}
                onClick={() => setOrderDropdown((prev) => !prev)}
              >
                Order By
              </button>
            </div>
            <div
              className={`${
                orderDropdown ? "absolute" : "hidden"
              } max-w-[100px] ml-[10px] z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
              onChange={handleSelectOrder}
            >
              <div className="py-1">
                <a
                  className="text-sky-600 block px-4 py-2 text-sm cursor-pointer"
                  onClick={() => handleSelectOrder("desc")}
                  value="desc"
                >
                  Descending
                </a>
                <a
                  className="text-sky-600 block px-4 py-2 text-sm cursor-pointer"
                  onClick={() => handleSelectOrder("asc")}
                  value="asc"
                >
                  Ascending
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
