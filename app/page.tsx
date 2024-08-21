'use client';

import axios from "axios";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Input } from "postcss";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { API } from "./lib/constants";
import { TodoType } from "./types/definitions";
import Todo from "./ui/Todo";
import Accordeon from "./ui/Accordeon";
import CounterReduxExample from "./ui/CounterReduxExample";
import { useDispatch, useSelector } from "react-redux";
import { TodoStateInterface, togglePanel } from "./GlobalRedux/Features/todos/todoSlice";
import CreateTodoPanel from "./ui/CreateTodoPanel";

export default function Home() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [todo, setTodo] = useState<TodoType>({ userId: 1, id: '', title: '', completed: false });
  const [todos, setTodos] = useState<TodoType[]>([]);


  useEffect(() => {
    axios.get(`${API}/todos`)
      .then(res => {
        setTodos(res.data);
      })
      .catch(err => {
        throw new Error(err);
      });
  }, []);


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

      <CreateTodoPanel todo={todo} setTodo={setTodo} todos={todos} setTodos={setTodos} />
    </main>
  );
}
