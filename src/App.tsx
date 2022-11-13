import { useState } from "react";
import { BehaviorSubject } from "rxjs";
import { useSubject } from "./utils/useSubject";
import { useValue } from "./utils/useValue";

const todo$ = new BehaviorSubject<{ text: string; checked: boolean }[]>([]);
todo$.subscribe((todo) => console.log(todo));

function TodoList() {
  const [todo, setTodo] = useSubject(todo$, "Todo");

  return (
    <ul style={{ listStyleType: "none" }}>
      {todo.map((t, i) => (
        <li key={i}>
          <input
            type="checkbox"
            checked={t.checked}
            onChange={(e) => setTodo((_) => (_[i].checked = e.target.checked))}
          />
          <span>{t.text}</span>
          <span
            style={{
              color: "red",
              cursor: "pointer",
              display: "inline-block",
              marginInlineStart: "8px",
            }}
            onClick={() => setTodo((_) => _.splice(i, 1))}
          >
            X
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const [todoText, setTodoText] = useState("");
  const [, setTodo] = useSubject(todo$, "Todo");

  const createTodo = () => {
    if (todoText.length == 0) return;
    setTodo((_) => _.push({ text: todoText, checked: false }));
    setTodoText("");
  };

  return (
    <div>
      <input
        placeholder="Your todo"
        value={todoText}
        onChange={(ev) => setTodoText(ev.target.value)}
        onKeyUp={(ev) => (ev.key == "Enter" ? createTodo() : null)}
        style={{ marginInlineEnd: 8 }}
      />
      <button onClick={createTodo}>Add</button>
      <hr />
      <TodoList />
    </div>
  );
}
