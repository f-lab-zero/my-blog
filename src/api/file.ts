import api from "./core";

export const deleteFiles = (data: any) => {
  // any 사용하지 마세요 절대로
  return api.post("/api/file", data);
};
