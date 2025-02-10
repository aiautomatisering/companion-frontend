const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  env: import.meta.env.MODE, // `MODE` is the equivalent of `NODE_ENV` in Vite
};

export const configuration = () => {
  if (!config.apiUrl) throw new Error('VITE_API_URL is missing!');
  if (!config.env) throw new Error('ENV is missing!');
  return config;
};
