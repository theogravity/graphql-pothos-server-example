const path = require('path');

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: 'blog.dev.db',
    logging: false,
    models: [path.join(__dirname, '../db/models/*.model.ts')],
  },
  production: {
    dialect: 'sqlite',
    storage: 'blog.prod.db',
    logging: false,
    models: [path.join(__dirname, '../db/models/*.model.js')],
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
    models: [path.join(__dirname, '../db/models/*.model.ts')],
  },
};
