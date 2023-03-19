export default () => ({
  timeout: parseInt(process.env.HTTP_TIMEOUT) || 5000,
  maxRedirects: parseInt(process.env.HTTP_MAX_REDIRECTS) || 5,
});
