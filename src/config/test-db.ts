export default () => ({
  dbName: process.env.TEST_DB_NAME || 'test_converter_db',
  user: process.env.TEST_DB_USER || 'test_converter_user',
  password: process.env.TEST_DB_PASSWORD || 'q1w2e3r4',
  host: process.env.TEST_DB_HOST || 'localhost',
  port: parseInt(process.env.TEST_DB_PORT) || 5433,
  type: 'postgresql',
  entities: [__dirname + './../../dist/currencies/entities/**/*.js'],
  entitiesTs: [__dirname + './../currencies/entities/**/*.ts'],
});
