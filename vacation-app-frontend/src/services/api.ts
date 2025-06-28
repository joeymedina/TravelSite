import axios from 'axios';

export const api = axios.create({
  //fix this later to https://localhost:5026/api
  baseURL: 'http://localhost:5026/api', 
});