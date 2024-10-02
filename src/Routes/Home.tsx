import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";

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

const Slider = styled.div`
  position: relative;
  top: -100px;
`;
const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;
const Box = styled(motion.div)<{ bgPhoto: string }>`
  /* position: relative; */
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
  height: 200px;
  font-size: 36px;
  cursor: pointer;

  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 50vw;
  height: 80vh;
  top: scrollY.get() + 100;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center;
`;
const BigTitle = styled.h3`
  position: relative;
  top: -86px;
  padding: 20px;
  color: ${(props) => props.theme.white.lighter};
  font-size: 46px;
`;
const BigOverview = styled.p`
  position: relative;
  top: -86px;
  padding: 20px;
  color: ${(props) => props.theme.white.lighter};
  font-size: 16px;
`;
// vw, window.innerWidth, window.outerWidth
const rowVariants = {
  hidden: { x: "100vw" },
  visible: { x: 0 },
  exit: { x: "-100vw" },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    // zIndex: 100,
    transition: { duration: 0.3, delay: 0.5, type: "tween" },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: { duration: 0.3, delay: 0.5, type: "tween" },
  },
};

const Home = () => {
  const navigate = useNavigate();
  const bigMovieMatch = useMatch("/movies/:movieId");
  const { scrollY } = useScroll();
  const { data, isLoading } = useQuery<IGetMoviesResult>(["movie", "nowPlaying"], getMovies);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const offset = 6;
  const clickedMovie = bigMovieMatch?.params.movieId && data?.results.find((movie) => movie.id === Number(bigMovieMatch.params.movieId)); // if it's a string gives undefined
  console.log(clickedMovie);
  const incraseIndex = () => {
    if (data) {
      if (leaving) return;
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      toggleLeaving();
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => {
    setLeaving(false);
  };
  const onBoxClicked = (movieId: number) => {
    navigate(`movies/${movieId}`);
  };
  const onOverlayCicked = () => navigate(`/`);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <Banner onClick={incraseIndex} bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview> {data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row key={index} variants={rowVariants} initial="hidden" animate="visible" exit="exit" transition={{ type: "tween", duration: 1 }}>
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      key={movie.id}
                      layoutId={movie.id + ""}
                      onClick={() => onBoxClicked(movie.id)}
                      variants={boxVariants}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                      whileHover="hover"
                      initial="normal"
                      transition={{ type: "tween" }}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay onClick={onOverlayCicked} animate={{ opacity: 0 }} />
                <BigMovie
                  layoutId={bigMovieMatch.params.movieId}
                  style={{
                    top: scrollY.get() + 100,
                  }}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{ backgroundImage: `linear-gradient(black, transparent),  url(${makeImagePath(clickedMovie.backdrop_path, "w500")})` }}
                      />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
};
export default Home;
