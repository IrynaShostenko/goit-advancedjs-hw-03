const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '51075470-1937ac32d69b36f6f43f67dbf';

export const fetchImages = query => {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    orientation: 'horizontal',
    image_type: 'photo',
    safesearch: true,
  });

  return fetch(`${BASE_URL}?${params}`).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
};
