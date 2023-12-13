import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { useState, useEffect } from "react";
import { fetchAllTopics } from "../api";
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";

const MenuBar = () => {
  const [showMenuBol, setShowMenuBol] = useState(false);
  const [topicsList, setTopicsList] = useState([]);
  const [selectTopic, setSelectTopic] = useState("");
  const [slug, setSlug] = useState("");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState();

  useEffect(() => {
    fetchAllTopics().then((topics) => {
      setTopicsList(topics);
    });
  }, [setTopicsList]);

  const handleSelectTopic = (topic, description) => {
    setSelectTopic(topic);
    setSlug(description);
    navigate(`/topics/${topic}`);
  };

  const handleSelectSoryBy = (e) => {
    console.log(e.target.value);
    navigate({
      pathname: "/sortby/",
      search: createSearchParams({ sort_by: e.target.value }).toString(),
    });
    setSortBy(e.target.value);
  };

  return (
    <div className="bg-gray-400">
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
                    <div> {topic.slug}</div>
                  </button>
                </div>
              );
            })}
        </section>
        <p className="text-blue-700 pb-2 m-2">{slug}</p>
        <section>
          <Box sx={{ minWidth: 50 }}>
            <FormControl>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Sort By
              </InputLabel>
              <NativeSelect value={sortBy} onChange={handleSelectSoryBy}>
                <option value="created_at">Date</option>
                <option value="votes">Votes</option>
                <option value="topic">Topic</option>
                <option value="author">Author</option>
              </NativeSelect>
            </FormControl>
            <FormControl>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Order By
              </InputLabel>
              <NativeSelect>
                <option value="desc>">Descending</option>
                <option value="asc">Ascending</option>
              </NativeSelect>
            </FormControl>
          </Box>
        </section>
      </div>
    </div>
  );
};

export default MenuBar;
