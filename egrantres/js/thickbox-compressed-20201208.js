/**
 *  qhh modify 20200312 此文件内容已废弃，系统弹出框插件统一使用thickboxpopup.js
 * 
 * **/

/*
 * Thickbox 3 - One Box To Rule Them All.
 * By Cody Lindley (http://www.codylindley.com)
 * Copyright (c) 2007 cody lindley
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
*/
var tb_pathToImage = res +"/images/thickbox/loadingAnimation.gif";
//on page load call tb_init
$(document).ready(function(){   
	//tb_init('a.thickbox, area.thickbox, input.thickbox');//pass where to apply thickbox
	imgLoader = new Image();// preload image
	imgLoader.src = tb_pathToImage;
	initThickBox();
});
var inlineId="";
//add thickbox to href & area elements that have a class of .thickbox
function tb_init(domChunk){
	$(domChunk).each(function(){
		//判断是否已经绑定了click:tb_init_click事件，如果未绑定，则重新绑定
		var event = $(this).data('events');
		if(!event || !event["click"]){
			$(this).bind("click",tb_init_click);
		}else{
			var clicks = event["click"];
			var flag = true;
			for(var i = 0;i < clicks.length;i++){
				if(clicks[i] == tb_init_click){
					flag = false;
					break;
				}
			}
			if(flag){
				$(this).bind("click",tb_init_click);
			}
		}
	});
}
function tb_init_click()
{
	var t = this.title || this.name || null;
	var a = this.href || this.alt;
	var g = this.rel || false;
	tb_show(t,a,g);
	this.blur();
	return false;
}

