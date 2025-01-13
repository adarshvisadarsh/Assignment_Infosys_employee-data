import axios from 'axios';

const apiRequest = async ({ url, data = null, headers = {} }) => {
  try {
    const response = await axios({
      url,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    throw error.response
      ? { status: error.response.status, message: error.response.data }
      : { status: 500, message: error.message };
  }
};

export default apiRequest;
