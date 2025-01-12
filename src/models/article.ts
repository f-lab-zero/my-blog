export interface Article {
  _id: string;
  title: string;
  tags: string[];
  content: string;
  syncTime: string;
  name: string;
  email: string;
  base64: string;
  introduction: string;
  thumbnailUrl: string;
}

export interface ArticleTag {
  _id: string;
  tagName: string;
  userId: string;
}

export interface findArticlesRequest {
  userId: string | string[] | undefined; //TODO type
  tag: string | string[] | undefined;
  pageNum: number;
}

export interface findArticleRequest {
  userId: string | string[] | undefined; //TODO type
  id: string | string[] | undefined;
}

export interface PostArticleRequest {
  content: string;
  tags: string[];
  title: string;
  thumbnailUrl: string;
  introduction: string;
  syncTime: string;
}

export interface ArticleTag {
  _id: string;
  categoryName: string;
  articleId: string;
  userId: string;
}