function tb_show_post(caption, url, imageGroup) {//function called when the user clicks on a thickbox link
	try {
		if (typeof document.body.style.maxHeight === "undefined") {//if IE 6
			$("body","html").css({height: "100%", width: "100%"});
			$("html").css("overflow","hidden");
			if (document.getElementById("TB_HideSelect") === null) {//iframe to hide select elements in ie6
				$("body").append("<div id='TB_overlay'><iframe id='TB_HideSelect'></iframe></div><div id='TB_window'></div>");
				//$("#TB_overlay").click(tb_remove);
			}
		}else{//all others
			if(document.getElementById("TB_overlay") === null){
				$("body").append("<div id='TB_overlay'><iframe id='TB_HideSelect'></iframe></div><div id='TB_window'></div>");
				//$("#TB_overlay").click(tb_remove);
			}
		}
		
		if(tb_detectMacXFF()){
			$("#TB_overlay").addClass("TB_overlayMacFFBGHack");//use png overlay so hide flash
		}else{
			$("#TB_overlay").addClass("TB_overlayBG");//use background and opacity
		}
		
		if(caption===null){caption="";}
		$("body").append("<div id='TB_load'><img src='"+imgLoader.src+"' /></div>");//add loader to the page
		$('#TB_load').show();//show loader
		
		var baseURL;
	   if(url.indexOf("?")!==-1){ //ff there is a query string involved
			baseURL = url.substr(0, url.indexOf("?"));
	   }else{ 
	   		baseURL = url;
	   }
	   
	   var urlString = /\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$/;
	   var urlType = baseURL.toLowerCase().match(urlString);

		if(urlType == '.jpg' || urlType == '.jpeg' || urlType == '.png' || urlType == '.gif' || urlType == '.bmp'){//code to show images
				
			TB_PrevCaption = "";
			TB_PrevURL = "";
			TB_PrevHTML = "";
			TB_NextCaption = "";
			TB_NextURL = "";
			TB_NextHTML = "";
			TB_imageCount = "";
			TB_FoundURL = false;
			if(imageGroup){
				TB_TempArray = $("a[rel="+imageGroup+"]").get();
				
				for (TB_Counter = 0; ((TB_Counter < TB_TempArray.length) && (TB_NextHTML === "")); TB_Counter++) {
					var urlTypeTemp = TB_TempArray[TB_Counter].href.toLowerCase().match(urlString);
						if (!(TB_TempArray[TB_Counter].href == url)) {	
							
							if (TB_FoundURL) {
								TB_NextCaption = TB_TempArray[TB_Counter].title;
								TB_NextURL = TB_TempArray[TB_Counter].href;
								TB_NextHTML ="<span id='TB_next'>&nbsp;&nbsp;<a href='#'>Next &gt;</a></span>";
							} else {
								TB_PrevCaption = TB_TempArray[TB_Counter].title;
								TB_PrevURL = TB_TempArray[TB_Counter].href;
								TB_PrevHTML = "<span id='TB_prev'>&nbsp;&nbsp;<a href='#'>&lt; Prev</a></span>";
							}
						} else {
							TB_FoundURL = true;
							TB_imageCount = "Image " + (TB_Counter + 1) +" of "+ (TB_TempArray.length);
							
						}
				}
			}

			imgPreloader = new Image();
			imgPreloader.onload = function(){		
			imgPreloader.onload = null;
				
			// Resizing large images - orginal by Christian Montoya edited by me.
			var pagesize = tb_getPageSize();
			var x = pagesize[0] - 150;
			var y = pagesize[1] - 150;
			var imageWidth = imgPreloader.width;
			var imageHeight = imgPreloader.height;
			if (imageWidth > x) {
				imageHeight = imageHeight * (x / imageWidth); 
				imageWidth = x; 
				if (imageHeight > y) { 
					imageWidth = imageWidth * (y / imageHeight); 
					imageHeight = y; 
				}
			} else if (imageHeight > y) { 
				imageWidth = imageWidth * (y / imageHeight); 
				imageHeight = y; 
				if (imageWidth > x) { 
					imageHeight = imageHeight * (x / imageWidth); 
					imageWidth = x;
				}
			}
			// End Resizing
			
			TB_WIDTH = imageWidth + 30;
			TB_HEIGHT = imageHeight + 60;
			$("#TB_window").append("<a href='' id='TB_ImageOff' title='Close'><img id='TB_Image' src='"+url+"' width='"+imageWidth+"' height='"+imageHeight+"' alt='"+caption+"'/></a>" + "<div id='TB_caption'>"+caption+"<div id='TB_secondLine'>" + TB_imageCount + TB_PrevHTML + TB_NextHTML + "</div></div><div id='TB_closeWindow'><a href='#' id='TB_closeWindowButton' title='Close'><i class='close_icon'></i></a> or Esc Key</div>"); 		
			
			$("#TB_closeWindowButton").click(tb_remove);
			
			if (!(TB_PrevHTML === "")) {
				function goPrev(){
					if($(document).unbind("click",goPrev)){$(document).unbind("click",goPrev);}
					$("#TB_window").remove();
					$("body").append("<div id='TB_window'></div>");
					tb_show(TB_PrevCaption, TB_PrevURL, imageGroup);
					return false;	
				}
				$("#TB_prev").click(goPrev);
			}
			
			if (!(TB_NextHTML === "")) {		
				function goNext(){
					$("#TB_window").remove();
					$("body").append("<div id='TB_window'></div>");
					tb_show(TB_NextCaption, TB_NextURL, imageGroup);				
					return false;	
				}
				$("#TB_next").click(goNext);
				
			}

			document.onkeydown = function(e){ 	
				if (e == null) { // ie
					keycode = event.keyCode;
				} else { // mozilla
					keycode = e.which;
				}
				if(keycode == 27){ // close
					tb_remove();
				} else if(keycode == 190){ // display previous image
					if(!(TB_NextHTML == "")){
						document.onkeydown = "";
						goNext();
					}
				} else if(keycode == 188){ // display next image
					if(!(TB_PrevHTML == "")){
						document.onkeydown = "";
						goPrev();
					}
				}	
			};
			
			tb_position(url);
			$("#TB_load").remove();
			$("#TB_ImageOff").click(tb_remove);
			$("#TB_window").css({display:"block"}); //for safari using css instead of show
			};
			
			imgPreloader.src = url;
		}else{//code to show html
			
			var queryString = url.replace(/^[^\?]+\??/,'');
			var params = tb_parseQuery( queryString );

			TB_WIDTH = ((getRealNum(params['width'])[0])*1) + 30 || 630; //defaults to 630 if no paramaters were added to URL
			TB_HEIGHT = ((getRealNum(params['height'])[0])*1) + 40 || 440; //defaults to 440 if no paramaters were added to URL
			ajaxContentW = TB_WIDTH - 60;
			ajaxContentH = TB_HEIGHT - 45;
			
			if(url.indexOf('TB_iframe') != -1){// either iframe or ajax window		
					$("#TB_title").remove();
					urlNoQuery = url.split('TB_');
					$("#TB_iframeContent").remove();
					if(params['modal'] != "true"){//iframe no modal
						var qurl = ctx+"/cpt/blank-page?TB_iframe=true";
						
						$("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='###' id='TB_closeWindowButton' title='Close'><i class='close_icon'></i></a></div></div><iframe frameborder='0' hspace='0' src='"+qurl+"' id='TB_iframeContent' name='TB_iframeContent"+Math.round(Math.random()*1000)+"' onload=\"tb_showIframe_post('"+url+"')\" style='width:"+(ajaxContentW )+"px;height:"+(ajaxContentH + 17)+"px;' ></iframe>");
					}else{//iframe modal
					$("#TB_overlay").unbind();
						$("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='###' id='TB_closeWindowButton' title='Close'><i class='close_icon'></i></a></div></div><iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TB_iframeContent' name='TB_iframeContent"+Math.round(Math.random()*1000)+"' onload='tb_showIframe()' style='width:"+(ajaxContentW
								
						)+"px;height:"+(ajaxContentH + 17)+"px;' > </iframe>");
					}
			}else{// not an iframe, ajax
				$("#TB_title").remove();
					if($("#TB_window").css("display") != "block"){
						if(params['modal'] != "true"){//ajax no modal
						$("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='###' id='TB_closeWindowButton'><i class='close_icon'></i></a></div></div><div id='TB_ajaxContent' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px'></div>");
						}else{//ajax modal
						$("#TB_overlay").unbind();
						$("#TB_window").append("<div id='TB_ajaxContent' class='TB_modal' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px;'></div>");	
						}
					}else{//this means the window is already up, we are just loading new content via ajax
						$("#TB_ajaxContent")[0].style.width = ajaxContentW +"px";
						$("#TB_ajaxContent")[0].style.height = ajaxContentH +"px";
						$("#TB_ajaxContent")[0].scrollTop = 0;
						$("#TB_ajaxWindowTitle").html(caption);
					}
			}
					
			$("#TB_closeWindowButton").click(tb_remove);
			
				if(url.indexOf('TB_inline') != -1){	
					inlineId = params['inlineId'];
					$("#TB_ajaxContent").append($('#' + params['inlineId']).children());
					$("#TB_window").unload(function () {
						$('#' + params['inlineId']).append( $("#TB_ajaxContent").children() ); // move elements back when you're finished
					});
					tb_position(url);
					$("#TB_load").remove();
					$("#TB_window").css({display:"block"}); 
				}else if(url.indexOf('TB_iframe') != -1){
					tb_position(url);
					if($.browser.safari){//safari needs help because it will not fire iframe onload
						$("#TB_load").remove();
						$("#TB_window").css({display:"block"});
					}
				}else{
					$("#TB_ajaxContent").load(url += "&random=" + (new Date().getTime()),function(){//to do a post change this load method
						tb_position(url);
						$("#TB_load").remove();
						tb_init("#TB_ajaxContent a.thickbox"); 
						$("#TB_window").css({display:"block"});
					});
				}
			
		}

		if(!params['modal']){
			document.onkeyup = function(e){ 	
				if (e == null) { // ie
					keycode = event.keyCode;
				} else { // mozilla
					keycode = e.which;
				}
				if(keycode == 27){ // close
					tb_remove();
				}	
			};
		}
		
	} catch(e) {
		//nothing here
	}
}

/***
 * add by qhh 2016-06-14
 * 根据用户传入的宽高字符串，得到具体单位和宽度,单数中不写单位时，默认%
 * @returns
 */
function getRealNum(v_num){
	var resultArray=new Array();
	if(v_num=='undefined' || v_num==''){
		resultArray.push("50");
		resultArray.push("%");
	}else if($.isNumeric(v_num)){
		resultArray.push(v_num);
		resultArray.push("%");
	}else{
		var reg = /\d+/g;
	    resultArray.push(v_num.match(reg));
		resultArray.push(v_num.replace(v_num.match(reg),""));
	}
	return resultArray;
}

