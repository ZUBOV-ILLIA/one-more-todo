'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { API } from './lib/constants';
import { TodoType } from './types/definitions';
import Todo from './ui/Todo';
import Accordeon from './ui/Accordeon';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTodos,
  TodoStateInterface,
} from './GlobalRedux/Features/todos/todoSlice';
import CreateTodoPanel from './ui/CreateTodoPanel';
import CheckAllBtn from './ui/CheckAllBtn';
import RemoveManyBtn from './ui/icons/RemoveManyBtn';

export default function Home() {
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

  useEffect(() => {
    axios
      .get(`${API}/todos`)
      .then(res => {
        dispatch(setTodos(res.data));
      })
      .catch(err => {
        console.error(err);
      });
  }, [dispatch]);

  return (
    <main className="min-h-screen p-4 pb-24">
      <CheckAllBtn />

      {todos.length > 0 && (
        <div className="todos-list">
          {todos
            .filter(el => !el.completed)
            .map((todo, index) => (
              <Todo key={todo.id} todo={todo} />
            ))}
        </div>
      )}

      <Accordeon
        title={`Завершенные ${completedTodos.length}`}
        className="mt-4"
      >
        {completedTodos.length > 0 && (
          <div>
            {completedTodos.map(todo => (
              <Todo key={todo.id} todo={todo} />
            ))}

            <div className="flex justify-end mt-2 ">
              <RemoveManyBtn />
            </div>
          </div>
        )}
      </Accordeon>

      <CreateTodoPanel todo={todo} setTodo={setTodo} />
    </main>
  );
}
