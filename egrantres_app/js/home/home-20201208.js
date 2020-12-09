function scrollul(s){
	var $ul = $(s+" ul");
 	var liHeight = $ul.find("li:last").height();
 	$ul.animate({marginTop : liHeight+20 +"px"},1000,function(){
		$ul.find("li:last").prependTo($ul);
		$ul.find("li:first").hide();
		$ul.css({marginTop:0});
		$ul.find("li:first").fadeIn(1000);
	});
}
function setTab(name,cursel,n,scrollFlag,parentIFrameName,isShow,firstCode){
	var menu;
	var con;
	$("div[id^='con_three_']").each(function(i,k){
		$(this).css("display","none");
	});
	for(var i=1;i<=n;i++){
		menu=$("#"+name+i);
		con=$("#con_"+name+"_"+i);
		menu.attr('class',i==cursel?"hover":"");
		con.css('display',i==cursel?"block":"none");
		
	}
	var obj = null;
	if(isShow == '0'){
		$("li[id^='three_']").each(function(i,k){
			$(this).attr("class","");
		});
		$("#second_menu_"+firstCode).find("li").first().attr("class","hover");
		
		$("div[id^='con_three_"+firstCode+"_']").each(function(i,k){
			if(i == 0){
				$(this).css("display","block");
				obj = $(this);
			}
		});
	}
	
	if(scrollFlag && true == scrollFlag){
		divContentRoll(cursel);
	}
	
	if(window.parent && 'show-grant-list' == parentIFrameName){
		if(isShow == '0'){
			bindSecButton("second_menu_"+firstCode);
			var secHeight = $("#second_menu_"+firstCode).find('div').first().height();
			window.parent.document.getElementById('show-grant-list').height =secHeight +obj.find('table').first().height()+40+8;
		}else{
			window.parent.document.getElementById('show-grant-list').height = $("#con_"+name+"_"+cursel).find('table').first().height()+56;
		}
	}
}

function setSecTab(name,cursel,n,scrollFlag,parentIFrameName,secCode,firstCode){
	var menu;
	$("div[id^='con_two_']").each(function(i,k){
		$(this).css("display","none");
	});
	
	$("li[id^='three_']").each(function(i,k){
		$(this).attr("class","");
	});
	$("#three_"+secCode).attr("class","hover");
	
	$("div[id^='con_three_"+firstCode+"_']").each(function(i,k){
		$(this).css("display","none");
	});
	var con=$("#con_"+name+"_"+firstCode+"_"+secCode);
	con.css('display',"block");
	
	if(scrollFlag && true == scrollFlag){
		divContentRoll(cursel);
	}
	
	if(window.parent && 'show-grant-list' == parentIFrameName){
		   var secHeight = $("#second_menu_"+firstCode).find('div').first().height();
		   var tableHeight= $("#con_"+name+"_"+firstCode+"_"+secCode).find('table').first().height();
			window.parent.document.getElementById('show-grant-list').height = tableHeight + secHeight + 40+8;
	}
}

function showHidenSecondMenu(firstCode){
	$("[name='second_menu']").hide();
	$("#second_menu_"+firstCode).show();
	if($("#second_menu_"+firstCode).length<1){
		$("table[class^='index-table02']").removeClass("have_border_top").addClass("no_border_top");
	}else{
		$("table[class^='index-table02']").removeClass("no_border_top").addClass("have_border_top");
	}
}

function submitProposal(type, systemCode, code)
{
	var url = 'main?bstd='+type+"&systemCode="+systemCode;
	if(!!code){
		url += "&subGrantCode="+code;
	}
	if(!!url){
		noLoginRequest(url+'&roleId=XAvjlooU%2BnE%3D');
	}
	return false; 
}

function noLoginRequest(url){
 	url= ctx + "/" + url;
 	$.ajax({
 		url:url,
 		type: 'post',
 		dataType : 'json',
 		data : '',
 		success : function (data) {
 			ajaxSessionTimeoutHandler(data, url);
 		},
 		error : function(){
 		}
 	});
 }

