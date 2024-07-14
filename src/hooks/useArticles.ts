import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';

const BASE_URL: string = "https://api.nytimes.com/svc/mostpopular/v2";
const API_KEY: string = "OGHJA3m2VkXBm9oydEDjzVV1j2aseWv6";

interface Article {
  id: number;
  title: string;
  url: string;
  byline: string;
  published_date: string;
  [key: string]: any;
}

interface ApiResponse {
  status: string;
  results: Article[];
}

/**
 * Custom hook for articles
 * 
 * @returns 
 */
export function useArticles() {
  const [articles, setArticles] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Fetch articles based on the current page.
   * This function sends a request to the NYT API
   * 
   */
  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/viewed/${currentPage}.json?api-key=${API_KEY}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: ApiResponse = await response.json();
      setArticles(data.results);
      setFilteredArticles(data.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [currentPage]);

  /**
   * Fetch articles on mount
   */
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  /**
   * Search articles by title
   * if input is empty fetch all articles
   * @param input 
   */
  const searchArticles = useCallback(debounce((input: string) => {
    if (!input) {
      setArticles(filteredArticles);
    } else {
      setArticles(filteredArticles.filter((article) =>
        article.title.toLowerCase().includes(input.toLowerCase())
      ));
    }
  }, 300), [articles]);

  return {
    articles,
    currentPage,
    loading,
    searchArticles,
    setCurrentPage
  };
}
