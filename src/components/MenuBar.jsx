import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { fetchAllTopics } from "../api";
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import { sortByObj } from "./SortedArticle";
import "../App.css";

export const sortByText = {
  [sortByObj.created_at]: "Date",
  [sortByObj.votes]: "Votes",
  [sortByObj.topic]: "Topic",
  [sortByObj.author]: "Author",
};

const MenuBar = () => {
  const [showMenuBol, setShowMenuBol] = useState(false);
  const [topicsList, setTopicsList] = useState([]);
  const [selectTopic, setSelectTopic] = useState("");
  const [slug, setSlug] = useState("");
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState(sortByObj.created_at);
  const [order, setOrder] = useState("desc");
  const [orderDropdown, setOrderDropdown] = useState(false);
  const [sortBydropdown, setSortByDropdown] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    fetchAllTopics(sortBy).then((topics) => {
      setTopicsList(topics);
    });
  }, [setTopicsList]);

  const handleSelectTopic = (topic, description) => {
    setAnimate(true);
    setSelectTopic(topic);
    setSlug(description);
    navigate(`/topics/${topic}`);
    // setAnimate(false);
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
    <div>
      <Button
        variant="outlined"
        onClick={() => setShowMenuBol((prev) => !prev)}
      >
        {showMenuBol ? "Hide Filter" : "Show Filter"}
      </Button>

      <div className={showMenuBol ? "block" : "hidden"}>
        <div>
          <strong> Topics </strong>
        </div>
        <section className="flex justify-center ">
          {topicsList.length > 0 &&
            topicsList.map((topic) => {
              return (
                <div key={topic.slug} className=" m-3">
                  <button
                    onClick={() =>
                      handleSelectTopic(topic.slug, topic.description)
                    }
                    className={`${
                      selectTopic == topic.slug ? "bg-blue-700 " : "bg-sky-500"
                    } bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full x-5`}
                  >
                    <div>{topic.slug}</div>
                  </button>
                </div>
              );
            })}
        </section>
        <p className={`${animate ? "slide-right" : ""} text-blue-700 pb-2 m-2`}>
          {slug}
        </p>

        <div className="relative inline-block">
          <button
            type="button"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() => setSortByDropdown((prev) => !prev)}
          >
            Sort By
          </button>
        </div>
        <div
          className={`${
            sortBydropdown ? "absolute" : "hidden"
          }  left-[24%] z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
          onChange={handleSelectSortBy}
        >
          <div className="py-1" role="none">
            <a
              className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
              onClick={() => handleSelectSortBy(sortByObj.created_at)}
              value={sortByObj.created_at}
            >
              {sortByText[sortByObj.created_at]}
            </a>
            <a
              className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
              onClick={() => handleSelectSortBy(sortByObj.votes)}
              value={sortByObj.votes}
            >
              {sortByText[sortByObj.votes]}
            </a>
            <a
              className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
              onClick={() => handleSelectSortBy(sortByObj.topic)}
              value={sortByObj.topic}
            >
              {sortByText[sortByObj.topic]}
            </a>
            <a
              className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
              onClick={() => handleSelectSortBy(sortByObj.author)}
              value={sortByObj.author}
            >
              {sortByText[sortByObj.author]}
            </a>
          </div>
        </div>
        <div className="relative inline-block">
          <button
            type="button"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() => setOrderDropdown((prev) => !prev)}
          >
            Order By
          </button>
        </div>
        <div
          className={`${
            orderDropdown ? "absolute" : "hidden"
          }  right-[24%] z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
          onChange={handleSelectOrder}
        >
          <div className="py-1" role="none">
            <a
              className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
              onClick={() => handleSelectOrder("desc")}
              value="desc"
            >
              Descending
            </a>
            <a
              className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
              onClick={() => handleSelectOrder("asc")}
              value="asc"
            >
              Ascending
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
