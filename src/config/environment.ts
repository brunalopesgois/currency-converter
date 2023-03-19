import database from './database';
import server from './server';

export default () => {
  return {
    server: server(),
    database: database(),
  };
};
