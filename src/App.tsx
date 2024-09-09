import { DragDropContext, Draggable, DraggableProvided, DraggableStateSnapshot, Droppable, DroppableProvided, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
import { useState } from "react";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  width: 100%;
  > div {
    display: flex;
  }
`;

const TrashCan = styled.div`
  width: 100px;
  height: 100px;
  background-color: lightgray;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [categories, setCategories] = useState<string[]>(Object.keys(toDos)); // 복사해온 오브젝트 카피의 key를 array로 변환

  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    console.log(info);

    if (!destination) return;
    if (source.droppableId === "categories" && destination?.droppableId === "categories") {
      const categoriesCopy = [...categories];
      const [movedCategory] = categoriesCopy.splice(source.index, 1);
      categoriesCopy.splice(destination?.index, 0, movedCategory);
      setCategories(categoriesCopy);
      console.log("달라달라 카테고리 난달라");
      console.log(categoriesCopy);
    } else {
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
          sourceBoard.splice(source.index, 1);

          return {
            ...allBoards,
            [source.droppableId]: sourceBoard,
          };
        });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="categories" direction="horizontal">
            {(provided: DroppableProvided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <>
                  {categories.map((category, index) => {
                    return (
                      <Draggable key={category} draggableId={category} index={index}>
                        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
                          return (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                backgroundColor: snapshot.isDragging ? "lightgreen" : "white",
                                ...provided.draggableProps.style,
                              }}
                            >
                              <Board key={category} boardId={category} toDos={toDos[category]} />
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                </>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Boards>
        <Droppable droppableId="delete">
          {(provided) => (
            <TrashCan {...provided.droppableProps} ref={provided.innerRef}>
              delete
              {provided.placeholder}
            </TrashCan>
          )}
        </Droppable>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
