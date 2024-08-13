import { IToDo } from "../atoms";

function ToDo({ text }: IToDo) {
  return <li>{text}
  <button>To Do</button>
  <button>Doing</button>
  <button>Done</button>
  </li>;
}
export default ToDo;
