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
import { setTodos, TodoStateInterface, togglePanel } from "./GlobalRedux/Features/todos/todoSlice";
import CreateTodoPanel from "./ui/CreateTodoPanel";

export default function Home() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [todo, setTodo] = useState<TodoType>({ userId: 1, id: '', title: '', completed: false });
  const todos = useSelector((state: { todoReducer: TodoStateInterface }) => state.todoReducer.todos);
  const completedTodos = todos.filter(el => el.completed);



  useEffect(() => {
    axios.get(`${API}/todos`)
      .then(res => {
        dispatch(setTodos(res.data));
      })
      .catch(err => {
        throw new Error(err);
      });
  }, [dispatch]);

  return (
    <main
      className="min-h-screen p-4"
    >
      {todos.length > 0 &&
        <div className="todos-list">
          {todos.filter(el => !el.completed).map((todo, index) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </div>
      }

      <Accordeon
        title={`Завершенные ${completedTodos.length}`}
        className="mt-4"
      >
        {completedTodos.length > 0 &&
            <div>
              {completedTodos.map((todo, index) => (
                <Todo key={todo.id} todo={todo} />
              ))}
            </div>
          }
      </Accordeon>

      <CreateTodoPanel todo={todo} setTodo={setTodo} />
    </main>
  );
}
