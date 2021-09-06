import { Sequelize } from 'sequelize-typescript';
import { development, production } from '../config/db';

let config;

switch (process.env.NODE_ENV) {
  case 'development':
    config = development;
    break;
  case 'production':
    config = production;
    break;
  default:
    config = development;
}

export const db = new Sequelize(config);
