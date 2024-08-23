import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { Categories, categoryState, toDoSelector } from "../atoms";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form>
        <select value={category} onInput={onInput}>
          <option value={Categories.TO_DO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
        </select>
      </form>
      <CreateToDo />

      <ul>
        {toDos?.map((aToDo) => (
          <ToDo key={aToDo.id} {...aToDo} />
        ))}
        {/* {category === "TO_DO" &&
          toDo.map((aToDo) => {
            return <ToDo key={aToDo.id} {...aToDo} />;
          })}
        {category === "DOING" &&
          doing.map((aToDo) => {
            return <ToDo key={aToDo.id} {...aToDo} />;
          })}
        {category === "DONE" &&
          done.map((aToDo) => {
            return <ToDo key={aToDo.id} {...aToDo} />;
          })} */}
      </ul>
    </div>
  );
}
export default ToDoList;
