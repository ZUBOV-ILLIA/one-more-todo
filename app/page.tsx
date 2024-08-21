'use client';

import axios from "axios";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Input } from "postcss";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { API } from "./lib/constants";
import { TodoType } from "./types/definitions";
import { v4 as uuidv4 } from 'uuid';
import Todo from "./ui/Todo";
import Accordeon from "./ui/Accordeon";
import CounterReduxExample from "./ui/CounterReduxExample";
import { useDispatch, useSelector } from "react-redux";
import { TodoStateInterface, togglePanel } from "./GlobalRedux/Features/todos/todoSlice";

export default function Home() {
  const pathname = usePathname();
  const inpRef = useRef<any>(null);
  const dispatch = useDispatch();
  const [todo, setTodo] = useState<TodoType>({ userId: 1, id: '', title: '', completed: false });
  const [todos, setTodos] = useState<TodoType[]>([]);

  const isPanelVisible = useSelector((state: { todoReducer: TodoStateInterface }) => state.todoReducer.isPanelVisible);

  useEffect(() => {
    axios.get(`${API}/todos`)
      .then(res => {
        setTodos(res.data);
      })
      .catch(err => {
        throw new Error(err);
      });
  }, []);

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
        // setIsVisibleCreateTodo(false);
        dispatch(togglePanel(false));
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  return (
    <main
      className="min-h-screen p-4"
    >
      <CounterReduxExample />

      {/* Todos List */}
      {todos.length > 0 &&
        <div className="todos-list">
          {todos.filter(el => !el.completed).map((todo, index) => (
            <Todo key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
          ))}
        </div>
      }

      {/* Completed Todos List */}
      <Accordeon
        title="Завершенные"
        className="mt-4"
      >
        {todos.length > 0 &&
            <div>
              {todos.filter(el => el.completed).map((todo, index) => (
                <Todo key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
              ))}
            </div>
          }
      </Accordeon>


      {/* CreateTodoPanel */}
      <div
        className={`duration-300 ${isPanelVisible ? 'opacity-0 invisible translate-x-11' : ''} fixed bottom-4 right-2 inline-flex justify-center items-center w-16 h-16  bg-indigo-700 text-black rounded-full text-4xl pb-1`}
        onClick={() => {
          // setIsVisibleCreateTodo(true);
          dispatch(togglePanel(true));
        }}
      >
        +
      </div>

      {/* background */}
      <div
        className={`duration-300 ${isPanelVisible ? 'opacity-50' : 'opacity-0 invisible'} fixed top-0 bottom-0 left-0 right-0 flex bg-black`}
        onClick={() => {
          // setIsVisibleCreateTodo(false);
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
          ref={inpRef}
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

    </main>
  );
}
