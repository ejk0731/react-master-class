import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}
interface IToDoState {
  [key: string]: IToDo[];
}

const localToDoStorage = JSON.parse(localStorage.getItem("toDoList") as string);
console.log(localToDoStorage);
export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: localToDoStorage, // 데이터가 만들어져 있어야 작동, 데이터가 없을땐?
  // {
  //   "TO DO": [],
  //   DOING: [],
  //   DONE: [],
  //   "DO LATER": [],
  // },
});
