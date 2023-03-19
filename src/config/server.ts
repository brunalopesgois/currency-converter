export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  name: process.env.APP_NAME || 'converter-service',
  version: process.env.npm_package_version,
  environment: process.env.NODE_ENV || 'development',
});
