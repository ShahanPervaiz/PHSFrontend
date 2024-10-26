const BASE_URL = 'https://azzportal.com/admin/public/api/v2';

// Helper function to handle API responses
const handleResponse = async (response) => {
    const data = await response.json();
    return {data };
};


// GET Method WITH Authorization Token
export const getRequestWithToken = async (endpoint, token, params = {}) => {
    const url = new URL(`${BASE_URL}/${endpoint}`);   
    // Add query parameters if any
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Pass token in headers
      },
    });
  
    return handleResponse(response);
  };
  
  // GET Method WITHOUT Authorization Token
  export const getRequest = async (endpoint, params = {}) => {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    // Add query parameters if any
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key])); 
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  };

  // POST Method WITH Authorization Token
export const postRequestWithToken = async (endpoint, token, body = {}) => {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Pass token in headers
      },
      body: JSON.stringify(body),
    });
  
    return handleResponse(response);
  };
  
  // POST Method WITHOUT Authorization Token
  export const postRequest = async (endpoint, body = {}) => {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  };

  // DELETE Method WITH Authorization Token
export const deleteRequestWithToken = async (endpoint, token) => {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Pass token in headers
      },
    });
  
    return handleResponse(response);
  };
  
  // DELETE Method WITHOUT Authorization Token
  export const deleteRequest = async (endpoint) => {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    return handleResponse(response);
  };
  
  
