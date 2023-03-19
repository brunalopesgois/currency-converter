export default () => ({
  dbName: process.env.DB_NAME || 'converter_db',
  user: process.env.DB_USER || 'converter_user',
  password: process.env.DB_PASSWORD || 'q1w2e3r4',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  type: 'postgresql',
  autoLoadEntities: true,
});
