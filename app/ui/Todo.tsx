import { useState } from "react";
import { TodoType } from "../types/definitions";

interface Props {
  todo: TodoType;
}

export default function Todo({ todo }: Props) {
  const [isChecked, setIsChecked] = useState(todo.completed);
  const [isImportant, setIsImportant] = useState(false);

  return (
    <div className="mb-0.5 p-3 flex bg-neutral-800 text-slate-100 rounded justify-between">
      <div className="flex">
        <input
          type="checkbox"
          className="mr-2 self-start mt-1.5"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
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
