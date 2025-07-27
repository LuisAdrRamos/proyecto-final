import axios from './axios';

export async function login(username: string, password: string): Promise<string> {
  const { data } = await axios.post('/login', { username, password });
  return data.token;
}
