import { useState } from "react";
import { TodoType } from "../types/definitions";
import axios from "axios";
import { API } from "../lib/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo, TodoStateInterface, updateTodo } from "../GlobalRedux/Features/todos/todoSlice";

interface Props {
  todo: TodoType;
}

export default function Todo({ todo }: Props) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(todo.title);
  const [isImportant, setIsImportant] = useState(false);
  const todos = useSelector((state: { todoReducer: TodoStateInterface }) => state.todoReducer.todos);


  function updatingTodo(completedValue?: boolean) {
    const updatedTodo = {
      ...todo,
      title,
      completed: completedValue !== undefined ? completedValue : todo.completed,
    };

    axios.patch(`${API}/todos/${todo.id}`, {
      title, completed: updatedTodo.completed,
    })
      .then(res => {
        dispatch(updateTodo(updatedTodo));
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  function deleteTodo() {
    axios.delete(`${API}/todos/${todo.id}`)
      .then(res => {
        dispatch(removeTodo(todo.id));
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  return (
    <div className={`mb-0.5 p-3 flex bg-neutral-800 ${todo.completed ? 'text-slate-500' : 'text-slate-100'}  rounded justify-between`}>
      <div className={`flex grow ${todo.completed ? 'line-through' : ''}`}>
        <input
          type="checkbox"
          className="mr-2 self-start mt-1.5"
          checked={todo.completed}
          onChange={() => updatingTodo(!todo.completed)}
        />

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mx-3 bg-transparent outline-none resize-none"
          disabled={todo.completed}
          onKeyUp={(e) => {
            if (e.key === 'Enter') updatingTodo();
          }}
          onBlur={() => updatingTodo()}
        />
      </div>

      <div className="whitespace-nowrap">
        <input
          type="checkbox"
          className=""
          checked={isImportant}
          onChange={() => setIsImportant(!isImportant)}
        />

        {todo.completed &&
          <button
            className="ml-3 cursor-pointer text-red-500 hover:text-red-700 border-none text-sm"
            onClick={deleteTodo}
          >
            Удалить
          </button>
        }
      </div>
    </div>
  );
}
