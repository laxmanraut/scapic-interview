var jwt = require('jsonwebtoken');
var dbconig = require('../../db/config.json')
var MongoClient = require('mongodb').MongoClient;
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rautakshay136@gmail.com',
        pass: 'Enterthehel'
    },
    secure:false,
    port:25,
    tls: {
        rejectUnauthorized: false
    }
});

var mailOptions = {
    from: '"Akshay Raut" <rautakshay136@gmail.com>',
    to: '',
    subject: 'Sending Email using Node.js',
    html: ''
    
  };

exports.admin = function(request, reply){

    reply.file('public/html/admin-main.html');

}

exports.sendmail = function(request, reply){
    

    mailOptions.to = request.payload.email;

    request.payload.viewed = 'N';
    
    MongoClient.connect(dbconig.url, function(err, db) {
        if (err) throw err;
        
        db.collection("users").find().count(function(err, res) {
            if(err){
                throw err;
            }

            if(res>0){
                reply({
                    status: 'EXISTS'
                })
            }
            else{

                db.collection("users").insert(request.payload, function(err, res) {
                    if (err) throw err;
                    var token = jwt.sign(
                        request.payload,
                        'laxmanBbZJjyoXAdr8BUasdadZuiKKARWimKfrSmQ6fv8kZ7OFfc',
                        { algorithm: 'HS256'}
                    );
        
                    mailOptions.html = `
                        <html>
                        <body>
                            <div>
                                <form>
                                    <a href="http://localhost:8080/user/signin/`+token+`">Click here</a>
                                </form>
                            </div>
                        </body>
                        </html>
                    `
            
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                           throw err;
                        } else {
                            reply({
                                status: 'success'
                            });
                        }
                    });
                });
            }

        
        })
        
        
    });
}

exports.answered = function(request, reply){
    MongoClient.connect(dbconig.url, function(err, db) {
        if (err) throw err;
    
        var param = {};

         db.collection("answers").aggregate([{$group : {_id : "$user", score : {$sum : "$correct"}}}],function(err, res){
            if(err){
                throw err;
            }
            param.score = res;
            db.collection("users").find({"viewed":'Y'}).toArray(function(err, res){
                if(err){
                    reply(err);
                }
                db.close();
                param.viewed = res;
                reply(param);
            }); 
            
        });
    });
}

exports.viewAnswers = function(request, reply){
    
    
     MongoClient.connect(dbconig.url, function(err, db) {
        if (err) throw err;
    
        var param = {};

         db.collection("answers").find({user:request.params.id}).toArray(function(err, res){
            if(err){
                throw err;
            }
            //reply(res);
             reply.view('view-answers',{
                answers:res
            })
            
        });
    });

}

