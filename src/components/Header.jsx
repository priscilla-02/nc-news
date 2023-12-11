import NewspaperIcon from "@mui/icons-material/Newspaper";

const Header = () => {
  return (
    <header>
      <h1 className="text-3xl font-bold underline text-blue-500 desktop:text-black">
        <NewspaperIcon /> News Project
      </h1>
      <p>Topic Description</p>
    </header>
  );
};

export default Header;
