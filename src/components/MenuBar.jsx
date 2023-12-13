import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { useState } from "react";

const MenuBar = () => {
  const [showMenuBol, setShowMenuBol] = useState(false);

  return (
    <div className="bg-gray-400">
      <Button
        variant="outlined"
        onClick={() => setShowMenuBol((prev) => !prev)}
      >
        {showMenuBol ? "Hide Filter" : "Show Filter"}
      </Button>

      <div className={showMenuBol ? "block" : "hidden"}>
        <section>
          Topic
          <Button variant="outlined">Topic 1</Button>
          <Button variant="outlined">Topic 2</Button>
          <Button variant="outlined">Topic 3</Button>
        </section>
        <section>
          <Box sx={{ minWidth: 50 }}>
            <FormControl>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Sort By
              </InputLabel>
              <NativeSelect>
                <option value="created_at">Date</option>
                <option value="title">Title</option>
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
