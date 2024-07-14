import App from './App';
import { useArticles } from './hooks/useArticles';
import { render, screen } from '@testing-library/react';

jest.mock('./hooks/useArticles');
describe('App component', () => {
  
  it('exists', () => {
    expect(App).toBeDefined();
  })

  const mockArticles = [
    { id: 1, title: 'Article 1', abstract: 'Abstract 1', published_date: '2023-01-01', media: {} },
    { id: 2, title: 'Article 2', abstract: 'Abstract 2', published_date: '2023-01-02', media: {} },
  ];
  const mockCurrentPage = 1;
  const mockSetCurrentPage = jest.fn();

  beforeEach(() => {
    (useArticles as jest.Mock).mockReturnValue({
      articles: mockArticles,
      currentPage: mockCurrentPage,
      setCurrentPage: mockSetCurrentPage,
    });
  });

  it('renders Navbar, ArticleList, and Pagination components', () => {
    render(<App />);

    // Check if Navbar component is rendered
    const navbarElement = screen.getByRole('navigation');
    expect(navbarElement).toBeInTheDocument();

    // Check if ArticleList component is rendered
    const articleListElement = screen.getByTestId('article-list');
    expect(articleListElement).toBeInTheDocument();

    // Check if Pagination component is rendered
    const paginationElement = screen.getByTestId('pagination');
    expect(paginationElement).toBeInTheDocument();
  });

  it('passes correct props to ArticleList and Pagination components', () => {
    render(<App />);

    mockArticles.forEach((article) => {
      expect(screen.getByText(article.title)).toBeInTheDocument();
      expect(screen.getByText(article.abstract)).toBeInTheDocument();
      expect(screen.getByText(article.published_date)).toBeInTheDocument();
    });

    // Check if Pagination receives correct currentPage prop
    const paginationProps = screen.getByTestId('pagination').getAttribute('id');
    expect(paginationProps).toEqual(String(mockCurrentPage));
  });
});
