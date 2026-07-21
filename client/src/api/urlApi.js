import api from './axiosInstance';

export const createUrl = async (originalUrl, customAlias = '') => {
  const payload = { originalUrl };
  if (customAlias.trim()) {
    payload.customAlias = customAlias.trim();
  }
  const { data } = await api.post('/urls', payload);
  return data.data;
};

export const getUrls = async () => {
  const { data } = await api.get('/urls');
  return data.data;
};

export const updateUrl = async (id, updates) => {
  const { data } = await api.put(`/urls/${id}`, updates);
  return data.data;
};

export const deleteUrl = async (id) => {
  const { data } = await api.delete(`/urls/${id}`);
  return data.data;
};
