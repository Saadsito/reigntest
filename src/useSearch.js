import axios from 'axios';
import React, {useState, useEffect} from 'react';

export default function useSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  //every time a new query is requested, the "news" array will be cleaned so that it does not show us the same results
  useEffect(() => {
    setNews([])
  }, [query])

  //data is obtained from the api
  useEffect(() => {
    setLoading(true);
    axios({
      method: 'GET',
      url: `https://hn.algolia.com/api/v1/search_by_date?`,
      params: { query: query, page: pageNumber },
    }).then(res => {
      setNews(prevNews => {
        return [...prevNews, res.data.hits.map(n => ({
          author: n.author,
          story_title: n.story_title,
          story_url: n.story_url,
          created_at : n.created_at
        }))]
      })
      console.log(res.data);
      setHasMore(res.data.hits.length);
      setLoading(false);
    })
  }, [query, pageNumber])
  return {loading, news, hasMore}
}