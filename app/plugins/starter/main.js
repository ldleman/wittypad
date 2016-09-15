var dir =  __dirname.replace(/\\/g, "/");  
module.exports = {
 

  starts  :  
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
  ],
  
  //Fonction d'initialisation
   init: function(app) {
	var starter = this;
	console.log('starter loaded...');
	//Sur l'evenement de lancement
	app.on('load',function(){
		
		console.log('load : start');
		var startText = rand(starter.starts);
		startText = startText.replace(/^[^a-zA-Z]*([a-zA-Z])/g, '<span style="font-weight:bold;font-size:24px;">$1</span>');
		
		$('#editor').html(startText);


	},'starter');
	
	
  }

  
 

};
function rand(array) {
	return array[Math.floor(Math.random()*array.length)];
}