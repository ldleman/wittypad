//Appel des Prérequis
var conf = require('./conf.json');
var gui = window.require('nw.gui');
var win = gui.Window.get();
if(conf.debug) win.showDevTools();
var fs = require('fs');
var pluginDir = fs.readdirSync("./app/plugins");
var Application = require('./application.js');

//Création du menu
var menu = new gui.Menu({type: 'menubar'});
var submenu = new gui.Menu();
submenu.append(new gui.MenuItem({ label: 'Nouveau'     , click :launchNewDocument }));
submenu.append(new gui.MenuItem({ label: 'Ouvrir'     , click :launchOpenDialog }));
submenu.append(new gui.MenuItem({ label: 'Sauvegarder', click:launchSaveDialog  }));
submenu.append(new gui.MenuItem({ label: 'Debug',       click: win.showDevTools }));

menu.append(new gui.MenuItem({
  label: 'Fichier',
  submenu: submenu
}));
win.menu = menu;

//Initialisation des variables communes
var plugins = [];
app = new Application();

//Réception des evenement application natifs

app.on('save',function(data){
	if($('#editor').attr('data-file') != "" ){
		saveFile($('#editor').attr('data-file'),data.html);
	}else{
		var chooser = $('#fileDialog');
		chooser.unbind('change');
		chooser.change(function(evt) {
		  saveFile($(this).val(),data.html);
		  $('#editor').attr('data-file',$(this).val());
		});
		chooser.trigger('click'); 
	}
});

app.on('drop',function(data){
	openFile(data.path);
});

app.on('new',function(data){
	$('#editor').html('').attr('data-file','');
});

app.on('shortcut',function(data){
	if(data.character == 'S' && data.ctrl)
		launchSaveDialog();
});

app.on('paginate',function(data){
	$('#pages > div').hide();
	$('#'+data.tab).show();
});

//Chargement des plugins
for(var key in pluginDir)
	 require('./plugins/'+pluginDir[key]+'/main.js').init(app);

 
//Créer un nouveau document
function launchNewDocument(){
	app.emit('new',{html: $('#editor').html(), text : $('#editor').text()});
}

//Sélectionner un document existant
function launchOpenDialog(){
	app.browse({extensions:'.html'},function(path){
		openFile(path)
	});
}

//Ouvrir un fichier en edition
function openFile(path){
	fs.readFile(path, 'utf8', function(err, content){
		$('#editor').html(content);
	});
}

//Ouvrir un browse pour y enregistrer un fichier
function launchSaveDialog(){
	app.emit('save',{html: $('#editor').html(), text : $('#editor').text()});
}

//Enregistrer le document
function saveFile(path,content){
	fs.writeFile(path, content, function(err) {
    if(err) {
        alert("error: "+err);
    }
	});
}

//Emission de l'évenement "lancement de l'application"
app.emit('load',{});
//Emission de l'évenement "nouveau document"
app.emit('new',{html: '', text : ''});


$('#tabs').on('click','li',function(){
	app.emit('paginate',{tab:$(this).attr('data-tab')});
});

//Récuperation des evenements claviers (raccourcis etc) et transmission en event app
$(document).keydown(function(e){
	var character = String.fromCharCode((96 <= e.keyCode && e.keyCode <= 105) ? e.keyCode-48 : e.keyCode);
	var specialChars = {13:"ENTER",17:'CTRL',18:'ALT',107:'+',108:'-',8:'RETURN',111:'/',106:'*',109:'-'};
	if(specialChars[e.keyCode] != null) character = specialChars[e.keyCode];
	app.emit('shortcut',{code: e.keyCode,character :character, ctrl : e.ctrlKey,shift : e.shiftKey,});
});

//Permet un micro templating sur la page d'index
$(function(){
	var data = {conf : conf};
	var html = $('body').html();
	html = html.replace(/{{(.*?)}}/g,function(a,b) { 
		if(b.indexOf('.') !== -1) var b = b.replace(/\./g,'"]["');
		return eval('data["'+b+'"]'); 
	});
	$('body').html(html);
});

//Récuperation des evenements texte/histoire et transmission en event app
$('#editor').keyup(function(e){
	var text = $('#editor').text();
	var word = text.slice(text.lastIndexOf(' ') + 1); 
	word = word.replace(/(\r\n|\s|\t|\n|\r)/gm,"");
	var character = String.fromCharCode((96 <= e.keyCode && e.keyCode <= 105) ? e.keyCode-48 : e.keyCode);
	var specialChars = {13:"ENTER",17:'CTRL',18:'ALT',107:'+',108:'-',8:'RETURN',111:'/',106:'*',109:'-'};
	if(specialChars[e.keyCode] != null) character = specialChars[e.keyCode];
	var event = {
		  type : 'keyup',
		  code : e.keyCode,
		  shift : e.shiftKey,
		  ctrl : e.ctrlKey,
		  character : character,
		  word : word
	}
	app.emit('write',event);
});



