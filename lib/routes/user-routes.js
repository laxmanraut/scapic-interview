const Handlers = require('../handlers/user-handler.js');

module.exports = [
    {
        method: 'GET',
        path: '/user/public/scripts/{params*}',
        handler: {
          directory: {
            path: 'public/scripts'
          }
        }
    },
    {
        method: 'GET',
        path: '/user/signin/{token}',
        handler: Handlers.signIn
    },
    {
        method: 'GET',
        path: '/user/verify',
        config: { 
             auth: {
                strategy: 'google',
                mode: 'try'
            }, 
            handler: Handlers.verify
         } 
    },
    {
        method: 'GET',
        path: '/user/userlist',
        handler: Handlers.userList
    },
    {
        method: 'POST',
        path: '/user/submitans',
        handler: Handlers.submitAnswers
    },
    {
        method: 'GET',
        path: '/user/score',
        handler: Handlers.score
    },
    {
        method: 'GET',
        path: '/user/getscore',
        handler: Handlers.getScore
    }
]