export const API = location.hostname === 'localhost'
  ? process.env.NEXT_PUBLIC_LOCAL_API
  : process.env.NEXT_PUBLIC_API;
