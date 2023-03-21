import database from './database';
import http from './http';
import server from './server';
import testDb from './test-db';

export default () => {
  return {
    server: server(),
    database: database(),
    http: http(),
    testDb: testDb(),
  };
};