function tb_show(caption, url, imageGroup, show) {//function called when the user clicks on a thickbox link
	
	/*var jqGridObj=$("div[id^='TopBarMnt']").length;
	if(jqGridObj>0){//存在jqgrid表格
		scrollTo(0, 0);//滚动条会顶部
		$("body").eq(0).css("overflow","hidden");//隐藏父页面滚动条	
	}*/
	
	getTbWidth(url);
	
	try {
		if($("#TB_window").length>0 && $("#TB_window").css("display")!='none')
			return false;
		if (typeof document.body.style.maxHeight === "undefined") {//if IE 6
			$("body","html").css({height: "100%", width: "100%"});
			$("html").css("overflow","hidden");
			if (document.getElementById("TB_HideSelect") === null) {//iframe to hide select elements in ie6
				$("body").append("<div id='TB_overlay'><iframe id='TB_HideSelect'></iframe></div><div id='TB_window'></div>");
				//$("#TB_overlay").click(tb_remove);
			}
		}else{//all others
			if(document.getElementById("TB_overlay") === null){
				if(!!show){
					$("body").append("<div style='display:none' ><div id='TB_overlay'><iframe id='TB_HideSelect'></iframe></div><div id='TB_window'></div></div>");
				}else{
					$("body").append("<div id='TB_overlay'><iframe id='TB_HideSelect'></iframe></div><div id='TB_window'></div>");
				}
				//$("#TB_overlay").click(tb_remove);
			}
		}
		
		if(tb_detectMacXFF()){
			$("#TB_overlay").addClass("TB_overlayMacFFBGHack");//use png overlay so hide flash
		}else{
			$("#TB_overlay").addClass("TB_overlayBG");//use background and opacity
		}
		
		if(caption===null){caption="";}
		if(!show){
			$("body").append("<div id='TB_load'><img src='"+imgLoader.src+"' /></div>");//add loader to the page
			$('#TB_load').show();//show loader
		}
		
		var baseURL;
	   if(url.indexOf("?")!==-1){ //ff there is a query string involved
			baseURL = url.substr(0, url.indexOf("?"));
	   }else{ 
	   		baseURL = url;
	   }
	   
	   var urlString = /\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$/;
	   var urlType = baseURL.toLowerCase().match(urlString);

		if(urlType == '.jpg' || urlType == '.jpeg' || urlType == '.png' || urlType == '.gif' || urlType == '.bmp'){//code to show images
				
			TB_PrevCaption = "";
			TB_PrevURL = "";
			TB_PrevHTML = "";
			TB_NextCaption = "";
			TB_NextURL = "";
			TB_NextHTML = "";
			TB_imageCount = "";
			TB_FoundURL = false;
			if(imageGroup){
				TB_TempArray = $("a[rel="+imageGroup+"]").get();
				
				for (TB_Counter = 0; ((TB_Counter < TB_TempArray.length) && (TB_NextHTML === "")); TB_Counter++) {
					var urlTypeTemp = TB_TempArray[TB_Counter].href.toLowerCase().match(urlString);
						if (!(TB_TempArray[TB_Counter].href == url)) {	
							
							if (TB_FoundURL) {
								TB_NextCaption = TB_TempArray[TB_Counter].title;
								TB_NextURL = TB_TempArray[TB_Counter].href;
								TB_NextHTML ="<span id='TB_next'>&nbsp;&nbsp;<a href='#'>Next &gt;</a></span>";
							} else {
								TB_PrevCaption = TB_TempArray[TB_Counter].title;
								TB_PrevURL = TB_TempArray[TB_Counter].href;
								TB_PrevHTML = "<span id='TB_prev'>&nbsp;&nbsp;<a href='#'>&lt; Prev</a></span>";
							}
						} else {
							TB_FoundURL = true;
							TB_imageCount = "Image " + (TB_Counter + 1) +" of "+ (TB_TempArray.length);
							
						}
				}
			}

			imgPreloader = new Image();
			imgPreloader.onload = function(){		
			imgPreloader.onload = null;
				
			// Resizing large images - orginal by Christian Montoya edited by me.
			var pagesize = tb_getPageSize();
			var x = pagesize[0] - 150;
			var y = pagesize[1] - 150;
			var imageWidth = imgPreloader.width;
			var imageHeight = imgPreloader.height;
			if (imageWidth > x) {
				imageHeight = imageHeight * (x / imageWidth); 
				imageWidth = x; 
				if (imageHeight > y) { 
					imageWidth = imageWidth * (y / imageHeight); 
					imageHeight = y; 
				}
			} else if (imageHeight > y) { 
				imageWidth = imageWidth * (y / imageHeight); 
				imageHeight = y; 
				if (imageWidth > x) { 
					imageHeight = imageHeight * (x / imageWidth); 
					imageWidth = x;
				}
			}
			// End Resizing
			
			TB_WIDTH = imageWidth + 30;
			TB_HEIGHT = imageHeight + 60;
			TB_HEIGHT=(TB_HEIGHT>$(window).height()-80 ? $(window).height()-80 : TB_HEIGHT);
			TB_WIDTH=(TB_WIDTH>$(window).width()-80 ? $(window).width()-80 : TB_WIDTH);
			$("#TB_window").append("<a href='' id='TB_ImageOff' title='Close'><img id='TB_Image' src='"+url+"' width='"+imageWidth+"' height='"+imageHeight+"' alt='"+caption+"'/></a>" + "<div id='TB_caption'>"+caption+"<div id='TB_secondLine'>" + TB_imageCount + TB_PrevHTML + TB_NextHTML + "</div></div><div id='TB_closeWindow'><a href='#' id='TB_closeWindowButton' title='Close'>close</a> or Esc Key</div>"); 		
			
			$("#TB_closeWindowButton").click(tb_remove);
			
			if (!(TB_PrevHTML === "")) {
				function goPrev(){
					if($(document).unbind("click",goPrev)){$(document).unbind("click",goPrev);}
					$("#TB_window").remove();
					$("body").append("<div id='TB_window'></div>");
					tb_show(TB_PrevCaption, TB_PrevURL, imageGroup);
					return false;	
				}
				$("#TB_prev").click(goPrev);
			}
			
			if (!(TB_NextHTML === "")) {		
				function goNext(){
					$("#TB_window").remove();
					$("body").append("<div id='TB_window'></div>");
					tb_show(TB_NextCaption, TB_NextURL, imageGroup);				
					return false;	
				}
				$("#TB_next").click(goNext);
				
			}

			document.onkeydown = function(e){ 	
				if (e == null) { // ie
					keycode = event.keyCode;
				} else { // mozilla
					keycode = e.which;
				}
				if(keycode == 27){ // close
					tb_remove();
				} else if(keycode == 190){ // display previous image
					if(!(TB_NextHTML == "")){
						document.onkeydown = "";
						goNext();
					}
				} else if(keycode == 188){ // display next image
					if(!(TB_PrevHTML == "")){
						document.onkeydown = "";
						goPrev();
					}
				}	
			};
			
			tb_position(url);
			$("#TB_load").remove();
			$("#TB_ImageOff").click(tb_remove);
			$("#TB_window").css({display:"block"}); //for safari using css instead of show
			};
			
			imgPreloader.src = url;
		}else{//code to show html
			
			var queryString = url.replace(/^[^\?]+\??/,'');
			var params = tb_parseQuery( queryString );

			TB_WIDTH = ((getRealNum(params['width'])[0])*1) + 30 || 630; //defaults to 630 if no paramaters were added to URL
			TB_HEIGHT = ((getRealNum(params['height'])[0])*1) + 40 || 440; //defaults to 440 if no paramaters were added to URL
			TB_HEIGHT=(TB_HEIGHT>$(window).height()-80 ? $(window).height()-80 : TB_HEIGHT);
			TB_WIDTH=(TB_WIDTH>$(window).width()-80 ? $(window).width()-80 : TB_WIDTH);
			ajaxContentW = TB_WIDTH - 60;
			ajaxContentH = TB_HEIGHT - 45;
			
			if(url.indexOf('TB_iframe') != -1){// either iframe or ajax window		
					urlNoQuery = url.split('TB_');
					$("#TB_title").remove();
					$("#TB_iframeContent").remove();
					if(params['modal'] != "true"){//iframe no modal
						$("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='###' id='TB_closeWindowButton' title='Close'><i class='close_icon'></i></a></div></div><iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TB_iframeContent' name='TB_iframeContent"+Math.round(Math.random()*1000)+"' onload='tb_showIframe()' style='width:"+(ajaxContentW )+"px;height:"+(ajaxContentH + 17)+"px;' ></iframe>");
					}else{//iframe modal
					$("#TB_overlay").unbind();
						$("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='###' id='TB_closeWindowButton' title='Close'><i class='close_icon'></i></a></div></div><iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TB_iframeContent' name='TB_iframeContent"+Math.round(Math.random()*1000)+"' onload='tb_showIframe()' style='width:"+(ajaxContentW
						)+"px;height:"+(ajaxContentH + 17)+"px;' > </iframe>");
					}
			}else{// not an iframe, ajax
					if($("#TB_window").css("display") != "block"){
						$("#TB_title").remove();
						if(params['modal'] != "true"){//ajax no modal
						$("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='###' id='TB_closeWindowButton'><i class='close_icon'></i></a></div></div><div id='TB_ajaxContent' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px'></div>");
						}else{//ajax modal
						$("#TB_overlay").unbind();
						$("#TB_window").append("<div id='TB_ajaxContent' class='TB_modal' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px;'></div>");	
						}
					}else{//this means the window is already up, we are just loading new content via ajax
						$("#TB_ajaxContent")[0].style.width = ajaxContentW +"px";
						$("#TB_ajaxContent")[0].style.height = ajaxContentH +"px";
						$("#TB_ajaxContent")[0].scrollTop = 0;
						$("#TB_ajaxWindowTitle").html(caption);
					}
			}
			$("#TB_closeWindowButton").click(tb_remove);
			
				if(url.indexOf('TB_inline') != -1){	
					inlineId = params['inlineId'];
					$("#TB_ajaxContent").append($('#' + params['inlineId']).children());
					$("#TB_window").unload(function () {
						$('#' + params['inlineId']).append( $("#TB_ajaxContent").children() ); // move elements back when you're finished
					});
					tb_position(url);
					$("#TB_load").remove();
					$("#TB_window").css({display:"block"});
					reseze_tb_show();
				}else if(url.indexOf('TB_iframe') != -1){
					tb_position(url);
					if($.browser.safari){//safari needs help because it will not fire iframe onload
						$("#TB_load").remove();
						$("#TB_window").css({display:"block"});
					}
				}else{
					$("#TB_ajaxContent").load(url += "&random=" + (new Date().getTime()),function(){//to do a post change this load method
						tb_position(url);
						$("#TB_load").remove();
						tb_init("#TB_ajaxContent a.thickbox"); 
						$("#TB_window").css({display:"block"});
					});
				}
		}
		
		if(!params['modal']){
			document.onkeyup = function(e){ 	
				if (e == null) { // ie
					keycode = event.keyCode;
				} else { // mozilla
					keycode = e.which;
				}
				if(keycode == 27){ // close
					tb_remove();
				}	
			};
		}
	} catch(e) {
		//nothing here
	}
}

