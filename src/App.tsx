import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import DraggableCard from "./Components/DraggableCard";
import Board from "./Components/Board";
import { stringify } from "querystring";

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

  // 혼자해보기 - same board move
  // const onDragEnd = ({ source, destination, draggableId }: DropResult) => {
  //   if (!destination) return;
  //   setToDos((oldToDos) => {
  //     const newToDos = { ...oldToDos };
  //     const selectedBoardToDos = newToDos[source.droppableId];

  //     const copyToDos = [...selectedBoardToDos];
  //     copyToDos.splice(source.index, 1);
  //     copyToDos.splice(destination.index, 0, draggableId);
  //     newToDos[source.droppableId] = copyToDos

  //     console.log(newToDos);

  //     return newToDos;
  //   });
  // };

  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
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
