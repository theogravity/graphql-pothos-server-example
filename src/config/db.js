const path = require('path');

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: 'blog.dev.db',
    models: [path.join(__dirname, '../db/models/*.model.ts')],
  },
  production: {
    dialect: 'sqlite',
    storage: 'blog.prod.db',
    models: [path.join(__dirname, '../db/models/*.model.js')],
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    models: [path.join(__dirname, '../db/models/*.model.ts')],
  }
};
