import {
  setTodos,
  TodoStateInterface,
} from '@/app/GlobalRedux/Features/todos/todoSlice';
import { API } from '@/app/lib/constants';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconLoader from './IconLoader';
import { TodoType } from '@/app/types/definitions';

export default function RemoveManyBtn() {
  const dispatch = useDispatch();
  const todos = useSelector(
    (state: { todoReducer: TodoStateInterface }) => state.todoReducer.todos,
  );
  const [isRequest, setIsRequest] = useState(false);

  function removeCompleted() {
    if (isRequest) return;

    const completedTodos: TodoType[] = [];
    const notCompletedTodos: TodoType[] = [];

    todos.forEach(el => {
      if (el.completed) {
        completedTodos.push(el);
      } else {
        notCompletedTodos.push(el);
      }
    });

    setIsRequest(true);
    axios
      .patch(`${API}/todos`, {
        ids: completedTodos.map(el => el.id),
        action: 'delete',
      })
      .then(res => {
        setIsRequest(false);
        dispatch(setTodos(todos.filter(el => !el.completed)));
      })
      .catch(err => {
        setIsRequest(false);
        throw new Error(err);
      });
  }

  return (
    <div className="flex items-center">
      <IconLoader
        className={`h-5 ${!isRequest ? 'opacity-0 invisible' : ''} duration-300`}
      />
      <button
        className="p-1 cursor-pointer text-red-500 active:text-red-700 border-none text-sm"
        onClick={removeCompleted}
      >
        Удалить завершенные
      </button>
    </div>
  );
}
