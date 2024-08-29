import { atom } from "recoil";

interface IToDoState {
  [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    to_do: ["a", "b", "c", "d", "e"],
    doing: ["f", "g"],
    done: ["h", "i"],
  },
});
