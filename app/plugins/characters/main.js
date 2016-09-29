module.exports = {
	
	
	/*************************************/
	/** Descriptif du plugin (manifest) **/
	/*************************************/
	manifest : {
		name : 'Characters',
		version : '1.0',
		description : 'Génère des personnages pour votre histoire',
		licence : {
			name : 'CC by nc sa',
			url  : 'https://creativecommons.org/licenses/by-nc-sa/3.0/fr/'
		},
		author : { 
			name : 'idleman',
			url : 'blog.idleman.fr'
		}
	},
	
	/*********************************/
	/** Classe principale du plugin **/
	/*********************************/
	code : function  (app){

		console.log('characters loaded...');
		//Sur l'evenement de lancement
		var plugin = this;
		var dir =  __dirname.replace(/\\/g, "/");  
		//Fonction d'initialisation
   
		var charactersPlugin = this;
		app.css(dir+'/main.css');
		
		//Sur l'evenement de lancement
		app.on('load',function(data){
			
			var page = app.addPage({
				id : 'characters',
				title : 'Personnages',
				icon : 'fa-users',
			});
			
			page.html('<h3 id="characterTitle">Personnages</h3><ul id="peoples"></ul>');
			var btnAdd = $('<div class="btn"><i class="fa fa-plus"><i> Ajouter</div>');
			$('#characterTitle').after(btnAdd);
			btnAdd.click(function(){
			
				charactersPlugin.generateChararacter({gender:'female'},function(person){
					var charBloc = '<li>';
						charBloc += '<div class="personPicture" style="background:url('+person.picture.large+') no-repeat center center;"></div>';
						charBloc += '<h1>'+person.name.first+" "+person.name.last.toUpperCase()+'</h1>';
						charBloc += '</li>';
						$('#peoples').append(charBloc);
						console.log(person);
				});
			
			});
			
		    

		});
		
		
		this.generateChararacter = function(filter,cb){
			var request = require("request");
				var url = "http://api.randomuser.me/?gender=female&nat=FR"

				request({
					url: url,
					json: true
				}, function (error, response, body) {
					if (!error && response.statusCode === 200) {
						cb(body.results[0]);
					}
				});
		};

		this.rand = function (array) {
			return array[Math.floor(Math.random()*array.length)];
		};
	}
}