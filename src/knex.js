const configs = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db.development.sqlite'
    }
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: './db.test.sqlite'
    }
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: './db.production.sqlite'
    }
  }
}

module.exports = require('knex')(configs[process.env.NODE_ENV || 'development'])
