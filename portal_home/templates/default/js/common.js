$( function(){
    $(".list .list-main .main-list-ul ul li p").hover(function(){
        $(this).find("span").addClass("hover-span");
        $(this).stop().animate({top:'0'});
    },function(){
        $(this).find("span").removeClass("hover-span");
        $(this).stop().animate({top:'138px'});
    })


	$('#checkbox_d1').next('label').bind('click',function(){
		$('div.Mcontent').toggleClass('hide');
		$(this).toggleClass("zk");
	});

/*
	$('#checkbox_d1').next('label').bind('click',function(){
		$('div.Mcontent').toggleClass('hide');
		$(this).toggleClass("zk");
	});
*/

	$(".nav a").hover(function(){
			$(".nav a").removeClass("aNow");
		},
		function() {
			$(".nav a").eq(0).addClass("aNow");
    });

	$(".list-main .main-nav ul li").hover(function(){
		$(this).find(".ol").removeClass("display-none");
	},function(){
		$(this).find(".ol").addClass("display-none");
	})

	$(".article .article-main ul li p").hover(function(){
		$(this).find("span").addClass("hover-span");
		$(this).stop().animate({top:'0'});
	},function(){
		$(this).find("span").removeClass("hover-span");
		$(this).stop().animate({top:'152px'});
	})

	//--
	$('.nav').find('li:last').css('background','none');
	//--
	$('.tabContentDiv').find('.tabContent:first').show();
	$('.wapleft .tab').each(function(i){
		$(this).find('li').each(function(ii){
			$(this).hover(
				function(){
					var me = this;
					$(me).parents(".tab").eq(i).find('li').removeClass('liNow');
					//$('.tab').eq(i).find('li').removeClass('liNow');
					$(me).addClass('liNow');
					// $('.tabContentDiv').eq(i).find('.tabContent').hide();
					// $('.tabContentDiv').eq(i).find('.tabContent').eq(ii).show();
					var contentDiv = $(me).parents(".tab").siblings(".tabContentDiv");
					$(contentDiv).eq(i).find('.tabContent').hide();
					$(contentDiv).eq(i).find('.tabContent').eq(ii).show();
				},
				function(){
					//--
				}
			);
		});
	});

	$('.chengguo .tab').each(function(i){
		$(this).find('li').each(function(ii){
			$(this).hover(
				function(){
					var me = this;
					$(me).parents(".tab").eq(i).find('li').removeClass('liNow');
					//$('.tab').eq(i).find('li').removeClass('liNow');
					$(me).addClass('liNow');
					// $('.tabContentDiv').eq(i).find('.tabContent').hide();
					// $('.tabContentDiv').eq(i).find('.tabContent').eq(ii).show();
					var contentDiv = $(me).parents(".tab").siblings(".tabContentDiv");
					$(contentDiv).eq(i).find('.tabContent').hide();
					$(contentDiv).eq(i).find('.tabContent').eq(ii).show();
				},
				function(){
					//--
				}
			);
		});

	});

    $('.zwleft .tab').each(function(i){
        $(this).find('li').each(function(ii){
            $(this).hover(
                function(){
                    var me = this;
                    $(me).parents(".tab").eq(i).find('li').removeClass('liNow');
                    //$('.tab').eq(i).find('li').removeClass('liNow');
                    $(me).addClass('liNow');
                    // $('.tabContentDiv').eq(i).find('.tabContent').hide();
                    // $('.tabContentDiv').eq(i).find('.tabContent').eq(ii).show();
                    var contentDiv = $(me).parents(".tab").siblings(".tabContentDiv");
                    $(contentDiv).eq(i).find('.tabContent').hide();
                    $(contentDiv).eq(i).find('.tabContent').eq(ii).show();
                },
                function(){
                    //--
                }
            );
        });

    });

	//--
	$('.indexFlash li').each(function(i){
		if(i == 0){
			$('.indexFlash .btnDiv').append('<span class="spanNow"></span>');
		}else{
			$('.indexFlash .btnDiv').append('<span></span>');
		}
	});
	//--
	$('.sNavPart4').find('li').hover(
		function(){
			$(this).find('.name').fadeIn(200);
		},
		function(){
			$(this).find('.name').fadeOut(200);
		}
	);
	//--
	$('.sNavA').each(function(i){
		$(this).hover(
			function(){
				$('.sNavA').eq(i).addClass('aNow1');
				$('.sNav').eq(i).show();
				/*back20180117 领导信息滚动start*/
                swiper1 = new Swiper('.leader.swiper-container', {
                    slidesPerView: 'auto',
                    paginationClickable: true,
                    spaceBetween: 30,
                });
                $('#prev_leader').on('click', function(e){
                    e.preventDefault();
                    swiper1.swipePrev();
                });
                $('#next_leader').on('click', function(e){
                    e.preventDefault();
                    swiper1.swipeNext();
                });

                /*back20180117 领导信息滚动end*/
			},
			function(){
				$('.sNavA').removeClass('aNow1');
				$('.sNav').hide();
			}
		);
	});
	$('.sNav').each(function(i){
		$(this).hover(
			function(){
				$('.sNavA').eq(i).addClass('aNow1');
				$(this).show();
                $('.nav li a').removeClass('aNow');
				$('.nav li a').eq(i+1).addClass('aNow');
			},
			function(){
				$('.sNavA').removeClass('aNow1');
				$(this).hide();
                $('.nav li a').removeClass('aNow');
                $('.nav li a').eq(0).addClass('aNow');
			}
		);
	});
	/*今日关注选项卡切换*/
	$('#att_nav li').each(function(i){
		$(this).mouseover(function(){
			$('.c').find('.right').eq(i).show();
			$(this).addClass('hov');
			$(this).siblings().removeClass('hov');
			$('.c').find('.right').eq(i).siblings().hide();
		});
	});
	//--
	//--
	$('.news').find('li').hover(
		function(){
			$(this).addClass('liNow');
		},
		function(){
			$(this).removeClass('liNow');
		}
	);
	//--
	$('.interactivePart4').find('tr').hover(
		function(){
			$(this).find('td').addClass('tdNow');
		},
		function(){
			$(this).find('td').removeClass('tdNow');
		}
	);
	//--
	$('.sideBar .close a').click(function(){
		$('.sideBar').hide();
	});
	$('.sideBar li.li_01').hover(function(){
		$(this).find('.gwdshare_t').show();
	},function(){
		$(this).find('.gwdshare_t').hide();
	});
	//--
	if($('.newscontent img').width() > 680){
		$('.newscontent img').width(680);
	}
	//--
	var fontsizeArr = ['16px','14px','12px'];
	var bgcolorArr = ['#ffffff','#fff4c1','#d2eaff','#c4fddd','#dad8ff'];
	$('.newsoperation .print a').click(function(){
		$('.newstitle,.newscontent').jqprint();
	});
	$('.newsoperation .fontsize a').each(function(i){
		$(this).click(function(){
			$('.newscontent').css('font-size',fontsizeArr[i]);
		});
	});
	$('.newsoperation .bgcolor a').each(function(i){
		$(this).click(function(){
			$('.newscontainer').css('background-color',bgcolorArr[i]);
		});
	});
	$('.newsoperation .qrcode a').hover(function(){
		$(this).find('p').show();
	},function(){
		$(this).find('p').hide();
	});

	$('#hot').hover(function() {
		$(this).find('.hot').show();
	}, function() {
		$(this).find('.hot').hide();
	});

	// 图书检索
	$('.library .lib li').each(function(index, el) {
		$(this).mouseover(function(event) {
			$('.library .lib li').removeClass('hov');
			$(this).addClass('hov');
			initLibSearch();
		});
	});
	$('#lib_search_form .submit').click(function(event) {
		$('#lib_search_form').submit();
	});

	//外网网址提示
	$('body').on('click','a', function(event) {
		var url = $(this).attr('href');
		var that = this;
		if(!checkUrl(url)){
			if(confirm('您即将访问外部网址:\n\n'+url+'\n\n是否确认继续访问？')){
				$(that).prop('target','_blank');
				return true;
			}else{
				return false;
			}
		}
	});


	$('body').on('click','.sNav .click-block li',function(){

		var url = $(this).find('a').attr('href');
        if(!checkUrl(url)){
            if(confirm('您即将访问外部网址:\n\n'+url+'\n\n是否确认继续访问？')){
                window.open(url);
            }else{
                return false;
            }
        }else{
            window.location.href=url;
		}
	});

    $.ajax({
        url : 'https://app.gd.gov.cn/xxts/pushinfo_json.php',
        dataType : "jsonp",
        jsonp : "pushInfoJsonpCallBack",
        jsonpCallback:"pushInfoJsonpCallBack",
        success : function(data) {
            $.each(data,function(i,json){
//                       $("#zscd_list").append("<li><a href='"+json.link+"'>"+json.title+"<span>["+json.pubDate+"]</span></a></li>");
                $("#zscd_list").append("<li><a href='"+json.link+"'>"+json.title+"></a><font>"+json.pubDate+"</font></li>");
            });
            $.each(data,function(i,json){
                var title = json.title;
                if(title.length > 22){
                    title = title.substr(0,22)+'...';
                }
                $("#zscd2").append("<li><a href='"+json.link+"' title='"+json.title+"'>"+title+"</a><span>"+json.pubDate+"</span></li>");
            });
            console.log('1');
        },
        error:function(a,b,c){
            console.log(a);
            console.log(b);
            console.log(c);
        }
    });
});


