export default () => ({
  port: parseInt(process.env.PORT) || 8080,
  database: {
    url: process.env.DATABASE_URL,
    host: process.env.DATABASE_HOST,
    name: process.env.DATABASE_NAME,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
  service: {
    storage: process.env.STORAGE_IP,
  },
});
