
import { render, screen } from '@testing-library/react';
import ArticleList from './ArticleList';

const mockArticles = [
  {
    id: 1,
    title: 'Test Article 1',
    abstract: 'This is a test abstract for article 1.',
    published_date: '2023-01-01',
    section: 'Test Section',
    media: [
      {
        'media-metadata': [
          { url: 'https://example.com/image1.jpg', format: 'mediumThreeByTwo210' },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Test Article 2',
    abstract: 'This is a test abstract for article 2.',
    published_date: '2023-01-02',
    section: 'Test Section',
    media: [
      {
        'media-metadata': [
          { url: 'https://example.com/image2.jpg', format: 'mediumThreeByTwo210' },
        ],
      },
    ],
  },
];

describe('ArticleList', () => {
  it('renders the list of articles', () => {
    render(<ArticleList articles={mockArticles} />);
    
    mockArticles.forEach(article => {
      expect(screen.getByText(article.title)).toBeInTheDocument();
      expect(screen.getByText(article.abstract)).toBeInTheDocument();
      expect(screen.getByText(article.published_date)).toBeInTheDocument();
    //   expect(screen.getByText(article.section)).toBeInTheDocument();
    });
  });

  it('renders the article images correctly', () => {
    render(<ArticleList articles={mockArticles} />);
    
    mockArticles.forEach(article => {
      const image = screen.getByAltText(article.media[0]['media-metadata'][0].url);
      expect(image).toHaveAttribute('src', article.media[0]['media-metadata'][0].url);
    });
  });

  it('renders a dummy image if no media is provided', () => {
    const articlesWithoutMedia = [
      {
        ...mockArticles[0],
        media: [],
      },
    ];

    render(<ArticleList articles={articlesWithoutMedia} />);
    
    const dummyImage = screen.getByAltText('https://dummyimage.com/600x400/000/fff');
    expect(dummyImage).toHaveAttribute('src', 'https://dummyimage.com/600x400/000/fff');
  });
});
