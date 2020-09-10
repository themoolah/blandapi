// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/moolahData.db3'
    }
  },
  pool: {
    afterCreate: (conn, done) => {
       conn.run('PRAGMA foreign_keys = ON', done);
  }

},
seeds: {
  directory: '../data/seeds'
},
useNullAsDefault: true
};

