import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";

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

const TrashCan = styled.div`
  width: 100px;
  height: 100px;
  background-color: lightgray;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    console.log(info);
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];

        console.log(sourceBoard, taskObj);
        sourceBoard.splice(source.index, 1);
        sourceBoard.splice(source?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
        };
      });
    }
    if (destination?.droppableId !== source.droppableId && destination?.droppableId !== "delete") {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];

        console.log(sourceBoard, taskObj);
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
    if (destination?.droppableId === "delete") {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        sourceBoard.splice(source.index, 1)

        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <>
            {Object.keys(toDos).map((boardId) => {
              return <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />;
            })}
            <Droppable droppableId="delete">
              {(provided) => (
                <TrashCan {...provided.droppableProps} ref={provided.innerRef}>
                  delete
                </TrashCan>
              )}
            </Droppable>
          </>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
