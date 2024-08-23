import { useDispatch, useSelector } from "react-redux";
import { setTodos, TodoStateInterface } from "../GlobalRedux/Features/todos/todoSlice";
import axios from "axios";
import { API } from "../lib/constants";
import { useEffect, useState } from "react";
import IconLoader from "./icons/IconLoader";
import IconSuccess from "./icons/IconSuccess";

export default function CheckAllBtn() {
  const dispatch = useDispatch();
  const todos = useSelector((state: { todoReducer: TodoStateInterface }) => state.todoReducer.todos);
  const [isRequest, setIsRequest] = useState(false);
  const [completedEvery, setCompletedEvery] = useState(false);

  useEffect(() => {
    setCompletedEvery(todos.every(el => el.completed === true));
  }, [todos]);

  function setAllCompleted() {
    if (isRequest) return;

    const todoIds = todos.map(el => el.id);

    setIsRequest(true);
    axios.patch(`${API}/todos`, { ids: todoIds, completed: !completedEvery })
      .then(res => {
        setCompletedEvery(!completedEvery);
        dispatch(setTodos(todos.map(el => ({ ...el, completed: !completedEvery }))));
        setIsRequest(false);
      })
      .catch(err => {
        setIsRequest(false);
        throw new Error(err);
      });
  }

  return (
    <div className="w-9 h-9 p-1 mb-4 relative"
      onClick={setAllCompleted}
    >
      <div className={`absolute h-7 w-7 top-1 left-1 ${!isRequest ? 'opacity-0 invisible' : ''} bg-black duration-300`}>
        <IconLoader  />
      </div>
      <IconSuccess className={`${completedEvery ? 'fill-slate-100' : 'fill-slate-500'}`} />
    </div>
  );
}