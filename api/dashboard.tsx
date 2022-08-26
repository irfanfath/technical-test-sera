import axios from 'axios';
import { API_URL, CONFIG_HEADER } from './_base';

export const getListApiDeveloperLog = () =>
  axios.get(`${API_URL}/api/articles`, CONFIG_HEADER);

export const createArticle = (payload: any) =>
  axios.post(`${API_URL}/api/articles`, payload, CONFIG_HEADER);
