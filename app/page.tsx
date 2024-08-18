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

export default function Home() {
  const pathname = usePathname();
  const inpRef = useRef<any>(null);
  const [todo, setTodo] = useState<TodoType>({ userId: 1, id: '', title: '', completed: false });
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [completedTodos, setCompletedTodos] = useState<TodoType[]>([]);
  const [isVisibleCreateTodo, setIsVisibleCreateTodo] = useState(false);

  useEffect(() => {
    axios.get(`${API}/todos`)
      .then(res => {
        console.log(res.data);

        setTodos(res.data);
      })
      .catch(err => {
        console.log('err', err);
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
        console.log(res);

        setTodos([res.data, ...todos]);
        setTodo({ userId: 1, id: '', title: '', completed: false });
        setIsVisibleCreateTodo(false);
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  return (
    <main
      className="flex min-h-screen flex-col justify-between align-middle p-4"
    >
      {/* Todos List */}
      {todos.length > 0 &&
        <div className="todos-list">
          {todos.map((todo, index) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </div>
      }

      {/* Completed Todos List */}
      <Accordeon title="Завершенные">
      {todos.length > 0 &&
          <div>
            {todos.map((todo, index) => (
              <Todo key={todo.id} todo={todo} />
            ))}
          </div>
        }
      </Accordeon>

      <div
        className={`duration-300 ${isVisibleCreateTodo ? 'opacity-0 invisible translate-x-11' : ''} fixed bottom-4 right-2 inline-flex justify-center items-center w-16 h-16  bg-indigo-700 text-black rounded-full text-4xl pb-1`}
        onClick={() => setIsVisibleCreateTodo(true)}
      >
        +
      </div>

      {/* background */}
      <div
        className={`duration-300 ${isVisibleCreateTodo ? 'opacity-50' : 'opacity-0 invisible'} fixed top-0 bottom-0 left-0 right-0 flex bg-black`}
        onClick={() => setIsVisibleCreateTodo(false)}
      ></div>

      <div className={`duration-300 ${isVisibleCreateTodo ? '' : 'translate-y-11 opacity-0 invisible'} fixed bottom-0 left-0 right-0 p-3 flex bg-neutral-800`}>
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
          className={`bg-slate-${todo.title.trim() ? '100' : '400'} text-neutral-800 min-w-7 min-h-7 rounded`}
          onClick={createTodo}
        >
        ↑
        </button>
      </div>

    </main>
  );
}
