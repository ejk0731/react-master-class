import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";
import { useRef } from "react";

const Wrapper = styled.div`
  padding-top: 10px;
  border-radius: 5px;
  min-height: 200px;
  background-color: ${(props) => props.theme.boardColor};
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) => (props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromThis ? "#b2be3c" : "transparent")};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

const Board = ({ toDos, boardId }: IBoardProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onClick = () => {
    inputRef.current?.focus();
    setTimeout(() => {
      inputRef.current?.blur();
    });
  };

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <input type="text" ref={inputRef} placeholder="grab me" />
      <button type="button" onClick={onClick}>
        click me
      </button>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => {
              return <DraggableCard key={toDo} toDo={toDo} index={index} />;
            })}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};
export default Board;
