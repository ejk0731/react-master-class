import { useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { toDoState } from "../atoms";
import ToDo from "./ToDo";

// [
//   {
//     text: " sd",
//     id: 1723542190734,
//     category: "TO_DO",
//   },
//   {
//     text: "a a",
//     id: 1723542187782,
//     category: "TO_DO",
//   },
//   {
//     text: "a ",
//     id: 1723542185973,
//     category: "TO_DO",
//   },
//   {
//     text: "ZfSf",
//     id: 1723541790224,
//     category: "TO_DO",
//   },
//   {
//     text: "d",
//     id: 1723541788280,
//     category: "TO_DO",
//   },
// ];

function ToDoList() {
  const toDos = useRecoilValue(toDoState);
  console.log(toDos);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />

      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}
export default ToDoList;