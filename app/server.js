var conf = require('./conf.json');
var fs = require('fs');

 
var pluginDir = fs.readdirSync("./app/plugins");
var plugins = [];
  


function Application() {
	this.hooks = [];
}
		
Application.prototype.on = function(name, callback,uid) {
		if( 'undefined' == typeof(this.hooks[name] ) )
		 	this.hooks[name] = [];
		this.hooks[name].push( callback );
};

Application.prototype.emit = function(name, arguments) {
	if( 'undefined' != typeof( this.hooks[name] ) )
	for( i = 0; i < this.hooks[name].length; ++i )
		if( true != this.hooks[name][i]( arguments ) ) { continue; }
};

Application.prototype.path = function() {
	return  __dirname.replace(/\\/g, "/"); ;
}

Application.prototype.path = function() {
	return  __dirname.replace(/\\/g, "/"); ;
}
Application.prototype.css = function(url) {
	$('head').append("<link rel='stylesheet' type='text/css' href='"+url+"'>");
}
Application.prototype.browse = function(data,callback){
	var chooser = $('#fileDialog');
	var attr = {
		style : "display:none;",
		id : "fileDialog",
		type : "file"
	};
	
	if(data.extensions!=null) attr.accept = data.extensions;
	if(data.defaultName!=null) attr.nwsaveas = data.defaultName;
	if(data.defaultDir!=null) attr.nwworkingdir = data.defaultDir;
	if(data.multiple) attr.multiple = '';
	if(data.dir) attr.nwdirectory = '';
	
	chooser.attr(attr);
	chooser.unbind('change');
	chooser.val('');
	chooser.change(function(){
		if(chooser.val()!='')
			callback(chooser.val());
	});
	chooser.trigger('click'); 
};
  

app = new Application();


for(var key in pluginDir)
	 require('./plugins/'+pluginDir[key]+'/main.js').init();

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



$('#openFile').click(function(){
	app.browse({extensions:'.html'},function(data){openFile(data.path)});
});

$('#openDebug').click(function(){
	
});


function openFile(path){
	console.log(path);
	fs.readFile(path, 'utf8', function(err, content){
		$('#editor').html(content);
	});
}

// prevent default behavior from changing page on dropped file
window.ondragover = function(e) { e.preventDefault(); return false };
// NOTE: ondrop events WILL NOT WORK if you do not "preventDefault" in the ondragover event!!
window.ondrop = function(e) { e.preventDefault(); return false };

$('body').ondrop = function(e) {
	e.preventDefault(); 
	for (var i = 0; i < e.dataTransfer.files.length; ++i) {
		app.emit('drop',{path:e.dataTransfer.files[i].path}); 
	}
	return false 
};

function saveFile(path,content){
	fs.writeFile(path, content, function(err) {
    if(err) {
        alert("error: "+err);
    }
	});
}

app.emit('load',{}); 



$('#tabs').on('click','li',function(){
	$('#pages > div').hide();
	$('#'+$(this).attr('data-tab')).show();
});


$(document).keydown(function(e){
	if(e.keyCode == 83 && e.ctrlKey)
		app.emit('save',{html: $('#editor').html(), text : $('#editor').text()}); 
});

$('#editor').keyup(function(e){
	var text = $('#editor').text();
	
	var word = text.slice(text.lastIndexOf(' ') + 1); 
	word = word.replace(/(\r\n|\s|\t|\n|\r)/gm,"");
	
	var character = String.fromCharCode((96 <= e.keyCode && e.keyCode <= 105) ? e.keyCode-48 : e.keyCode)
	var specialChars = {13:"ENTER",17:'CTRL',18:'ALT',107:'+',108:'-',8:'RETURN',111:'/',106:'*',109:'-'};
	if(specialChars[e.keyCode] != null) character = specialChars[e.keyCode];
	
	var event = {
		  type : 'keyup',
		  code : e.keyCode,
		  shift : e.shiftKey,
		  character : character,
		  word : word
	}
	app.emit('write',event);
	
});



