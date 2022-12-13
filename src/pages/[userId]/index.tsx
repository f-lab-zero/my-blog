import { useEffect, useState } from "react";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { ArticleList, ArticleTagList } from "src/components/article";
import { findArticles } from "src/api/article";
import { findTag } from "src/api/tag";
import { useArticles } from "src/hooks/api/useArticle";
import { useTag } from "src/hooks/api/useTag";
import { PaginationButton } from "src/components/commons/PaginationButton";
import { Button } from "src/components/commons";

const ArticlePage = () => {
  const [pageNum, setPageNum] = useState(1);
  const {
    query: { userId, tag = "all" },
  } = useRouter();

  const {
    data: { articles, total },
    refetch,
  } = useArticles(userId, tag);
  // 객체로 넘기면 계속 리랜더링되고 함수 만들어요 useMemo 쓰던가 아니면 객체로 넘기지마세요
  const { data: tags } = useTag(userId as string);

  useEffect(() => {
    refetch(pageNum);
  }, [pageNum]);

  // 리팩터링 2판, 클린코드 보면 다 나옴
  return (
    <Container>
      <ArticleTagList tags={tags} />
      <ArticleList articles={articles} />
      <PaginationContainer>
        <PaginationButton
          total={total}
          dataLength={articles.length || 0}
          button={
            <Button
              size="medium"
              variant="primary"
              onClick={() => {//비즈니스 로직이 jsx에 있으면 화장성과 가독성이 떨어져요. 지금은 하나만 들어가있어도 향후에는 두개이상으로 늘어날 수 있기 때문이에요
                refetch();
                setPageNum((page) => page + 1);
              }}
            >
              목록 더 보기
            </Button>
          }
        />
      </PaginationContainer>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}: GetServerSidePropsContext) => {
  const { userId, tag = "all", page } = query;
  let pageNum = 0;

  if (page) pageNum = parseInt(page as string);

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(["articles", userId], () =>
      findArticles({ userId, tag, pageNum }),
    ),
    queryClient.prefetchQuery(["tag", userId], () => findTag(userId as string)),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ArticlePage;

const PaginationContainer = styled.div`
  text-align: center;
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

const Container = styled.div`
  padding-bottom: 2rem;
`;
