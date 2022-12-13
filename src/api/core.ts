import axios from "axios";

// axios Instance 만드는거!
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_VERCEL_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5 * 1000, // 타임아웃 셋팅도 보통 함. 5초 지나면 timeout error 남 connect 끊음
});
export default api;
