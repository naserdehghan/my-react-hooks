import { BehaviorSubject } from "rxjs";
import { useSubject, useValue } from "./hooks/core";

const todo$ = new BehaviorSubject<{ text: string; checked: boolean }[]>([]);
const useTodo = () => useSubject(todo$, "Todo");

todo$.subscribe({
  next: (todo) => console.log(todo),
  error: (error) => console.log("TODO ERROR", error),
  complete: () => console.log("TODO COMPLETED"),
});

function TodoList() {
  const [todo, setTodo] = useTodo();

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
  const [todoData, setTodoData] = useValue({ text: "" }, "Data");
  const [, setTodo] = useTodo();

  const createTodo = () => {
    if (todoData.text.length == 0) return;
    setTodo((_) => _.push({ text: todoData.text, checked: false }));
    setTodoData((_) => (_.text = ""));
  };

  return (
    <div>
      <input
        placeholder="Your todo"
        value={todoData.text}
        onChange={(ev) => setTodoData((_) => (_.text = ev.target.value))}
        onKeyUp={(ev) => (ev.key == "Enter" ? createTodo() : null)}
        style={{ marginInlineEnd: 8 }}
      />
      <button onClick={createTodo}>Add</button>
      <hr />
      <TodoList />
    </div>
  );
}
