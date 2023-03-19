import { Options } from '@mikro-orm/core';
import database from './database';

const config: Options = database() as Options;

export default config;
