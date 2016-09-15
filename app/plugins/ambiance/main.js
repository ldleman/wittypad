var dir =  __dirname.replace(/\\/g, "/");  
module.exports = {
  timeout : null,

  ambiances  :  
  {
	"comic" : { color : "#87C540",tags : ['dr(ôo)le','humour','ri(re|iez|e|er)','exclaff(er|e|é|ez)','amus(er|e|é|ez)','comique','absurd(e|ité|ités)'] },
	"love" : { color : "#F3DBFC",tags : ['amour','passion(s)?','sexe(s)?','embrass(er|e|é|ez)','l(ée)cher'] },
	"war" : { color : "#222222", background: ['war01.jpg','war02.jpg'], sound: ['war.wav'] ,tags : ['bataille(s|z|r)?','guerre','sang','boucherie(s)?','puissance(s)?','force(s)?','attaque(s|z|r)?'] }
  },
  
  //Fonction d'initialisation 
   init: function(app) {
	var ambiancePlugin = this;
	console.log('ambiance loaded...');
	
	//Sur l'evenement ecriture
	app.on('write',function(data){
		var timeout = null;
		
		for(var key in ambiancePlugin.ambiances){
			var ambiance = ambiancePlugin.ambiances[key];
			if(ambiancePlugin.inArray(data.word.toLowerCase(),ambiance.tags) !== -1){
				
				ambiancePlugin.play(ambiance);
			}
		}
	});
	
	
  },
  
  //Joue une ambiance
  play : function (ambiance){

  	$('body').css('background','');

	clearTimeout(this.timeout);
	$('body').css('background-color',ambiance.color);

	if(ambiance.background!=null && ambiance.background.length !=0){
		var pickedBackground = ambiance.background[0];
		$('body').css('background','url("'+dir+'/background/war01.jpg") no-repeat center center fixed');
		$('body').css('backgroundSize', 'cover');
	}

	this.timeout = setTimeout(function(){$('body').css('background-color','#ffffff');},60000);
  },

  inArray :  function(word, array) {
		if (!array) return -1;
		for (var i = 0; i < array.length; i++) {
			var patt = new RegExp('^'+array[i]+'$','ig');
			if (patt.test(word)) {
				return i;
			}
		}
		return -1;
	}
  
 

};