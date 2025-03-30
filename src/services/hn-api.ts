// src/services/hn-api.ts
import axios from 'axios';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export const fetchTopStories = async (page: number, limit: number = 10) => {
  try {
    const storyIds = await axios.get(`${BASE_URL}/topstories.json`);
    const pageIds = storyIds.data.slice(page * limit, (page + 1) * limit);
    
    const stories = await Promise.all(
      pageIds.map((id: number) => 
        axios.get(`${BASE_URL}/item/${id}.json`)
          .then(res => res.data)
      )
    );
    
    return stories;
  } catch (error) {
    console.error('Error fetching stories:', error);
    return [];
  }
};