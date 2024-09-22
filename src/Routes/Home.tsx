import { useQuery } from "react-query";
import { getMovies } from "../api";

const Home = () => {
  const { data, isLoading } = useQuery(["movie", "nowPlaying"], getMovies);
  console.log(data, isLoading)
  return <div style={{ background: "green", height: "200vh", width: "100%", color: "white" }}>홈</div>;
};
export default Home;
