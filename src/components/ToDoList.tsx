import { keyboard } from "@testing-library/user-event/dist/keyboard";
import { useForm } from "react-hook-form";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

interface IForm {
  toDo: string;
}

interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

const toDoState = atom<IToDo>({
  key: "toDo",
  default: [],
});

function ToDoList() {
  // const value = useRecoilValue(toDoState);
  // const modFn = useSetRecoilState(toDoState);
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = (data: IForm) => {
    console.log("add to do", data.toDo);
    setToDos((oldToDos) => {
      [{ text: toDo, id: Date.now(), category: "TO_DO" }, ...oldToDos];
    });
    setValue("toDo", "");
  };
  return (
    <div>
      <h1>To Dos</h1>
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("toDo", {
            required: "Please write to do",
          })}
          type="text"
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map(toDo => <li key={toDo.text}></li> )}
        <li></li>
      </ul>
    </div>
  );
}
export default ToDoList;
