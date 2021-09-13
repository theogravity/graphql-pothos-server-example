import { Sequelize } from 'sequelize-typescript';
import { development, production, test } from '../config/db';

let config;

switch (process.env.NODE_ENV) {
  case 'development':
    config = development;
    break;
  case 'production':
    config = production;
    break;
  case 'test':
    config = test;
    break;
  default:
    config = development;
}

export const db = new Sequelize(config);
