import axios from 'axios';
import { API_URL } from './_base';

/**
 *
 * @param {string} payload
 * @param {string} payload.username
 * @param {string} payload.password
 *
 * @return {Promise<resolve, reject>}
 */
export const authLogin = (payload: any) =>
  axios.post(`${API_URL}/api/auth/local`, payload);

/**
 *
 * @param {object} payload
 * @param {string} payload.email
 * @param {string} payload.username
 * @param {string} payload.company
 * @param {string} payload.password
 *
 * @return {Promise<resolve, reject>}
 */
export const authRegister = (payload: any) =>
  axios.post(`${API_URL}/api/auth/local/register`, payload);