//add by qhh 20170810 绑定弹出框拖动事件
function reseze_tb_show(){
	$("#TB_window").bg_move({
		move:'#TB_title',
		closed:'',
		size : 70
	});
}

/**
 * 打开一个单独的窗口，caption和url是必须的参数，其他可选
 * @caption 标题
 * @url 地址
 * @newOptions  默认是 {top : 200, left : 200, toolbar:no, menubar:no, scrollbars:yes, resizable:yes,location:no, status:no,titlebar:no,location:no} 传新属性入可覆盖默认设置
 * @removeCpt 需要删除的控件ID
 * @timeout 延时执行方法时间 毫秒
 */
function tb_show_alone(caption, url, newOptions, removeCpt) {
	if(url == undefined || url == ""){
		return;
	}
	try {
		var optStr = "";
		url = "http://" + window.location.host + url;
		
		var queryString = url.replace(/^[^\?]+\??/,'');
		var params = tb_parseQuery( queryString );

		TB_WIDTH = ((getRealNum(params['width'])[0])*1) + 30 || 630; //defaults to 630 if no paramaters were added to URL
		TB_HEIGHT = ((getRealNum(params['height'])[0])*1) + 40 || 440; //defaults to 440 if no paramaters were added to URL
		ajaxContentW = TB_WIDTH - 60;
		ajaxContentH = TB_HEIGHT - 45;
		
		var options = {top : '200', left : '200', toolbar:'no', menubar:'no', scrollbars:'yes', 
					   resizable:'yes', location:'no', status:'no', titlebar:'no'};
		if(newOptions != undefined){
			$.each(newOptions, function(key, val){
				options[key] = val;
			});
		}
		$.each(options, function(key, val){
			optStr += "," + key + "=" + val;
		});
		
		optStr = "height=" + ajaxContentH + ",width=" + ajaxContentW + optStr;
		newWin = window.open(url, "_blank", optStr);
		//catch里面吸收了异常，调试可以打开
		$(newWin).load(function(){
			if(newWin != undefined && newWin != null && newWin.document != undefined){
				if(newWin.document.title != undefined){
					try {
						newWin.document.title = caption;
					}catch(e){
					}
				}
				if(removeCpt != undefined && removeCpt.length > 0){
					for(var i = 0; i < removeCpt.length; i++){
						var tmpCpt = newWin.document.getElementById(removeCpt[i]);
						$(tmpCpt).remove();
					}
				}
			}
		});
	} catch(e) {
		;
	};
}

