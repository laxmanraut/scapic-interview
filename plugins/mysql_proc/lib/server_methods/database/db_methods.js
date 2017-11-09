
const mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pass',
    database: 'scapic',
    multipleStatements: true

});
exports.insert_details = function(values, next){

      var sp_name = values.sp_name;
      var sp_param = values.sp_param;
      var query = 'SET @out=1; CALL '+sp_name+'(';
      for(var obj in sp_param){
          query += '"'+sp_param[obj]+'",';
      }
      query +='@out); SELECT @out as iout'

      db.query(query,function(err,rows){
          if(err){
            throw err;
          }
          return next(rows[rows.length-1][0].iout,null);
      });
};

exports.populate_details = function(values, next){

      var sp_name = values.sp_name;
      var sp_param = values.sp_param;
      var query = 'CALL '+sp_name+'(';

      for(var obj in sp_param){
          query += '"'+sp_param[obj]+'",';
      }

      if(query.substring(query.length-1,query.length) == ',')
          query = query.substring(0,query.length-1);
      query +=')'

      db.query(query,function(err,rows){
          if(err){
            throw err;
          }
          next(rows[0][0],null);
      });
}

exports.populate_array = function(values, next){

      var sp_name = values.sp_name;
      var sp_param = values.sp_param;
      var query = 'CALL '+sp_name+'(';

      for(var obj in sp_param){
          query += '"'+sp_param[obj]+'",';
      }

      if(query.substring(query.length-1,query.length) == ',')
          query = query.substring(0,query.length-1);
      query +=')'

      db.query(query,function(err,rows){
          if(err){
            throw err;
          }
          next(rows[0],null);
      });
}

exports.query_populate_array = function(values, next){
  db.query(values,function(err,rows){
      if(err){
        throw err;
      }
      next(rows,null);
  });
}
