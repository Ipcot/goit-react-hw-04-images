import axios from 'axios';

export const fetchQuery = async (query, page) => {
  const API_KEY = '27561705-01d67e91a566568adc5cfd7f5';
  const BASE_URL = 'https://pixabay.com/api/';
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: false,
    page: page,
    per_page: 12,
  });

  const response = await axios(`${BASE_URL}?${searchParams}`).then(data => {
    return data.data.hits;
  });

  return response;
};