function tb_show_alone_other_system(caption, url, newOptions, removeCpt) {
	if(url == undefined || url == ""){
		return;
	}
	try {
		var optStr = "";
		//url = "http://" + window.location.host + url;
		
		var queryString = url.replace(/^[^\?]+\??/,'');
		var params = tb_parseQuery( queryString );

		TB_WIDTH = ((getRealNum(params['width'])[0])*1) + 30 || 998; //defaults to 630 if no paramaters were added to URL
		TB_HEIGHT = ((getRealNum(params['height'])[0])*1) + 40 || 800; //defaults to 440 if no paramaters were added to URL
		ajaxContentW = TB_WIDTH - 60;
		ajaxContentH = TB_HEIGHT - 45;
		
		var options = {top : '200', left : '200', toolbar:'no', menubar:'no', scrollbars:'yes', 
					   resizable:'yes', location:'no', status:'no', titlebar:'no'};
		if(newOptions != undefined){
			$.each(newOptions, function(key, val){
				options[key] = val;
			});
		}
		$.each(options, function(key, val){
			optStr += "," + key + "=" + val;
		});
		
		optStr = "height=" + ajaxContentH + ",width=" + ajaxContentW + optStr;
		newWin = window.open(url, "_blank", optStr);
		//catch里面吸收了异常，调试可以打开
		$(newWin).load(function(){
			if(newWin != undefined && newWin != null && newWin.document != undefined){
				if(newWin.document.title != undefined){
					try {
						newWin.document.title = caption;
					}catch(e){
					}
				}
				if(removeCpt != undefined && removeCpt.length > 0){
					for(var i = 0; i < removeCpt.length; i++){
						var tmpCpt = newWin.document.getElementById(removeCpt[i]);
						$(tmpCpt).remove();
					}
				}
			}
		});
	} catch(e) {
		;
	};
}

//helper functions below
function tb_showIframe(){
	$("#TB_load").remove();
	$("#TB_window").css({display:"block"});
	reseze_tb_show();
}
function tb_showIframe_post(postUrl){
	var urlYs = postUrl.split('?');
	$("#TB_load").remove();
	$("#TB_window").css({display:"block"});
	$("#TB_iframeContent").contents().find("#if_th_form").attr("action",urlYs[0]);
	
	var paramsUrl = urlYs[1];
	var formhtml = '';
	$.each(paramsUrl.split("&"),function(index,item){
		var nv = item.split("=");
		formhtml = formhtml + '"<input type="hidden" value="'+nv[1]+'" name="'+nv[0]+'"/>';
	});
	$("#TB_iframeContent").contents().find("#if_th_form").html(formhtml);
	$("#TB_iframeContent").contents().find("#if_th_form").submit();
}
//grid页面专用
function tb_remove(flag) { 
	   $("#TB_imageOff").unbind("click"); 
	   $("#TB_closeWindowButton").unbind("click"); 
	   $("#TB_window").fadeOut("fast",function(){
	       if(navigator.userAgent.indexOf("MSIE")>0 && !flag) { //如果是IE 
        //手动移除iframe，IE的一个bug 
	           $('#TB_iframeContent').remove(); 
	     } 
	       /**
    		$('#TB_window,#TB_overlay,#TB_HideSelect').trigger("unload").unbind().remove(); 
	      	if(navigator.userAgent.indexOf("MSIE")>0) { //如果是IE 
	            //自己调用垃圾回收，强制清楚iframe内存，解决文本框无法输入问题。 
	           CollectGarbage(); 
	        } */
	   }); 
	   if(inlineId!="")
		   $("#"+inlineId).append( $("#TB_ajaxContent").children() );
	   inlineId="";
	   $("#TB_window").remove();
	   $("#TB_overlay").remove(); 
/*	   if (typeof document.body.style.maxHeight == "undefined") {//if IE 6 
	        $("body","html").css({ 
	            height: "auto", 
	          width: "auto"
	       }); 
	       $("html").css("overflow",""); 
	   } */
	   document.onkeydown = ""; 
	   document.onkeyup = ""; 
	   
	   getWinWidth();
	   /*var jqGridObj=$("div[id^='TopBarMnt']").length;
		if(jqGridObj>0){ //存在jqgrid表格
			//add by qhh 恢复对父页面滚动条的禁用,因为表头浮动功能，当袒护子页面时，禁用父页面的滚动条（置顶）
			$("body").eq(0).css("overflow","");
		}*/
	   
	   return false; 
}
//关闭窗口后解决无法输入所用
function tb_remove2() {
	   $("#TB_window").fadeOut("fast",function(){ 
	       if(navigator.userAgent.indexOf("MSIE")>0) { //如果是IE 
        //手动移除iframe，IE的一个bug 
	           $('#TB_iframeContent').remove(); 
	     } 
	    $('#TB_window,#TB_overlay,#TB_HideSelect').trigger("unload").unbind().remove(); 
	      if(navigator.userAgent.indexOf("MSIE")>0) { //如果是IE 
	            //自己调用垃圾回收，强制清楚iframe内存，解决文本框无法输入问题。 
	           CollectGarbage(); 
	        } 
	   }); 
	   $("#TB_load").remove(); 
	   if (typeof document.body.style.maxHeight == "undefined") {//if IE 6 
	        $("body","html").css({ 
	            height: "auto", 
	          width: "auto"
	       }); 
	       $("html").css("overflow",""); 
	   } 
	   document.onkeydown = ""; 
	   document.onkeyup = "";
	   getWinWidth();
	   return false; 
}

function getWinWidth(){
	var winWidth=document.body.offsetWidth;
	winWidth=Math.floor(Math.floor((93*(parseInt(winWidth)-20))/100)-100);
	setCookie('winWidth', winWidth, null, '/');
}

function tb_position(url) {
	
	var queryString = url.replace(/^[^\?]+\??/,'');
	var params = tb_parseQuery( queryString );

	var TB_WIDTH =((getRealNum(params['width'])[0])*1); 
	var TB_HEIGHT =((getRealNum(params['height'])[0])*1); 
	var widht_dw=getRealNum(params['width'])[1];
	var height_dw=getRealNum(params['height'])[1];

	var left_=0;
	var top_=0;
	//FIXME 乔海红（弹出框全屏显示，待优化）
	if(widht_dw =='%'){
		//如果是%,则数字大于100,按分辨率计算%
		if(TB_WIDTH>=100){
			var screenWidth=980;//FIXME 宽度如何取值，待定window.innerWidth;
			TB_WIDTH=Math.floor((TB_WIDTH/screenWidth)*10)*10;
			if(TB_WIDTH>89){
				TB_WIDTH=90;
			}
		}
		$("#TB_window").css({paddingBottom:'3%'});
		//计算距离左边的位置：
		left_=Math.floor((100-TB_WIDTH)/2);
	}else{
		var screenWid = new windowSize().width;
		left_=Math.floor((screenWid-TB_WIDTH)/2);
	}
	
	if(height_dw=='%'){
		//如果是%,则数字大于100,按分辨率计算%
		if(TB_HEIGHT>=100){
			var screenHeight=window.innerHeight;
			TB_HEIGHT=Math.floor((TB_HEIGHT/screenHeight)*10)*10+10;
			//TB_HEIGHT=TB_HEIGHT >= 60 ? (TB_HEIGHT+10):TB_HEIGHT;
			if(TB_HEIGHT>89){
				TB_HEIGHT=85;
			}
		}
		$("#TB_window").css({height: TB_HEIGHT+height_dw});
		$("#TB_window").css({paddingBottom:'3%'});
		top_=Math.floor((100-TB_HEIGHT)/2);
	}else{
		var screenHeight=new windowSize().height;
		top_=Math.floor((screenHeight-TB_HEIGHT)/2);
	}
	
	$("#TB_window").css({left:left_ + widht_dw,top:top_ + height_dw, width: TB_WIDTH + widht_dw, height: TB_HEIGHT+height_dw});

	/*if ( !(jQuery.browser.msie && jQuery.browser.version < 7)) { // take away IE6
		$("#TB_window").css({marginTop: '-' + parseInt((TB_HEIGHT / 2),10) + 'px'});
	}*/
	
	/*if(height_dw=='%'){
		$("#TB_window").css({marginTop:'0px'});
	}*/
	//弹出框中的iframe宽高按百分比设置，目的是为了适应浏览器窗口变动时自适应大小
	$("#TB_window").find("#TB_iframeContent,#TB_ajaxContent").css({width:'98%',height:'98%'});
}


