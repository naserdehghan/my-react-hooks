import { BehaviorSubject } from "rxjs";
import { useSubject } from "../plugin";

const name = "Todo";
export type Todo = Partial<{ text: string; checked: boolean }>;

// Prepare Subject
const localValue = localStorage.getItem(name);
const localValueParsed = localValue ? JSON.parse(localValue) : [];
const todo$ = new BehaviorSubject<Todo[]>(localValueParsed);

//Prepare Listen to Subject
todo$.subscribe((value) => {
  const valueStringed = JSON.stringify(value);
  localStorage.setItem(name, valueStringed);
});

//Hook
export const useTodo = () => useSubject(todo$, name);
