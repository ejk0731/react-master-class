import { useState } from "react";
// import styled from "styled-components";

function App() {
  // const Container = styled.div`
  //   background-color: ${(props) => props.theme.bgColor};
  // `;
  // const H1 = styled.h1`
  //   color: ${(props) => props.theme.textColor};
  // `;

  const [value, setValue] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
    console.log(event.currentTarget.value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("hello", value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        {/* input 작성후 enter시 submit됨 console로 확인가능 */}
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Username"
        ></input>
      </form>
      {/* <Container>
        <H1>Protected</H1>
      </Container> */}
    </div>
  );
}

export default App;
