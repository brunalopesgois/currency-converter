import database from './database';
import http from './http';
import server from './server';

export default () => {
  return {
    server: server(),
    database: database(),
    http: http(),
  };
};
