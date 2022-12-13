import { render } from '@testing-library/react';

import ArticleBox from './ArticleBox';

jest.mock('next/image'); // 이렇게 하면 자동으로 __mocks__ 폴더에서 next/image를 찾아서 mock을 해준다.

describe('ArticleBox', () => {
  const renderArticleBox = () => render(
    <ArticleBox />,
  );

  it('should ', () => {
    
  });
});
