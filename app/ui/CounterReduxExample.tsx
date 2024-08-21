'use client';

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";
import { decrement, increment, incrementByAmount } from "../GlobalRedux/Features/counter/counterSlice";

export default function CounterReduxExample() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{count}</h1>

      <div className="flex">
        <button
          className="text-slate-100 bg-gray-800 p-3"
          onClick={() => dispatch(increment())}
        >
          increment
        </button>
        <button
          className="text-slate-100 bg-gray-800 p-3"
          onClick={() => dispatch(decrement())}
        >
          decrement
        </button>
        <button
          className="text-slate-100 bg-gray-800 p-3"
          onClick={() => dispatch(incrementByAmount(5))}
        >
          increment by amount
        </button>
      </div>
    </div>
  );
}
