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
      className="flex min-h-screen flex-col items-center justify-center p-24"
      onClick={(e) => {
        if (inpRef.current && inpRef.current.contains(e.target)) {
          return;
        }

        if (todo) {
          setTimeout(() => {
            if (inpRef.current) {
              inpRef.current.focus();
            }
          }, 0)

          return;
        }

        setShowInput(prevVal => !prevVal);

        setTimeout(() => {
          if (inpRef.current) {
            inpRef.current.focus();
          }
        }, 0)
      }}
    >
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
        <input
          ref={inpRef}
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
      }
      
    </main>
  );
}
