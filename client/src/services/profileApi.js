import axios from 'axios';

export const getData = async (email) => {
  try {
    const response = await axios.get(`http://localhost:8000/users/${email}`)
    return response.data
  } catch(err) {
    console.log(err.message)
    return [];  
  }
};

export const updateData = async (email, data) => {
  try {
    const response = await axios.put(`http://localhost:8000/users/${email}`, JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    console.error(err.message);
    return [];
  }
}

export const auth = async (data, endpoint) => {
  try {
    console.log(data);
    const response = await axios.post(`http://localhost:8000/${endpoint}`, JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data
  } catch (err) {
    console.error(err.message)
    return [];
  }
}
