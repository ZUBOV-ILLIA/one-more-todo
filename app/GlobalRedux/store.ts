'use client';

// guide to connect reduxToolkit/nextJs appRouter
// https://youtu.be/Onekwb2l9zg?si=stQQx3WF-r-eGXGR
// 

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './Features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
