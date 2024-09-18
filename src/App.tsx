import styled from "styled-components";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";

const Wrapper = styled(motion.div)`
  height: 200vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVarients = {
  hover: { scale: 1, rotateZ: 90 },
  click: { scale: 1 },
  drag: { backgroundColor: "rgb(46,204,113)", transition: { duration: 10 } },
};

function App() {
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  const background = useTransform(
    x,
    [-800, 0, 800],
    ["linear-gradient(35deg, rgba(0, 210, 238), rgba(0, 83, 238))", "linear-gradient(35deg, rgba(238, 0, 53), rgba(221, 0, 238))", "linear-gradient(35deg, rgba(0, 238, 155), rgba(238, 178, 0))"]
  );
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);

  return (
    <Wrapper style={{ background }}>
      <Box style={{ x, rotateZ, scale }} drag="x" dragSnapToOrigin variants={boxVarients} whileDrag="drag" whileHover="hover" whileTap="click" />
    </Wrapper>
  );
}

export default App;
