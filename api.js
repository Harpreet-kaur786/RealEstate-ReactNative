import axios from 'axios';

const fetchVideos = async () => {
  const apiKey = 'oXAHOvbjEwENPE2hKG74i3pDybFaUAuFSq4YBAcz2zDuBkoBq1W9T02H'; // Replace with your API key
  const url = 'https://api.pexels.com/videos/search?query=real%20estate&per_page=5'; // Adjust query as needed

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: apiKey,
      },
    });

    console.log('Pexels API Response:', response.data);
    return response.data.videos; // Return video data
  } catch (error) {
    console.error('Error fetching videos:', error);
  }
};
