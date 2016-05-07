const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({
  host: '127.0.0.1',
  port: 8080
});

server.register([require('inert')])

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: './gattermeier2014',
      redirectToSlash: true,
      index: true
    }
  }
})

server.start()
