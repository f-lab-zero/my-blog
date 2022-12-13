import api from "./core";
import {
  findArticlesRequest, // type인데 소문자임
  findArticleRequest,
  PostArticleRequest,
} from "src/models/article";

export const postArticle = async (data: PostArticleRequest) =>
  await api.post("/api/article", data);

export const deleteArticle = async (id: string | string[] | undefined) => {
  // type을 하나로! 왜냐? 타입은 무조건 좁게 사용하는게 좋다!!! 넓을 수록 최악 가장 넓은게 any
  const { data } = await api.delete(`/api/article?id=${id}`); // qs 라이브러리 보세요~
  return data;
};
// get 혹은 fetch 로 많이 사용함
export const findArticles = async ({
  userId,
  tag,
  pageNum,
}: findArticlesRequest) => {
  const { data } = await api.get(
    encodeURI(
      `/api/users/${userId as string}/articles?q=${
        tag as string
      }&page=${pageNum}`, // qs 라이브러리 보세요~ encodeURI는 불필요
    ),
  );
  return data;
};

export const findArticle = async ({ userId, id }: findArticleRequest) => {
  const { data } = await api.get(
    encodeURI(`/api/users/${userId as string}/articles/${id as string}`),
  );
  return data;
};
