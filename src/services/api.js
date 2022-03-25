import axios from 'axios';
const getImages = async (searchQuery, page = 1) => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=25182947-9cfc659c765cf87b0696ff639&image_type=photo&orientation=horizontal&per_page=12`
  );

  return response.data;
};

const api = {
  getImages,
};

export default api;