function getTbWidth(url) {
	
	var queryString = url.replace(/^[^\?]+\??/,'');
	var params = tb_parseQuery( queryString );

	var TB_WIDTH =((getRealNum(params['width'])[0])*1); 
	
	var widht_dw=getRealNum(params['width'])[1];

	var tb_width_px=TB_WIDTH;
	
	if(widht_dw =='%'){
		//如果是%,则数字大于100,按分辨率计算%
		if(TB_WIDTH>=100){
			var screenWidth=980;//FIXME 宽度如何取值，待定window.innerWidth;
			TB_WIDTH=Math.floor((TB_WIDTH/screenWidth)*10)*10;
			if(TB_WIDTH>89){
				TB_WIDTH=90;
			}
		}
		//var screenWid=window.innerWidth;
		var screenWid = new windowSize().width;
		//保存像素的值
		tb_width_px=Math.floor((TB_WIDTH*screenWid)/100)-40;//减去的40为子页面弹出框中查询组件两边的空白
		
	}

	//add by qhh 20160801 计算当前浏览器的宽高
	tb_width_px=Math.floor(Math.floor((93*(parseInt(tb_width_px)-20))/100)-100);
	setCookie('winWidth', tb_width_px, null, '/');
	
}




function setCookie(name, value)
//设定Cookie值
{
var expdate = new Date();
var argv = setCookie.arguments;
var argc = setCookie.arguments.length;
var expires = (argc > 2) ? argv[2] : null;
var path = (argc > 3) ? argv[3] : null;
var domain = (argc > 4) ? argv[4] : null;
var secure = (argc > 5) ? argv[5] : false;
if(expires!=null) expdate.setTime(expdate.getTime() + ( expires * 1000 ));
document.cookie = name + "=" + escape (value) +((expires == null) ? "" : ("; expires="+ expdate.toGMTString()))
+((path == null) ? "" : ("; path=" + path)) +((domain == null) ? "" : ("; domain=" + domain))
+((secure == true) ? "; secure" : "");
}


function tb_parseQuery ( query ) {
   var Params = {};
   if ( ! query ) {return Params;}// return empty object
   var Pairs = query.split(/[;&]/);
   for ( var i = 0; i < Pairs.length; i++ ) {
      var KeyVal = Pairs[i].split('=');
      if ( ! KeyVal || KeyVal.length != 2 ) {continue;}
      var key = unescape( KeyVal[0] );
      var val = unescape( KeyVal[1] );
      val = val.replace(/\+/g, ' ');
      Params[key] = val;
   }
   return Params;
}

function tb_getPageSize(){
	var de = document.documentElement;
	var w = window.innerWidth || self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
	var h = window.innerHeight || self.innerHeight || (de&&de.clientHeight) || document.body.clientHeight;
	arrayPageSize = [w,h];
	return arrayPageSize;
}

function tb_detectMacXFF(){
  var userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.indexOf('mac') != -1 && userAgent.indexOf('firefox')!=-1) {
    return true;
  }
}
/*
$(document).ready(function(){
		$(".close_div").click(tb_remove);
});
*/
function initThickBox()
{ 
	tb_init('a.thickbox, area.thickbox, input.thickbox');//pass where to apply thickbox
	$(".close_div").click(tb_remove);
}
function initThickBoxByBox(boxId){ 
	tb_init($("#"+boxId).find('a.thickbox, area.thickbox, input.thickbox'));//pass where to apply thickbox
	$("#"+boxId).find(".close_div").click(tb_remove);
}




Dialog = function(){}
Dialog.model_dialog_first=true;
Dialog.unmodel_dialog_outhide = true;
Dialog.model_dialog = function (title,content,width,height,cssName,top,left,z_index){

	if(Dialog.model_dialog_first==true){
	  var temp_float=new String;
	  temp_float+=" <div id='floatBoxBg' class='floatBoxBg' style='z-index:1000;'></div>";
	  temp_float+="<div id=\"floatBox\" class=\"floatBox\" style='z-index:1001;' >";
	  temp_float+="<div class=\"title\"><h4></h4><span><font size='3'>&#x00d7;</font></span></div>";
	  temp_float+="<div class=\"contact\"></div>";
	  temp_float+="</div>";
	  $("body").append(temp_float);
	  dialogFirst=false;
	}
	
	$("#floatBox .title span").click(function(){
		$("#floatBoxBg").hide();
	  	$("#floatBox").hide(); 
	});
	
	$("#floatBox .title h4").html(title);
	contentType=content.substring(0,content.indexOf(":"));
	content=content.substring(content.indexOf(":")+1,content.length);
	switch(contentType){
	  case "url":
	  var content_array=content.split("?");
	  $("#floatBox .contact").ajaxStart(function(){
		$(this).html("loading...");
	  });
	  $.ajax({
		type:content_array[0],
		url:content_array[1],
		data:content_array[2],
		error:function(){
		  $("#floatBox .contact").html("error...");
		},
		success:function(html){
		  $("#floatBox .contact").html(html);
		}
	  });
	  break;
	  case "text":
	  $("#floatBox .contact").html(content);
	  break;
	  case "id":
	  $("#floatBox .contact").html($("#"+content+"").html());
	  break;
	  case "iframe":
	  $("#floatBox .contact").html("<iframe name=\"ifr01\" id=\"ifr01\"  width=\"100%\" height=\""+(parseInt(height)-30)+"px"+"\" scrolling=\"auto\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\"></iframe>");
	  $("#floatBox .contact").find("iframe").attr("src",content);
	}
	if(!left)
	{
		left = (($(document).width())/2-(parseInt(width)/2));
	}
	if(!top)
	{
		top = ($(document).scrollTop()+100);
	}
	if(!z_index)
	{
	  z_index = 1001;
	}
	$("#floatBox").attr("class","floatBox "+cssName);
	$("#floatBox").css({left:left+"px",top:top+"px",width:width,height:height,'z-index':z_index});
	
		$("#floatBoxBg").show();
		$("#floatBox").show();
		
}

