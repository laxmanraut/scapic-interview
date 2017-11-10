var jwt = require('jsonwebtoken');

var dbconig = require('../../db/config.json')
var MongoClient = require('mongodb').MongoClient;

exports.signIn = function(request, reply){
    
    try {
        var decoded = jwt.verify(request.params.token, 'laxmanBbZJjyoXAdr8BUasdadZuiKKARWimKfrSmQ6fv8kZ7OFfc');
        
        reply.redirect('/user/verify')
            
        } catch(err) {
          reply('Invalid')
      }
}

exports.verify = function(request, reply){
  
  if (!request.auth.isAuthenticated) {
    reply('Invalid User');
  }
  else{
    MongoClient.connect(dbconig.url, function(err, db) {
      if (err) throw err;
  
      db.collection("users").find({ email: request.auth.credentials.profile.email}).count(function(err, res){
          if(err){
            throw err;
          }

          if(res>0){
            db.collection("answers").find({ user: request.auth.credentials.profile.email}).count(function(err, res){
              if(res>0){
                reply.redirect('/user/score').state('data', { email: request.auth.credentials.profile.email });
              }
              else{
               reply.file('public/html/questions.html').state('data', { email: request.auth.credentials.profile.email });
              }
            });
          }
          else{
            reply('Invalid User');
          }
      })
    });
  }

}

exports.userList = function(request, reply){

  if(request.state['data']){
    MongoClient.connect(dbconig.url, function(err, db) {
      if (err) throw err;
      console.log(request.state['data'].email);
      db.collection("users").update({ email:request.state['data'].email},{$set:{viewed:'Y'}},function(err, res){
          db.collection("questions").aggregate({ $sample: { size: 5 } },function(err, resq){
            reply(resq);
          });
      });
    }); 
  }
  else{
    reply.redirect('../user/verify');
  }
}

exports.submitAnswers = function(request, reply){

    var data = request.payload;
    if(request.state['data']){

      for(let i=0;i<data.length;i++){
          delete data[i]._id;
          data[i].user = request.state['data'].email;

          for(let j=0;j<data[i].answers.length;j++){

            if(data[i].answers[j].srno == data[i].answer){
              if(data[i].answers[j].correct == 'Y')
                  data[i].correct = 1;
              else
                data[i].correct = 0;
            }

          }
      }

      MongoClient.connect(dbconig.url, function(err, db) {
          if (err) throw err;
          
          db.collection("answers").find({user:request.state['data'].email}).count(function(err, res) {
            if (err) throw err;
            if(res>0){
              reply.file('public/html/score.html');
            }
            else{
              db.collection("answers").insertMany(data, function(err, res) {
                if (err) throw err;
                db.close();
  
                reply('success');
            });
          }
        })
      });
    }
    else{
      reply.redirect('../user/verify');
    }
}

exports.score = function(request, reply){
  
    reply.file('public/html/score.html');

}

exports.getScore = function(request, reply){
  
    if(request.state['data']){
      MongoClient.connect(dbconig.url, function(err, db) {
        if (err) throw err;
    
        db.collection("answers").find({ user: request.state['data'].email,correct:1}).count(function(err, res){
             reply(res);
        });
      }); 
    }
    else{
      reply.redirect('../user/verify');
    }
  }

