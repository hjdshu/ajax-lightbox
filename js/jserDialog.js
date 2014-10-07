/*
  jquery 弹出层插件，提供两种不同的弹出显示方式，支持ajax加载方式
  2014/8/13 by JSERH
*/	
(function ($) {
	$.fn.jserDialog = function(options){
		var defaults = {			//默认参数
			width:600,					
			height:500,
			url:'',					//使用ajax加载的时候，加载的url
			visibleWay:'hidden',     // hidden固定尺寸弹出层，auto弹出层自适应屏幕
			ajaxload:true,  // 是否使用ajax方法获取内容
			htmlText:'',     //不使用ajax加载的时候，弹出层显示的内容
			callback:function(){		//回调函数
			},
			closeback:function(){		//弹出层移除时的回调函数
			}
		};
			
		$("body").css({'overflow':'hidden'});
		$("<div id='Dialoding'></div>").hide().prependTo("body").fadeIn(100);
		var settings = $.extend({}, defaults, options || {});
		var _width=settings.width,_height=settings.height,_callback=settings.callback,_closeback=settings.closeback,_url=settings.url,_visibleWay=settings.visibleWay,_ajaxload=settings.ajaxload,_htmlText=settings.htmlText;
		if(_ajaxload==true){
			var htmlobj;
			var htmlText;
			htmlobj=$.ajax({url:_url,                                        		
				error:function(){
					alert('加载失败');
					$("#Dialoding").remove();
					$("body").css({'overflow':'auto'});
				},
				success:function(){
					$("#Dialoding").remove();
					htmlText=htmlobj.responseText;
					createPop();	
				}
			})
		}
		else{
		var htmlText=_htmlText;
		$("#Dialoding").remove();
		createPop();
		}
		function createPop(){
			if(_visibleWay=='hidden'){
				var dialogEle=$("<div id='showdialog'><div class='dialogbg'></div><div class='pop'><span id='logclose'>×</span><div id='dlghidcont'>"+htmlText+"</div></div> </div>  ");
				dialogEle.hide().prependTo("body").fadeIn(300);
				var dialogContent=$(".pop",dialogEle);
				dialogContent.css({"width":_width,"height":_height,"margin-left":-(_width/2),"margin-top":-(_height/2)});
			}
			if(_visibleWay=='auto'){
				var dialogEle=$("	<div class='dialogbg'></div><div id='showdAuto'><div class='showdAtPop' >"+htmlText+"<span id='logclose'>×</span></div></div> ");
				var dialogContent=$(".showdAtPop",dialogEle);
				dialogEle.hide().prependTo("body").fadeIn(300);
				var _thisposition=$(window).scrollTop(); 
				$("#showdAuto").css({"top":_thisposition});
				dialogContent.css({"width":_width});
			};
			
			$(".dialogbg,#showdAuto").click(function(){
				dialogEle.fadeOut(300,function(){
					$("body").css({'overflow':'auto'});
					$(this).remove();
				});
				_closeback();	
			});
			
			$(".showdAtPop").click(function(event){
				 event.stopPropagation(); 
			});
			$("#logclose").click(function(){
					dialogEle.fadeOut(300,function(){
						$("body").css({'overflow':'auto'});
						$(this).remove();
					});
				_closeback();
			})
			_callback();
		}
	
	};
})(jQuery);