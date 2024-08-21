import { useDispatch, useSelector } from "react-redux";
import { TodoStateInterface, togglePanel } from "../GlobalRedux/Features/todos/todoSlice";
import { todo } from "node:test";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import { TodoType } from "../types/definitions";
import { API } from "../lib/constants";

interface Props {
  todo: TodoType;
  setTodo: (todo: TodoType) => void;
  todos: TodoType[];
  setTodos: (todos: TodoType[]) => void;
}

export default function CreateTodoPanel({ todo, setTodo, todos, setTodos }: Props) {
  const dispatch = useDispatch();
  const isPanelVisible = useSelector((state: { todoReducer: TodoStateInterface }) => state.todoReducer.isPanelVisible);
  // const [todo, setTodo] = useState<TodoType>({ userId: 1, id: '', title: '', completed: false });
  // const [todos, setTodos] = useState<TodoType[]>([]);


  async function createTodo() {
    if (!todo.title.trim()) return;

    axios.post(`${API}/todo`, {
      ...todo,
      id: uuidv4(),
      title: todo.title.replace(/\s+/g, ' ').trim()
    })
      .then(res => {
        setTodos([res.data, ...todos]);
        setTodo({ userId: 1, id: '', title: '', completed: false });
        dispatch(togglePanel(false));
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  return (
    <>
      <div
        className={`duration-300 ${isPanelVisible ? 'opacity-0 invisible translate-x-11' : ''} fixed bottom-4 right-2 inline-flex justify-center items-center w-16 h-16  bg-indigo-700 text-black rounded-full text-4xl pb-1`}
        onClick={() => {
          dispatch(togglePanel(true));
        }}
      >
        +
      </div>

      {/* background */}
      <div
        className={`duration-300 ${isPanelVisible ? 'opacity-50' : 'opacity-0 invisible'} fixed top-0 bottom-0 left-0 right-0 flex bg-black`}
        onClick={() => {
          dispatch(togglePanel(false));
        }}
      ></div>

      <div className={`duration-300 ${isPanelVisible ? '' : 'translate-y-11 opacity-0 invisible'} fixed bottom-0 left-0 right-0 p-3 flex bg-neutral-800`}>
        <input
          type="checkbox"
          className="mr-2"
          disabled
        />
        <input
          className="text-xl w-full rounded outline-none px-2 bg-neutral-800 text-slate-100"
          type="text"
          name="todoInput"
          value={todo?.title}
          placeholder="Добавить задачу"
          onChange={e => setTodo({ ...todo, title: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') createTodo();
          }}
        />
        <button
          className={`${todo.title.trim() ? 'bg-slate-100' : 'bg-slate-400'} text-neutral-800 min-w-7 min-h-7 rounded`}
          onClick={createTodo}
        >
        ↑
        </button>
      </div>
    </>
  );
}
