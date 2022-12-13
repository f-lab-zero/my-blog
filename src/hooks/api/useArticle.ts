import { useQuery, useMutation } from "@tanstack/react-query";
import {
  findArticles,
  postArticle,
  findArticle,
  deleteArticle,
} from "src/api/article";
import { findArticlesRequest, findArticleRequest } from "src/models/article";

export const useArticles = ({ userId, tag, pageNum }: findArticlesRequest) => {
  return useQuery(
    ["articles", userId],
    () => findArticles({ userId, tag, pageNum }),
    {
      keepPreviousData: true,
      refetchOnMount: true,
      refetchOnWindowFocus: false, //요런건 QueryClient default options에 추가하면 좋아요
      // retry: false //요런건 QueryClient default options에 추가하면 좋아요
    },
  );
};

export const useArticle = (id: findArticleRequest) => {
  return useQuery(["article", id], () => findArticle(id));
};

export const usePostArticle = () => {
  return useMutation({ mutationFn: postArticle });
};

export const useDeleteArticle = () => {
  return useMutation({ mutationFn: deleteArticle });
};
