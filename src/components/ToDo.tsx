import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget.name);
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      if (name === "delete") {
        const newToDoList = oldToDos.filter((toDo) => toDo.id !== id);
        localStorage.setItem("toDos", JSON.stringify(newToDoList));
        return [...newToDoList];
      } else {
        const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
        const newToDo = { text, id, category: name as IToDo["category"] };
        localStorage.setItem("toDos", JSON.stringify([...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex + 1)]));
        return [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex + 1)];
      }
    });
  };
  return (
    <li>
      {text}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
      <button name="delete" onClick={onClick} style={{ background: "yellowGreen" }}>
        Delete
      </button>
    </li>
  );
}
export default ToDo;
