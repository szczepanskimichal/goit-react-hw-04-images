import axios1 from 'axios';

const KEY = '40494461-a7c535355632b3301706f2786';
const API_URL = 'https://pixabay.com/api/';
let perPage = 40;

export const fetchFotos = async (query, page) => {
  const response = await axios1.get(API_URL, {
    params: {
      key: KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesear: true,
      per_page: perPage,
      page: page,
    },
  });

  console.log('fetchfotos');
  console.log(response);

  return response.data;
};
