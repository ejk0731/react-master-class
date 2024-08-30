import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
import { useEffect } from "react";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    console.log(info);
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // same board move
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, draggableId);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    } else {
      // 혼자해보기 - cross board move
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const targetBoard = [...allBoards[destination?.droppableId]];
        sourceBoard.splice(source.index, 1);
        targetBoard.splice(destination?.index, 0, draggableId);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination?.droppableId]: targetBoard,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => {
            return <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />;
          })}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
