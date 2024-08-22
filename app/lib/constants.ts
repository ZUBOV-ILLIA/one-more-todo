export let API = process.env.NEXT_PUBLIC_API;

if (location && location.hostname === "localhost") {
  API = process.env.NEXT_PUBLIC_LOKAL_API;
}