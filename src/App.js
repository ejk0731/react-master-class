import styled, { keyframes } from "styled-components";

/* 
  styled-components
  첫글자는 대문자여야 인식함
  자동완성은 vscode-styled-components 익스텐션 설치
*/

const Father = styled.div`
  display: flex;
`;
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
const Box = styled.div`
  background: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
  /* animation: ${rotationAnimation} 3s linear infinite; */
`;
const Circle = styled(Box)`
  border-radius: 50%;
`;
const Text = styled.span`
  font-size: 15px;
  color: #fff;
`;
const Btn = styled.button`
  color: white;
  background-color: tomato;
  border: 0;
  border-radius: 15px;
`;
const Input = styled.input.attrs({ required: true})`
  background-color: plum;
`;

function App() {
  return (
    <>
      <Father>
        <Btn>Log In</Btn>
        <Input></Input>
        <Btn as="a" href="/">Log In</Btn>
        <Box bgColor="pink">
          <Text>Hello there</Text>
        </Box>
        <Circle bgColor="yellowgreen" />
        <Box bgColor="green" />
      </Father>
    </>
  );
}

export default App;
