'use client';

import axios from "axios";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Input } from "postcss";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const pathname = usePathname();
  const inpRef = useRef<any>(null);
  const [todo, setDodo] = useState('');
  const [todos, setTodos] = useState<string[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [isFirstReq, setIsFirstReq] = useState(false);

  useEffect(() => {
    // console.log('pathname', pathname, location)
    if (isFirstReq) {
      return;
    }
    
    setIsFirstReq(() => true);
    
    axios.get('http://localhost:3001/todos')
      .then(res => {
        setTodos(res.data)
      })
      .catch(err => {
        console.log('err', err)
      })
  }, [])

  async function addTodo(val: string) {
    axios.post('http://localhost:3001/todo', { todo })
      .then(res => {
        setTodos(res.data)
      })
      .catch(err => {
        // console.log('err', err)
      })
  }

  console.log(todo)

  return (
    <main
      className="flex min-h-screen flex-col justify-between align-middle p-4"
    >
      <div
        className="absolute top-0 bottom-0 left-0 right-0"
        onClick={(e) => {
          // if (inpRef.current && inpRef.current.contains(e.target)) {
          //   return;
          // }
  
          // if (todo) {
          //   setTimeout(() => {
          //     if (inpRef.current) {
          //       inpRef.current.focus();
          //     }
          //   }, 0)
  
          //   return;
          // }
  
          setShowInput(prevVal => !prevVal);
  
          setTimeout(() => {
            if (inpRef.current) {
              inpRef.current.focus();
            }
          }, 0)
        }}
      >

      </div>
      {todos.length > 0 &&
        <div
          className="todos-list"
          style={{ color: 'white', marginBottom: 24 }}
        >
          {todos.map((todo, index) => (
            <div key={index}>{todo}</div>
          ))}
        </div>
      }

      {showInput &&
        <div className="absolute top-1/2 left-4 right-4 flex">
          <input
            ref={inpRef}
            className="text-xl w-full rounded-s"
            type="text"
            value={todo}
            onChange={(e) => {
              setDodo(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addTodo(todo);
                
                setDodo('');
                setShowInput(false);
              }
            }}
            style={{ color: 'black' }}
          />
          <button className="w-12 bg-slate-400 rounded-e">
            +
          </button>
        </div>
      }
      
    </main>
  );
}
