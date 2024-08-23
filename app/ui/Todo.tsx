import { useState } from "react";
import { TodoType } from "../types/definitions";
import axios from "axios";
import { API } from "../lib/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo, TodoStateInterface, updateTodo } from "../GlobalRedux/Features/todos/todoSlice";
import IconLoader from "./icons/IconLoader";

interface Props {
  todo: TodoType;
}

export default function Todo({ todo }: Props) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(todo.title);
  const [prevTitle, setPrevTitle] = useState(todo.title);
  const [isImportant, setIsImportant] = useState(false);
  const [isRequest, setIsRequest] = useState(false);

  function updatingTodo(completedValue?: boolean) {
    if (isRequest) return;
    
    const updatedTodo = {
      ...todo,
      title,
      completed: completedValue !== undefined ? completedValue : todo.completed,
    };
    
    setIsRequest(true);
    axios.patch(`${API}/todos/${todo.id}`, {
      title, completed: updatedTodo.completed,
    })
      .then(res => {
        dispatch(updateTodo(updatedTodo));
        setIsRequest(false);
      })
      .catch(err => {
        setIsRequest(false);
        throw new Error(err);
      });
  }

  function deleteTodo() {
    if (isRequest) return;

    setIsRequest(true);
    axios.delete(`${API}/todos/${todo.id}`)
      .then(res => {
        dispatch(removeTodo(todo.id));
        setIsRequest(false);
      })
      .catch(err => {
        setIsRequest(false);
        throw new Error(err);
      });
  }

  return (
    <div className={`mb-0.5 p-3 flex bg-neutral-800 ${todo.completed ? 'text-slate-500' : 'text-slate-100'} rounded justify-between relative`}>
      <div className={`flex grow ${todo.completed ? 'line-through' : ''}`}>
        
          <div className={`absolute left-1.5 bg-neutral-800 duration-300 ${!isRequest ? 'opacity-0 invisible' : ''}`}>
            <IconLoader className=" h-6 w-6" />
          </div>
        <input
          type="checkbox"
          className="mr-2 self-start mt-1.5"
          checked={todo.completed}
          onChange={() => {
            if (!isRequest) updatingTodo(!todo.completed);
          }}
        />

        <input
          type="text"
          value={title}
          onFocus={() => {
            setPrevTitle(title);
          }}
          onChange={(e) => {
            if (!isRequest) {
              setTitle(e.target.value);
            }
          }}
          className="w-full mx-3 bg-transparent outline-none resize-none"
          disabled={todo.completed}
          onKeyUp={(e) => {
            if (e.key === 'Enter' && prevTitle !== title) {
              updatingTodo();
            }
          }}
          onBlur={() => {
            if (prevTitle !== title) updatingTodo();
          }}
        />
      </div>

      <div className="whitespace-nowrap">
        <input
          type="checkbox"
          className=""
          checked={isImportant}
          onChange={() => {
            if (!isRequest) setIsImportant(!isImportant);
          }}
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
