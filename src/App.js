import styled, { keyframes } from "styled-components";

/* 
  styled-components
  첫글자는 대문자여야 인식함
  자동완성은 vscode-styled-components 익스텐션 설치
*/

const rotationAnimation = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
  50% {
    transform: rotate(360deg);
    border-radius: 100px;
  }
  100% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
  `;

const Wrapper = styled.div`
  display: flex;
`;

const Emoji = styled.span`
  font-size: 30px;
  color: black;
`;
const Box = styled.div`
  width: 300px;
  height: 300px;
  background-color: tomato;
  animation: ${rotationAnimation} 3s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;

  ${Emoji} {
    &:hover {
      // pseudo selectors
      color: blue;
      font-size: 98px;
    }
  }
`;

function App() {
  return (
    <>
      <Wrapper>
        <Emoji>멍</Emoji>
        <Box>
          <Emoji>냥</Emoji>
        </Box>
      </Wrapper>
    </>
  );
}

export default App;