function ajaxSessionTimeoutHandler(data, url){
	var  ajaxTimeOutFlag=data['ajaxSessionTimeOut'];
	var systemCode = data['systemCode'];
	if(ajaxTimeOutFlag!=null && typeof ajaxTimeOutFlag!="undefined" && ajaxTimeOutFlag=='yes'){
		var win = window.parent || window;
		win.tb_show("请登录", ctx + "/index-login-window?f_page=logindlg&targetUrl="+encodeURIComponent(url)+"&systemCode="+systemCode+"&TB_iframe=true&height=520px&width=400px", false);
	}
 	return false;
}

function viewOrgEdit(grant_code,liablePsnCode,stat_year,batch){
	var win = window.parent || window;
	win.tb_show("联系方式",ctx + "/index/grant-consul/grant-org-info?grantCode="+grant_code+"&liablePsnCode="+liablePsnCode+"&statYear="+stat_year+"&batch="+batch+"&TB_iframe=true&height=290&width=520",false);
}
function viewSampleWordCode(grant_code){
	var win = window.parent || window;
	win.tb_show("历史申报指南",ctx + "/show-sample-word?grantCode="+grant_code+"&TB_iframe=true&height=290&width=520",false);
}

function grantConsul(grant_code){
	var win = window.parent || window;
	win.tb_show("业务咨询",ctx + "/index/grant-consul/grant-consul-edit?grantCode="+grant_code+"&TB_iframe=true&height=300&width=500",false);
}
var login_timer = "";
function divContentRoll(num){
	if(login_timer != '') clearInterval(login_timer);
	var newsOne = $("#divContent1_"+num);
   var newsTwo = $("#divContent2_"+num);
   var latestNews = $("#divContent_"+num)[0];
   if(!latestNews) return;
   newsTwo.html(newsOne.html());
   latestNews.scrollTop = 0;
   this.newsScroll = function(){
	   if((latestNews.scrollHeight - latestNews.offsetHeight) <= latestNews.scrollTop)
			latestNews.scrollTop = 0;
		else
			latestNews.scrollTop = latestNews.scrollTop + 1;
    };
	login_timer = setInterval(this.newsScroll, 50);
	var newsScroll_1 = this.newsScroll;
	$("#divContent_"+num).hover(function(){
		clearInterval(login_timer);
	}).mouseleave(function(){
		login_timer = setInterval(newsScroll_1, 50);
	});
}


function searchInfo(title,obj,flag, systemCode){
	var prp_no = $(obj).parent().parent().find("[name='prp_no']").val();
	var org_name = $(obj).parent().parent().find("[name='org_name']").val();
	var psn_name = $(obj).parent().parent().find("[name='psn_name']").val();
	var zh_title = $(obj).parent().parent().find("[name='zh_title']").val();
	if((prp_no==''||prp_no==undefined) && (org_name==''||org_name==undefined) && (psn_name==''||psn_name==undefined) && (zh_title==''||zh_title==undefined))
	{
		alert("请输入查询条件");
	}
	else
	{
		var win = window.parent || window;
		var url = ctx + "/search-info?prp_no="+encodeURIComponent(prp_no)+"&org_name="+encodeURIComponent(encodeURIComponent(org_name))+"&psn_name="+encodeURIComponent(encodeURIComponent(psn_name))+"&zh_title="+encodeURIComponent(encodeURIComponent(zh_title))+"&flag="+flag+"&systemCode="+systemCode+"&TB_iframe=true&height=500&width=800";
		//var message = {'title':title,'url':url};
		//win.postMessage(JSON.stringify(message),'*');
		/*var message = '{'+'"title"'+':"'+encodeURI(title)+'",'+'"url"'+':"'+encodeURI(url)+'"}';
		win.postMessage(message,'*');*/
		
		tb_show("信息公开", url, false);
	}
	
}

function refreshCode(){
	document.getElementById("img_checkcode").src = ctx+"/validatecode.jpg?date="+Date.parse(new Date());//new Date();
}

function MM_jumpMenu(obj){
	var val = $(obj).find("option:selected").val();
	if(!!val){
		window.location.href = val;
	}
}

$(function(){
	var aa =$("#initilaze").val();
	if(aa!=1){
		$("li#two1").click();
	}
	
});

function SetWinHeight(obj){
	var win=obj;
	if (document.getElementById){
		if (win && !window.opera){
			if (win.contentDocument && win.contentDocument.body.offsetHeight)
				win.height = win.contentDocument.body.offsetHeight - 117;
			else if(win.Document && win.Document.body.scrollHeight)
				win.height = win.Document.body.scrollHeight -117;
		}
	}
} 
