import axios from 'axios';
import {Config} from '../../src/Config/Config'

exports.handler = async function(event, context) {
  const { searchQuery, sort, sortOrder, pageSize } = event.queryStringParameters;

  const API_KEY = Config.TWINGLY_API; 

  try {
    const response = await axios.get('https://api.twingly.com/blog/search/api/v3/search', {
      params: {
        apikey: API_KEY,  
        q: `${searchQuery} sort:${sort} sort-order:${sortOrder} page-size:${pageSize}`,
        format: 'json',
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch blogs' }),
    };
  }
};
