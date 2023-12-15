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
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
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
    if (topic == "all") {
      console.log("1");
      navigate(`/`);
    } else {
      console.log("2");
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
    <div>
      <Button
        sx={{ textTransform: "none" }}
        variant="outlined"
        onClick={() => setShowMenuBol((prev) => !prev)}
      >
        {showMenuBol ? " Hide Filter" : "Show Filter"}
        {showMenuBol ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </Button>

      <div className={showMenuBol ? "block pt-5" : "hidden"}>
        <section className="flex justify-center">
          <div key="all" className=" m-3">
            <button
              onClick={() => handleSelectTopic("all", "All topics")}
              className={`${
                selectTopic == "all" ? "bg-blue-700 " : "bg-sky-600"
              } bg-sky-600 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full x-5 w-[90px]`}
            >
              <div>All</div>
            </button>

            <p
              className={`${
                animate && selectTopic == "all"
                  ? "absolute slide-right left-[50%] w-[80vw] translate-center"
                  : "hidden"
              } text-sky-600 pb-2 my-10 text-xl italic`}
            >
              {slug}
            </p>
          </div>

          {topicsList.length > 0 &&
            topicsList.map((topic) => {
              return (
                <div key={topic.slug} className=" m-3">
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
                        ? "fixed slide-right left-[50%] w-[80vw] translate-center"
                        : "hidden"
                    } text-sky-600 pb-2 my-10 text-xl italic absolute`}
                  >
                    {slug}
                  </p>
                </div>
              );
            })}
        </section>

        <div className="relative inline-block pt-5 m-8">
          <button
            type="button"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-sky-600 shadow-sm ring-1 ring-inset ring-sky-600 hover:bg-gray-50"
            onClick={() => setSortByDropdown((prev) => !prev)}
          >
            Sort By
          </button>
        </div>
        <div
          className={`${
            sortBydropdown ? "absolute" : "hidden"
          } max-w-[100px] left-[45%] translate-x-[-45%] left-0 ml-auto mr-auto top-[370px] z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
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
        <div className="relative inline-block">
          <button
            type="button"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-sky-600 shadow-sm ring-1 ring-inset ring-sky-600 hover:bg-gray-50"
            onClick={() => setOrderDropdown((prev) => !prev)}
          >
            Order By
          </button>
        </div>
        <div
          className={`${
            orderDropdown ? "absolute" : "hidden"
          } max-w-[100px] left-[60%] translate-x-[-60%] ml-auto mr-auto top-[370px] z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
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
  );
};

export default MenuBar;
