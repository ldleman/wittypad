var dir =  __dirname.replace(/\\/g, "/");  
module.exports = {
 


  //Fonction d'initialisation
   init: function(app) {
	var charactersPlugin = this;

	app.css(dir+'/main.css');

	
	//Sur l'evenement de lancement
	app.on('load',function(data){
		

			$('#tabs').append('<li data-tab="characters"><i class="fa fa-users"></i> Personnages</li>');
			$('#pages').append('<div style="display:none;padding:15px;" id="characters"></div>');
			$('#characters').append('<h3>Personnages</h3><ul id="peoples"></ul>');

		    var request = require("request");
			var url = "http://api.randomuser.me/?gender=female&nat=FR"

			request({
			    url: url,
			    json: true
			}, function (error, response, body) {


			    if (!error && response.statusCode === 200) {
			    	var person = body.results[0];
			    	var charBloc = '<li>';
			    	charBloc += '<div class="personPicture" style="background:url('+person.picture.large+') no-repeat center center;"></div>';
			    	charBloc += '<h1>'+person.name.first+" "+person.name.last.toUpperCase()+'</h1>';
			    	charBloc += '</li>';
			    	$('#peoples').append(charBloc);
			        console.log(body.results[0]) // Print the json response
			    }
			});

	});
	
	
  }

  
 

};
function rand(array) {
	return array[Math.floor(Math.random()*array.length)];
}