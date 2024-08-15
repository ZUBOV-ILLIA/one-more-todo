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
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    console.log('pathname', pathname, location)

    axios.get('http://localhost:3001/123?userId=1')
      .then(res => {
        console.log('res', res)
      })
      .catch(err => {
        // console.log('err', err)
      })
  }, [])

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
      {showInput &&
        <input
          ref={inpRef}
          type="text"
          value={todo}
          onChange={(e) => {
            setDodo(e.target.value)
          }}
          style={{ color: 'red' }}
        />
      }
      
    </main>
  );
}