Dialog.model_close_dialog = function()
{
	$("#floatBoxBg").hide();
	var floatBox = $("#floatBox");
	floatBox.hide();
}

 Dialog.unmodel_dialog_first=true;

//$(document).bind("click",Dialog.hidden_out_div);
Dialog.hidden_out_div = function(evt) {
	 var element = evt.srcElement||evt.target; 
	 var flag = true;
	 while (element) {
	  if ($(element).hasClass("out_div_hidden")){
	   		flag = false;
			break;
	  }
	  	element = element.parentNode; 
	 }
	 if (flag) {
	 	$(".out_div_hidden").hide();
	 }
}

Dialog.unmodel_dialog = function(title,content,width,height,cssName,top,left,z_index){
	if(Dialog.unmodel_dialog_first == true){
	  var temp_float=new String;
	  temp_float+="<div id=\"floatNmodelDialog\" class=\"out_div_hidden floatBox\" style='z-index:1001;' >";
	  temp_float+="<div class=\"title\"><h4></h4><span><font size='3'>&#x00d7;</font></span></div>";
	  temp_float+="<div class=\"contact\"></div>";
	  temp_float+="</div>";
	  $("body").append(temp_float);
	  dialogFirst=false;
	}
	
	$("#floatNmodelDialog .title span").click(function(){
	  	$("#floatNmodelDialog").hide();
	});
	
	$("#floatNmodelDialog .title h4").html(title);
	contentType=content.substring(0,content.indexOf(":"));
	content=content.substring(content.indexOf(":")+1,content.length);
	switch(contentType){
	  case "url":
	  var content_array=content.split("?");
	  $("#floatNmodelDialog .contact").ajaxStart(function(){
		$(this).html("loading...");
	  });
	  $.ajax({
		type:content_array[0],
		url:content_array[1],
		data:content_array[2],
		error:function(){
		  $("#floatNmodelDialog .contact").html("error...");
		},
		success:function(html){
		  $("#floatNmodelDialog .contact").html(html);
		}
	  });
	  break;
	  case "text":
	  $("#floatNmodelDialog .contact").html(content);
	  break;
	  case "id":
	  $("#floatNmodelDialog .contact").html($("#"+content+"").html());
	  break;
	  case "iframe":
	  $("#floatNmodelDialog .contact").html("<iframe name=\"ifrNmodelDialog01\" id=\"ifrNmodelDialog01\"  width=\"100%\" height=\""+(parseInt(height)-30)+"px"+"\" scrolling=\"no\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\"></iframe>");
	  $("#floatNmodelDialog .contact").find("iframe").attr("src",content);
	}
	if(!left)
	{
		left = $(document).width()/2-(parseInt(width)/2);
	}
	if(!top)
	{
		top = $(document).scrollTop()+150;
	}
	if(!z_index)
	{
	  z_index = 1002;
	}
	if(Dialog.unmodel_dialog_outhide){
		$(document).bind("click",Dialog.hidden_out_div);
	}
	setTimeout(function(){
		$("#floatNmodelDialog").attr("class","out_div_hidden floatBox "+cssName);
		$("#floatNmodelDialog").css({display:"block",left:left+"px",top:top + "px",width:width,height:height,'z-index':z_index});
		$("#floatNmodelDialog").show();
	},100);	
}

Dialog.unmodel_close_dialog = function ()
{  
	$("#floatNmodelDialog").hide();
}




ScholarAutoName = function(){};

//加载自动email提示框
ScholarAutoName.loadAutoMail = function (outer_div,div_id,url){
	
	var auto_div = $('#'+div_id);
	var auto_input = auto_div.find(".auto_name_input");
	//清除原有的内容
	auto_div.find(".auto_name_div").remove();
	//如果已经绑定了事件
	if(auto_div.hasClass("is_bind_autoname"))
	{	
		auto_input.focus();
		return;
	}else{
		auto_div.addClass("is_bind_autoname");
	}
	
	auto_input.autocomplete(url, {
			width: 310,
			highlight: function(value,term){return value;},
			max:11,
			dataType:'JSON',
			scroll: false,
			cacheLength: 0,
			autoFill: false,
			extraParams: {'excludePsn':function(){	//已选择的人员，排除
				var psn_ids = ScholarAutoName.get_psn_ids(div_id);
				return psn_ids.join(",");}},
			parse: function(data){//转化数据
			 var rows = eval("("+data+")");
			 if(!rows || rows.length == 0)
			 {
				ScholarAutoName.showTips(auto_input,"nexit",true);
			 }
				var parsed = [];
				for(var i=0;i<rows.length;i++){
					var item = rows[i];
					parsed.push({data:item,value:item.psn_id.toString(),result:item.name});
				}
				return parsed;
			},
			formatItem: function(data, i, n, value, term) {
				return data.name;
			}
	});
	
	//选择了自动提示的结果后处理
	findValueCallback = function (event, data, formatted) {
		
		ScholarAutoName.add_name_div(div_id,data.psn_id,data.name,true)
		auto_input.val("");
		if(typeof(ajaxSetFriend)!="undefined"){
			ajaxSetFriend(data.psn_id);
		}
	}
	
	auto_input.result(findValueCallback);
	
	$("#"+outer_div).bind('click',function(){
		auto_input.focus();
	});
	auto_div.bind('click',function(ev){
		auto_input.focus();
		ScholarAutoName.cancleEventUp(ev);
	});
	auto_input.bind('click',ScholarAutoName.cancleEventUp);
		auto_input.keydown(function(event){
		ScholarAutoName.inputDow(event);ScholarAutoName.cancleEventUp(event);
	});
	
	auto_input.focus(function(){
							  
		if($.trim(this.value) == "")
		{
			ScholarAutoName.showTips(this,"empty",true);
		}else{
			ScholarAutoName.showTips(this,"empty",false);
		}
	});
	//离开焦点
	auto_input.blur(function(){
		
		var obj = this;
		
		setTimeout(function(){
			//如果输入框不为空，则提示未找到信息
			if($.trim(obj.value) != "")
			{
				ScholarAutoName.showTips(obj,"nexit",true);
			}
		},80);
		
		this.value = "";
		//清除提示信息
		setTimeout(function(){
			ScholarAutoName.showTips(obj,"empty",false);
			ScholarAutoName.showTips(obj,"nexit",false);
		},1000);
		
	});
	
	auto_input.keyup(function(event){
		ScholarAutoName.checkLength(this);
	});
	
}
//获取用户ID
ScholarAutoName.get_psn_ids = function(div_id)
{
	var divs = $("#"+div_id).find(".auto_name_div");
	var psn_ids = [];
	for(var i = 0;i < divs.size();i++)
	{
		var psn_id = $(divs[i]).attr("psn_id");
		if(psn_id){
			psn_ids.push(psn_id);
		}
	}
	return psn_ids;
}
//根据psn_id删除块
ScholarAutoName.remove_name_div = function (div_id,psn_id)
{
	var auto_div = $('#'+div_id);
	auto_div.find(".auto_name_div[psn_id='"+psn_id+"']").remove();
}
//往输入框中加数据
ScholarAutoName.add_name_div = function (div_id,psn_id,name,need_foucs)
{
	psn_id = $.trim(psn_id);
	//查重
	var psn_ids = ScholarAutoName.get_psn_ids(div_id);
	for(var i = 0;i < psn_ids.length;i++)
	{
		//如果重复，则不加入
		if(psn_id == psn_ids[i])
		{
			return;
		}
	}
	
	var auto_div = $('#'+div_id);
	var auto_input = auto_div.find(".auto_name_input");
	var new_div = ScholarAutoName.create_name_div(psn_id,name);
	new_div.insertBefore(auto_input);
	if(need_foucs)
		auto_input.focus();
}

