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

export default function Home() {
  const pathname = usePathname();
  const inpRef = useRef<any>(null);
  const [todo, setTodo] = useState<TodoType>({ userId: 1, id: '', title: '', completed: false });
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isFirstReq, setIsFirstReq] = useState(false);

  useEffect(() => {
    setIsFirstReq(() => true);

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

        setTodos([...todos, res.data]);
        setTodo({ userId: 1, id: '', title: '', completed: false });
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  return (
    <main
      className="flex min-h-screen flex-col justify-between align-middle p-4"
    >
      <div className="absolute top-0 bottom-0 left-0 right-0"></div>
      {todos.length > 0 &&
        <div
          className="todos-list z-10"
          style={{ color: 'white', marginBottom: 24 }}
        >
          {todos.map((todo, index) => (
            // <div key={index} className="mb-2 pt-2 border-t border-t-slate-400 first:border-0">
            //   {todo.title}
            // </div>

            <Todo key={todo.id} todo={todo} />
          ))}
        </div>
      }

      <div className="sticky top-3/4 left-4 right-4 flex">
        <input
          ref={inpRef}
          className="text-xl w-full rounded-s outline-none pl-2"
          type="text"
          value={todo?.title}
          onChange={e => setTodo({ ...todo, title: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') createTodo();
          }}
          style={{ color: 'black' }}
        />
        <button
          className="w-12 bg-slate-400 rounded-e"
          onClick={createTodo}
        >
          +
        </button>
      </div>

    </main>
  );
}
