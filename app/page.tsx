'use client';

import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { API } from './lib/constants';
import { TodoType } from './types/definitions';
import Todo from './ui/Todo';
import Accordeon from './ui/Accordeon';
import { useDispatch, useSelector } from 'react-redux';
import Sortable from 'sortablejs';
import {
  setTodos,
  TodoStateInterface,
} from './GlobalRedux/Features/todos/todoSlice';
import CreateTodoPanel from './ui/CreateTodoPanel';
import CheckAllBtn from './ui/CheckAllBtn';
import RemoveManyBtn from './ui/icons/RemoveManyBtn';

export default function Home() {
  const todoListRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [todo, setTodo] = useState<TodoType>({
    userId: 1,
    id: '',
    title: '',
    completed: false,
  });
  const todos = useSelector(
    (state: { todoReducer: TodoStateInterface }) => state.todoReducer.todos,
  );
  const completedTodos = todos.filter(el => el.completed);
  const [isError, setIsError] = useState(false);
  const [isRequest, setIsRequest] = useState(false);

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      if (todoListRef.current && !Sortable.get(todoListRef.current)) {
        Sortable.create(todoListRef.current, {
          animation: 150,
        });
      }
    }
  }, [todos]);

  function getTodos() {
    if (isRequest) return;

    setIsError(false);
    setIsRequest(true);

    axios
      .get(`${API}/todos`)
      .then(res => {
        dispatch(setTodos(res.data));
        setIsRequest(false);
      })
      .catch(err => {
        console.error(err);
        setIsRequest(false);
        setIsError(true);
      });
  }

  return (
    <main className="min-h-screen max-w-screen-sm mx-auto p-4 pb-24 relative bg-gradient-to-t from-black">
      {isError && (
        <div className="flex flex-col items-center mx-auto w-max mt-24">
          <h3 className="mb-16">Что-то пошло не так</h3>
          <button
            className="bg-indigo-700 px-4 py-3 rounded"
            onClick={getTodos}
          >
            Обновить
          </button>
        </div>
      )}

      {isRequest && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="loader"></div>
        </div>
      )}

      {todos.length > 0 && (
        <>
          <CheckAllBtn />

          <div ref={todoListRef} className="todos-list">
            {todos
              .filter(el => !el.completed)
              .map((todo, index) => (
                <Todo key={todo.id} todo={todo} />
              ))}
          </div>
        </>
      )}

      {completedTodos.length > 0 && (
        <Accordeon
          title={`Завершенные ${completedTodos.length}`}
          className="mt-4"
        >
          <div>
            {completedTodos.map(todo => (
              <Todo key={todo.id} todo={todo} />
            ))}

            <div className="flex justify-end mt-2 ">
              <RemoveManyBtn />
            </div>
          </div>
        </Accordeon>
      )}

      <CreateTodoPanel todo={todo} setTodo={setTodo} />
    </main>
  );
}
