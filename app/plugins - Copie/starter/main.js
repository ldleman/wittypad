module.exports = {
	
	
	/*************************************/
	/** Descriptif du plugin (manifest) **/
	/*************************************/
	manifest : {
		name : 'Starter',
		version : '1.0',
		description : 'Permet de palier au syndrome de la page blanche en proposant une phrase d\'introduction aléatoire.',
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

		console.log('starter loaded...');
		//Sur l'evenement de lancement
		var plugin = this;
		app.on('new',function(){
			$('#editor').html(plugin.rand(plugin.starts));
		});
		
		//dictionnaire de phrases d'entrée
		this.starts  = 
		[
			"L’airbus 5403 Istanbul-Paris décrocha",
			"Mabel avait su d’avance ce qui l’attendait",
			"D’abord le souffle vif et piquant du vent qui balaie un visage",
			"Aujourd'hui, maman est morte. Ou peut-être hier, je ne sais pas. J'ai reçu un télégramme de l'asile",
			"Nous voici encore seuls. Tout cela est si lent, si lourd, si triste... Bientôt je serai vieux. Et ce sera enfin fini. ",
			"Quoi que puisse dire Aristote et toute la philosophie, il n'est rien d'égal au tabac : c'est la passion des honnêtes gens, et qui vit sans tabac n'est pas digne de vivre",
			"J’avais vingt ans. Je ne laisserai personne dire que c’est le plus bel âge de la vie",
			"Je cherchais un endroit tranquille où mourir",
			"C'était un soir d'automne, les feuilles orangés étaient tombés sur l'herbe toute mouillée.",
			"C'était mon premier rendez-vous avec ce garçon... avec un garçon."
		];
	  
		//fonction de choix aléatoire
		this.rand = function (array) {
			return array[Math.floor(Math.random()*array.length)];
		};

	}

	
	
}