
const dbfunc = require('./db_methods.js')

module.exports = [{
      name: 'insert_details',
      method: dbfunc.insert_details,
      options: {}
    },
    {
      name: 'populate_details',
      method: dbfunc.populate_details,
      options: {}
    },
    {
      name: 'populate_array',
      method: dbfunc.populate_array,
      options: {}
    },
    {
      name: 'query_populate_array',
      method: dbfunc.query_populate_array,
      options: {}
    }
];
