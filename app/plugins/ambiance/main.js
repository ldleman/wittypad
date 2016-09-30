module.exports = {
	
	
	/*************************************/
	/** Descriptif du plugin (manifest) **/
	/*************************************/
	manifest : {
		name : 'Ambiance',
		version : '1.0',
		description : 'Génere des ambiances en fonction de certinas mots clés du roman de manière à stimuler l\'inspiration au fil de l\'histoire',
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
		
		var dir =  __dirname.replace(/\\/g, "/");  
		console.log('ambiance loaded...');
		app.css(dir+'/main.css');
		var plugin = this;
		
		$('body').append('<video  id="ambiancePlayer" playsinline muted loop></video>');
		
		this.ambiances  =   
		{
			"night" : {color : "#007fd5",tags : ['nuit','ville','citée'],video : 'night-city.webm' },
			"comic" : { color : "#87C540",tags : ['dr(ôo)le','humour','ri(re|iez|e|er)','exclaff(er|e|é|ez)','amus(er|e|é|ez)','comique','absurd(e|ité|ités)'] },
			"love" : { color : "#F3DBFC",tags : ['amour','passion(s)?','sexe(s)?','embrass(er|e|é|ez)','l(ée)cher'] },
			"war" : { color : "#222222", background: ['war01.jpg','war02.jpg'], sound: ['war.wav'] ,tags : ['bataille(s|z|r)?','guerre','sang','boucherie(s)?','puissance(s)?','force(s)?','attaque(s|z|r)?'] }
		};
		
	
		
		app.on('write',function(data){
			
			var timeout = null;
			
			for(var key in plugin.ambiances){
				var ambiance = plugin.ambiances[key];
				if(plugin.inArray(data.word.toLowerCase(),ambiance.tags) !== -1)
					plugin.play(ambiance);
			}
		});
		
		this.play = function (ambiance){
			$('body').css('background','');
			clearTimeout(this.timeout);
			$('body').css('background-color',ambiance.color);
			if(ambiance.background!=null && ambiance.background.length !=0){
				var pickedBackground = ambiance.background[0];
				$('body').css('background','url("'+dir+'/background/war01.jpg") no-repeat center center fixed');
				$('body').css('backgroundSize', 'cover');
			}
			
			if(ambiance.execute!=null){
				ambiance.execute();
			}
			
			if(ambiance.video!=null){
				var vid = $("#ambiancePlayer").get(0);
				$(vid).append('<source src="'+dir+'/video/'+ambiance.video+'" type="video/webm">');
				vid.play();
				$("#ambiancePlayer").css('opacity','1');
			}
			
			
			this.timeout = setTimeout(function(){
				$('body').css('background-color','#ffffff');
				$("#ambiancePlayer").get(0).pause();
				$("#ambiancePlayer").css('opacity','0');
			},6000);
		},

		this.inArray =  function(word, array) {
			if (!array) return -1;
			for (var i = 0; i < array.length; i++) {
				var patt = new RegExp('^'+array[i]+'$','ig');
				if (patt.test(word)) {
					return i;
				}
			}
			return -1;
		};
  

	}

	
	
}

