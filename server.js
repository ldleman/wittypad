const io = require('socket.io')();


io.on('connection', (client) => {

  //Connection
  client.on('authenticate', (credentials) => {
    console.log('client try to authenticate with ', credentials.login);

    client.user = {
    	name:'DOE',
    	login:'jdoe',
    	firstname : 'John',
    	avatar : 'https://i0.wp.com/www.newsshare.in/wp-content/uploads/2017/04/Miniclip-8-Ball-Pool-Avatar-11.png?resize=525%2C525'
    }

    client.emit('authentified', client.user);
  });

  //Logout
  client.on('logout', () => {
    console.log('client want to logout : ', client.user.login);
  });

});

io.listen(8000);
console.log('listening on port ', 8000);