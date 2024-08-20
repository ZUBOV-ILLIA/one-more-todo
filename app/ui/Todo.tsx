import { useState } from "react";
import { TodoType } from "../types/definitions";
import axios from "axios";
import { API } from "../lib/constants";

interface Props {
  todo: TodoType;
}

export default function Todo({ todo }: Props) {
  const [isChecked, setIsChecked] = useState(todo.completed);
  const [isImportant, setIsImportant] = useState(false);

  function checkTodo() {
    axios.patch(`${API}/todos/${todo.id}`, {
      completed: !isChecked
    })
      .then(res => {
        console.log(res.data);

        setIsChecked(!isChecked);
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  return (
    <div className="mb-0.5 p-3 flex bg-neutral-800 text-slate-100 rounded justify-between">
      <div className="flex">
        <input
          type="checkbox"
          className="mr-2 self-start mt-1.5"
          checked={isChecked}
          onChange={checkTodo}
        />
        {todo.title}
      </div>
      <input
          type="checkbox"
          className=""
          checked={isImportant}
          onChange={() => setIsImportant(!isImportant)}
        />
    </div>
  );
}
