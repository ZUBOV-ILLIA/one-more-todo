import { useDispatch, useSelector } from "react-redux";
import { addTodo, TodoStateInterface, togglePanel } from "../GlobalRedux/Features/todos/todoSlice";
import { todo } from "node:test";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import { TodoType } from "../types/definitions";
import { API } from "../lib/constants";

interface Props {
  todo: TodoType;
  setTodo: (todo: TodoType) => void;
}

export default function CreateTodoPanel({ todo, setTodo }: Props) {
  const dispatch = useDispatch();
  const isPanelVisible = useSelector((state: { todoReducer: TodoStateInterface }) => state.todoReducer.isPanelVisible);
  const [title, setTitle] = useState('');

  const todos = useSelector((state: { todoReducer: TodoStateInterface }) => state.todoReducer.todos);


  async function createTodo() {
    if (!title.trim()) return;

    const newTodo = {
      ...todo,
      id: uuidv4(),
      title: title.replace(/\s+/g, ' ').trim()
    };

    axios.post(`${API}/todo`, {
      ...newTodo
    })
      .then(res => {
        dispatch(addTodo(newTodo));
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
          name="title"
          value={title}
          placeholder="Добавить задачу"
          onChange={e => setTitle(e.target.value)}
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