//创建一个块
ScholarAutoName.create_name_div = function (psn_id,name)
{
	var new_div = $('<div class="auto_name_div" psn_id="'+psn_id+'"></div>');
	new_div.html(name);
	var new_img = $("<a href='javascript:void(0)' class='auto_name_div_del' onclick='$(this).parent().remove();ScholarAutoName.cancleEventUp(event);' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>");
	new_div.append(new_img);
	return new_div;
}

//cxr重载
ScholarAutoName.add_name_div_iris = function (div_id,psn_id,name,need_foucs)
{
	psn_id = $.trim(psn_id);
	//查重
	var psn_ids = ScholarAutoName.get_psn_ids(div_id);
	for(var i = 0;i < psn_ids.length;i++)
	{
		//如果重复，则不加入
		if(psn_id == psn_ids[i])
		{
			return;
		}
	}
	
	var auto_div = $('#'+div_id);
	var auto_input = auto_div.find(".auto_name_input");
	var new_div = ScholarAutoName.create_name_div_iris(psn_id,name);
	new_div.insertBefore(auto_input);
	if(need_foucs)
		auto_input.focus();
}

//创建一个块
ScholarAutoName.create_name_div_iris = function (psn_id,name)
{
	var new_div = $('<div class="auto_name_div" psn_id="'+psn_id+'"></div>');
	new_div.html(name);
	return new_div;
}


//防止事件冒泡
ScholarAutoName.cancleEventUp = function (e){
	// If an event object is provided, then this is a non-IE browser
	if ( e && e.stopPropagation )
	// and therefore it supports the W3C stopPropagation() method
	e.stopPropagation();
	else if(window.event){
		window.event.cancelBubble = true;
	}
}

//删除、移动事件
ScholarAutoName.inputDow = function (ev){
	 ev  =  ev  ||  window.event; // 事件     
	 var  inpt  =  ev.target  ||  ev.srcElement; // 获得事件源
	if(inpt.value == ""){
		if(ev.keyCode == "8"){		
			$(inpt).prev().remove();
		}else if(ev.keyCode == "37"){
			var id = inpt.id;
			$(inpt).prev().before($(inpt));
			setTimeout('$("#'+id+'").focus()',80);
		}else if(ev.keyCode == "39"){
			var id = inpt.id;
			$(inpt).next().after($(inpt));
			setTimeout('$("#'+id+'").focus()',80);
		}
		ScholarAutoName.showTips(inpt,"empty",true);
	}else{
		ScholarAutoName.showTips(inpt,"empty",false)
	}
}

ScholarAutoName.showTips = function(inpt,type,is_show)
{
	
	if("empty" == type)
	{
		if(is_show)
		{
			var tips = $(inpt).parent().find(".auto_name_empty_tips");
			tips.css("left",$(inpt).offset().left);
			tips.css("top",$(inpt).offset().top+23);
			tips.show();
		}else{
			$(inpt).parent().find(".auto_name_empty_tips").hide();
		}
	}else if( "nexit" == type)
	{
		if(is_show)
		{
			var tips = $(inpt).parent().find(".auto_name_nexit_tips");
			tips.css("left",$(inpt).offset().left);
			tips.css("top",$(inpt).offset().top+23);
			tips.show();
		}else{
			$(inpt).parent().find(".auto_name_nexit_tips").hide();
		}
	}
}
//检测长度
ScholarAutoName.checkLength = function (input) {
 var maxchar=50;
 var iCount = input.value.replace(/[^\u0000-\u00ff]/g,"aa").length;
 if(iCount<=maxchar)
 {
	   input.style.width="";
	   input.size=iCount+1;
 }
};
//请求好友跟新引用
function sendRecommend(){
	try{
		var recommendReason = $("#recommendReason2").val(); 
		if(recommendReason == null || recommendReason== undefined || recommendReason==description){
			recommendReason="";
		}  
	}catch(e){
		recommendReason = "";
	}
	if(recommendReason.length>200){ 
		jAlert(maxLength,prompt); 
		return;
	}  
	var receivers = "";
	var psnIds = [];
	$("#auto_name_inner_div1").find('.auto_name_div').each(function(){
		psnIds.push($(this).attr("psn_id"));
	});
	var pubIds = selectedPubIds();
	receivers = psnIds.join(","); 
	if (pubIds == "") {
		show_msg_tips("warn", required_publication);
		return false;
	}
	var post_data = {
		"receivers":receivers,
		"pubIds" : pubIds,
		"recommendReason":recommendReason
	}; 
	 $.ajax({
			url : '${ctx}/pubcited/ajaxApplyUpdateCited',
			type : 'post',
			dataType:'json',
			data : post_data,
			success : function(data) { 
				if(data&&data.result=='success'){ 
					show_msg_tips("success",operationSuccess);
				}
			},
				error:function(){
			}
	});	 
	 closeShareDialog('floatBoxBgEmail2','floatBoxEmail2');
	 tb_remove();
} 

function windowSize(){
	var de = document.documentElement;
	this.width = window.innerWidth || self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
	this.height = window.innerHeight || self.innerHeight || (de&&de.clientHeight) || document.body.clientHeight;
}