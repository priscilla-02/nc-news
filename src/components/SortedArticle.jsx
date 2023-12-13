import { useSearchParams } from "react-router-dom";

const SortedArticle = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  return <div>sorted</div>;
};

export default SortedArticle;