/*
var gwdshare = gwdshare || { version: "1.0", udata: "type=tools&amp;uid=GWD-700195&amp;jsf=GWD-700195-4FA989", pageFilter: "", jsLoaded: false };
(function () {
	function async_load() {
		var s = document.createElement('script');
		s.type = 'text/javascript';
		s.async = true;
		s.src = '//static.gridsumdissector.com/zheng_fen_xiang/scripts/gwdshareasync.min.js';
		var x = document.getElementsByTagName('script'), y = x[x.length - 1];
		y.parentNode.appendChild(s);
	}
	if (!gwdshare.jsLoaded) {
		if (window.attachEvent) window.attachEvent('onload', async_load);
		else window.addEventListener('load', async_load, false);
		gwdshare.jsLoaded = true;
	}
})();


function initLibSearch(){
	var selected_obj = $('.library .lib li.hov');
	var selected_index = $('.library .lib li').index(selected_obj);
	switch(selected_index){
		case 2:
			$('.library .search #func').val('find-b');
			$('.library .search #find_base').val('');
			$('.library .search #local_base').val('TCWX');
			break;
		case 3:
			$('.library .search #func').val('find-b');
			$('.library .search #find_base').val('');
			$('.library .search #local_base').val('SETSG');
			break;
		case 4:
			$('.library .search #func').val('find-m');
			$('.library .search #find_base').val('ZSL09');
			$('.library .search #local_base').val('');
			break;
		default:
			$('.library .search #func').val('find-b');
			$('.library .search #find_base').val('KJSK');
			$('.library .search #local_base').val('');
	}
}*/

//检测网址是否本站网址
function checkUrl(url){
	if(url == ''){
		return true;
	}
	var n = url.search('/');
	if(n == 0){
		return true;
	}
	var n = url.search('./');
	if(n == 0){
		return true;
	}
	var n = url.search('../');
	if(n == 0){
		return true;
	}
	n = url.search('da.gd.gov.cn');
	if(n >= 0){
		return true;
	}
	n = url.search(window.location.host);
	if(n == 0){
		return true;
	}
	n = url.search('javascript:');
	if(n >= 0){
		return true;
	}
	n = url.search('#');
	if(n == 0){
		return true;
	}

	n = url.search('http');
	if(n == 0){
		return false;
	}else{
		return true;
	}
}
function login_fun(n) {
	$("."+n).click();
}
