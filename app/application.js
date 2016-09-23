module.exports = function Application() {
	this.hooks = [];
	
	this.on = function(name, callback,uid) {
        if( 'undefined' == typeof(this.hooks[name] ) )
		 	this.hooks[name] = [];
		this.hooks[name].push( callback );
    };
	
	
	this.emit = function(name, arguments) {
		if( 'undefined' != typeof( this.hooks[name] ) )
		for( i = 0; i < this.hooks[name].length; ++i )
			if( true != this.hooks[name][i]( arguments ) ) { continue; }
	};

	this.path = function() {
		return  __dirname.replace(/\\/g, "/"); 
	};

	this.css = function(url) {
		$('head').append("<link rel='stylesheet' type='text/css' href='"+url+"'>");
	};
	
	this.addPage = function(data){
		var data = $.extend({
			id : '0',
			title : 'Sans titre',
			icon : 'fa-file-o',
			html : ''
		},data);
	
		$('#tabs > li:eq(0)').append('<li data-tab="'+data.id+'"><i class="fa '+data.icon+'"></i> '+data.title+'</li>');
		var page = $('<div style="display:none;padding:15px;" id="'+data.id+'">'+data.html+'</div>');
		$('#pages').append(page);
		return page;
	};
	
	this.browse = function(data,callback){
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
		console.log(attr);
		chooser.attr(attr);
		chooser.unbind('change');
		chooser.val('');
		chooser.change(function(){
			if(chooser.val()!='')
				callback(chooser.val());
		});
		chooser.trigger('click'); 
	};
	
	
};
