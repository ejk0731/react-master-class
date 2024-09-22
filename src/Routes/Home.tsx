import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background: black;
`;

const Loader = styled.div`
  height: 20vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: white;
  padding: 60px;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  width: 50%;
  font-size: 20px;
`;

const Home = () => {
  const { data, isLoading } = useQuery<IGetMoviesResult>(["movie", "nowPlaying"], getMovies);
  console.log(data, isLoading);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview> {data?.results[0].overview}</Overview>
          </Banner>
        </>
      )}
    </Wrapper>
  );
};
export default Home;
