const Handlers = require('../handlers/admin-handler.js');

var Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/public/scripts/{params*}',
        handler: {
          directory: {
            path: 'public/scripts'
          }
        }
    },
    {
        method:'GET',
        path:'/admin',
        handler: Handlers.admin
    },
    {
        method: 'GET',
        path: '/admin/view-answers',
        handler: function(request, reply){

            reply.file(public/html/view-answers.html);

        }
    },
    {
        method:'POST',
        path:'/admin/sendmail',
        config: {
            validate: {
                payload: {
                    email: Joi.string().email()
                },
                failAction: function (request, reply, source, error) {
                    reply('contained an invalid field.').code(400);
                }
            }
        },
        handler: Handlers.sendmail
    },

    {
        method:'GET',
        path:'/admin/answered',
        handler: Handlers.answered
    },

    {
        method:'GET',
        path:'/admin/view-answers/{id}',
        handler: Handlers.viewAnswers
    }

]