const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://my-first-next-app.herokuapp.com'
    : 'http://localhost:3000';

export default baseUrl;
