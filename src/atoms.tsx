import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}
interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "TO DO": [{text: "rksk", id: 123}, {text: "rkskadas", id: 13}],
    DOING: [],
    DONE: [],
    "DO LATER": [],
  },
});
