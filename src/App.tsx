import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const Wrapper = styled(motion.div)`
  height: 200vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: gray;
`;

const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  position: absolute;
  top: 100px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
`;

const box = {
  entry: (back: boolean) => ({
    x: back ? -500 : 500,
    opacity: 0,
    scale: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: (back: boolean) => ({
    x: back ? 500 : -500,
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.5,
    },
  }),
};

function App() {
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const nextPlease = () => {
    setBack(false);
    setVisible((prev) => (prev === 9 ? 9 : prev + 1));
  };
  const prevPlease = () => {
    setBack(true);
    setVisible((prev) => (prev === 1 ? 1 : prev - 1));
  };
  useEffect(() => {
    console.log(back);
  }, [back]);

  return (
    <Wrapper>
      <AnimatePresence custom={back} mode="wait">
        {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
          return i === visible ? (
            <Box key={i} variants={box} initial="entry" animate="visible" exit="exit">
              {i}
            </Box>
          ) : null;
        })} */}
        <Box key={visible} custom={back} variants={box} initial="entry" animate="center" exit="exit">
          {visible}
        </Box>
      </AnimatePresence>
      <button onClick={prevPlease}>Prev</button>
      <button onClick={nextPlease}>Next</button>
    </Wrapper>
  );
}

export default App;
