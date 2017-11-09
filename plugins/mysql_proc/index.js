
exports.register = function (server, options, next) {

      server.method(require('./lib/server_methods/database/config.js'));
      server.bind({dbmethods:server.methods});
      next();
};
exports.register.attributes = {
    pkg: require('./package.json')
};
