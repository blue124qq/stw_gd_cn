/*TOPNEWS滚动 jq*/

	$(function() {
		var listLen2 = $(".pic_top_news li").length, i = 0, setInter, speen = 3000;
		$(".btn_top_news li:last").css({
			"margin" : "0px 0px 0px 0px"
		});
		$(".btn_top_news li:first").addClass("on");
		$(".pic_top_news li:first").show();

		$(".btn_top_news li").each(function(index, element) {
			$(element).click(function() {
				i = index;
				$(this).addClass("on").siblings().removeClass("on");
				$(".pic_top_news li").eq(index).animate({
					opacity : "show"
				}, 300).siblings().animate({
					opacity : "hide"
				}, 300);
			});
			$(element).hover(function() {
				clearInterval(setInter);
			}, function() {
				outPlay3();
			});
		});

		out_fun3 = function() {
			if (i < listLen2) {
				i++;
			} else {
				i = 0;
			}
			;
			$(".btn_top_news li").eq(i).addClass("on").siblings().removeClass(
					"on");
			$(".pic_top_news li").eq(i).animate({
				opacity : "show"
			}, 300).siblings().animate({
				opacity : "hide"
			}, 300);
		};

		outPlay3 = function() {
			setInter = setInterval("out_fun3()", speen);
		};
		outPlay3();

	});
	/*TOPNEWS滚动 jq end*/
	
	/*图片轮播 bisness1 jq*/
	$(function() {
		var listLen = $(".pic li").length, i = 0, setInter, speen = 3000;
		$(".btn li:last").css({
			"margin" : "0px 0px 0px 0px"
		});
		$(".btn li:first").addClass("on");
		$(".pic li:first").show();

		$(".btn li").each(function(index, element) {
			$(element).click(function() {
				i = index;
				$(this).addClass("on").siblings().removeClass("on");
				$(".pic li").eq(index).animate({
					opacity : "show"
				}, 300).siblings().animate({
					opacity : "hide"
				}, 300);
			});
			$(element).hover(function() {
				clearInterval(setInter);
			}, function() {
				outPlay();
			});
		});

		out_fun = function() {
			if (i < listLen) {
				i++;
			} else {
				i = 0;
			}
			;
			$(".btn li").eq(i).addClass("on").siblings().removeClass("on");
			$(".pic li").eq(i).animate({
				opacity : "show"
			}, 300).siblings().animate({
				opacity : "hide"
			}, 300);
		};

		outPlay = function() {
			setInter = setInterval("out_fun()", speen);
		};
		outPlay();

	});
	/*图片轮播 jq end*/

	/*图片轮播2 bisness2 jq*/
	$(function() {
		var listLen_b2 = $(".pic2 li").length, i = 0, setInter, speen = 3000;
		$(".btn2 li:last").css({
			"margin" : "0px 0px 0px 0px"
		});
		$(".btn2 li:first").addClass("on");
		$(".pic2 li:first").show();

		$(".btn2 li").each(function(index, element) {
			$(element).click(function() {
				i = index;
				$(this).addClass("on").siblings().removeClass("on");
				$(".pic2 li").eq(index).animate({
					opacity : "show"
				}, 300).siblings().animate({
					opacity : "hide"
				}, 300);
			});
			$(element).hover(function() {
				clearInterval(setInter);
			}, function() {
				outPlay_b2();
			});
		});

		out_fun_b2 = function() {
			if (i < listLen_b2) {
				i++;
			} else {
				i = 0;
			}
			;
			$(".btn2 li").eq(i).addClass("on").siblings().removeClass("on");
			$(".pic2 li").eq(i).animate({
				opacity : "show"
			}, 300).siblings().animate({
				opacity : "hide"
			}, 300);
		};

		outPlay_b2 = function() {
			setInter = setInterval("out_fun_b2()", speen);
		};
		outPlay_b2();

	});
	/*图片轮播2 jq end*/
	
	/*滚动公告*/
	$(function() {
		var scrollTimer = null;
		var delay = 2000;
		//1.鼠标对项目触发mouseout事件后每2s调用scrollNews() 
		//2.鼠标对项目触发mouseover事件后停止调用scrollNews() 
		//3.初次加载页面触发鼠标对项目的mouseout事件 
		$('div.scrollNews').hover(function() {
			clearInterval(scrollTimer);
		}, function() {
			scrollTimer = setInterval(function() {
				scrollNews();
			}, delay);
		}).triggerHandler('mouseout');
	});
	//滚动 
	function scrollNews() {
		var $news = $('div.scrollNews>ul');
		var $lineHeight = $news.find('li:first').height();
		$news.animate({
			'marginTop' : -$lineHeight + 'px'
		}, 600, function() {
			$news.css({
				margin : 0
			}).find('li:first').appendTo($news);
		});
	}
	/*滚动公告end*/
	
	/*滚动保密协会*/
	$(function() {
		var scrollTimer_baomixiehui = null;
		var delay = 2000;
		//1.鼠标对项目触发mouseout事件后每2s调用scrollNews() 
		//2.鼠标对项目触发mouseover事件后停止调用scrollNews() 
		//3.初次加载页面触发鼠标对项目的mouseout事件 
		$('div.scrollNews_baomixiehui').hover(function() {
			clearInterval(scrollTimer_baomixiehui);
		}, function() {
			scrollTimer_baomixiehui = setInterval(function() {
				scrollNews_baomixiehui();
			}, delay);
		}).triggerHandler('mouseout');
	});
	//滚动 
	function scrollNews_baomixiehui() {
		var $news_baomixiehui = $('div.scrollNews_baomixiehui>ul');
		var $lineHeight = $news_baomixiehui.find('li:first').height();
		$news_baomixiehui.animate({
			'marginTop' : -$lineHeight + 'px'
		}, 600, function() {
			$news_baomixiehui.css({
				margin : 0
			}).find('li:first').appendTo($news_baomixiehui);
		});
	}
	/*滚动保密协会end*/
	
	/*滚动政务公开*/
	$(function() {
		var scrollTimer_public = null;
		var delay_public = 2000;
		//1.鼠标对项目触发mouseout事件后每2s调用scrollNews() 
		//2.鼠标对项目触发mouseover事件后停止调用scrollNews() 
		//3.初次加载页面触发鼠标对项目的mouseout事件 
		$('div.scrollPublic').hover(function() {
			clearInterval(scrollTimer_public);
		}, function() {
			scrollTimer_public = setInterval(function() {
				scrollPublic();
			}, delay_public);
		}).triggerHandler('mouseout');
	});
	//滚动 
	function scrollPublic() {
		var $public = $('div.scrollPublic>ul');
		var $lineHeight = $public.find('li:first').height();
		$public.animate({
			'marginTop' : -$lineHeight + 'px'
		}, 600, function() {
			$public.css({
				margin : 0
			}).find('li:first').appendTo($public);
		});
	}
	/*滚动政务公开end*/

	/*局工作label_group jq*/
	$(function() {
		$(".label_group_ul li:first").addClass("label_group_selected");
		
		$(".label_group").hover(
				function() {
					$(this).addClass("label_group_selected").siblings()
							.removeClass("label_group_selected");
					$(".label_group_content_layout").children().eq(
							$(this).index()).show().siblings().hide();
				}, function() {
				});
		$(".label_group_content_part").hover(
				function() {
					$(".label_group_ul").children().eq(
							$(this).index()).addClass("label_group_selected").siblings()
							.removeClass("label_group_selected");
				}, function() {
				});
	});
	/*局工作label_group jq end*/


	/*宣传滚动 jq*/

	$(function() {
		var listLen2 = $(".pic_conduct li").length, i = 0, setInter, speen = 3000;
		$(".btn_conduct li:last").css({
			"margin" : "0px 0px 0px 0px"
		});
		$(".btn_conduct li:first").addClass("on");
		$(".pic_conduct li:first").show();

		$(".btn_conduct li").each(function(index, element) {
			$(element).click(function() {
				i = index;
				$(this).addClass("on").siblings().removeClass("on");
				$(".pic_conduct li").eq(index).animate({
					opacity : "show"
				}, 300).siblings().animate({
					opacity : "hide"
				}, 300);
			});
			$(element).hover(function() {
				clearInterval(setInter);
			}, function() {
				outPlay2();
			});
		});

		out_fun2 = function() {
			if (i < listLen2) {
				i++;
			} else {
				i = 0;
			}
			;
			$(".btn_conduct li").eq(i).addClass("on").siblings().removeClass(
					"on");
			$(".pic_conduct li").eq(i).animate({
				opacity : "show"
			}, 300).siblings().animate({
				opacity : "hide"
			}, 300);
		};

		outPlay2 = function() {
			setInter = setInterval("out_fun2()", speen);
		};
		outPlay2();

	});
	/*宣传滚动 jq end*/

	/*滚动友情链接*/
/*	
 * $(function() {
		var scrollTimer = null;
		var delay = 2000;
		//1.鼠标对项目触发mouseout事件后每2s调用scrollNews() 
		//2.鼠标对项目触发mouseover事件后停止调用scrollNews() 
		//3.初次加载页面触发鼠标对项目的mouseout事件 
		$('div.scrollfl').hover(function() {
			clearInterval(scrollTimer);
		}, function() {
			scrollTimer = setInterval(function() {
				scrollfl();
			}, delay);
		}).triggerHandler('mouseout');
	});
	//滚动 
	function scrollfl() {
		var $news = $('div.scrollfl>ul');
		var $lineHeight = $news.find('li:first').height();
		$news.animate({
			'marginTop' : -$lineHeight + 'px'
		}, 600, function() {
			$news.css({
				margin : 0
			}).find('li:first').appendTo($news);
		});
*	}
*/
	/*滚动友情链接end*/
	
	//飘窗插件
	
	$(function(){
		$('.automv').autoMove({angle:-Math.PI/4, speed:120});
		
		/*关闭飘窗*/
		$('.ad_window_close_btn').click(function(){
			$(this).parent().hide();
		});
		/*$('.automv').click(function(){
			$(this).hide();
		});*/
	});
	
	/*友情链接下拉菜单*/
	
	$(document).ready(function(){ 
		
	$('#select_fl1').change(function(){ 
	/*alert($(this).children('option:selected').val()); */
	var p1=$(this).children('option:selected').val();//这就是selected的值 
	$(this).val('#'); 
	window.open(p1);//页面跳转并传参 
	}); 
	
	$('#select_fl2').change(function(){ 
		/*alert($(this).children('option:selected').val()); */
		var p2=$(this).children('option:selected').val();//这就是selected的值 
		$(this).val('#'); 
		window.open(p2);//页面跳转并传参 
		}); 
	
	$('#select_fl3').change(function(){ 
		/*alert($(this).children('option:selected').val()); */
		var p3=$(this).children('option:selected').val();//这就是selected的值 
		$(this).val('#'); 
		window.open(p3);//页面跳转并传参 
		}); 
	
	}); 
	
	/*飘窗*/
	//定义插件
    !function($){
    /**
    * Description: jquery飘窗插件，可自适应浏览器宽高的变化
    * param: args={startL:default, startT:default, angle:-Math.PI/4, speed: 125} 
    * 参数说名: startL飘窗初始时距离左边的距离, startT飘窗初始化距离顶部的距离, angle飘窗初始运动方向, speed运动速度(px/s)
    */
    $.fn.autoMove = function(args){
        //先定义一些工具函数判断边距
        function isTop(pos, w_w, w_h, d_w, d_h){//飘窗到达上边距
            if(pos.top<=0){
                return true;
            }else{
                return false;
            }
        }
        function isBottom(pos, w_w, w_h, d_w, d_h){//飘窗到达下边距
            if(pos.top>=(w_h-d_h)){
                return true;
            }else{
                return false;
            }
        }
        function isLeft(pos, w_w, w_h, d_w, d_h){//飘窗到达左边距
            if(pos.left<=0){
                return true;
            }else{
                return false;
            }
        }
        function isRight(pos, w_w, w_h, d_w, d_h){//飘窗到达右边距
            if(pos.left>=(w_w-d_w)){
                return true;
            }else{
                return false;
            }
        }
        return this.each(function(){
            var w_w = parseInt($(window).width()),
                w_h = parseInt($(window).height()),
                d_w = parseInt($(this).width()),
                d_h = parseInt($(this).height()),
                d_l = (w_w-d_w)/2,
                d_t = (w_h-d_h)/2,
                max_l = w_w - d_w;
                max_t = w_h - d_h;
                //位置及参数的初始化
            var setobj = $.extend({startL:d_l, startT:d_t, angle:Math.PI/4, speed:100}, args);
            $(this).css({position: 'absolute', left: setobj['startL']+'px', top: setobj['startT']+'px'});
            var position = {left: setobj['startL'], top: setobj['startT']};//飘窗位置对象
            var that = $(this);
            var angle= setobj.angle;
            var time = 10;//控制飘窗运动效果，值越小越细腻
            var step = setobj.speed * (time/1000);//计算运动步长
            var decoration = {x:step*Math.cos(angle), y:step*Math.sin(angle)};//计算二维上的运动增量
            var mvtid;
            $(window).on('resize', function(){//窗口大小变动时重新设置运动相关参数
                w_w = parseInt($(window).width()),
                w_h = parseInt($(window).height()),
                max_l = w_w - d_w;
                max_t = w_h - d_h;
            });
            function move(){
                position.left += decoration.x;
                position.top  += decoration.y;
                if(isLeft(position, w_w, w_h, d_w, d_h)||isRight(position, w_w, w_h, d_w, d_h)){
                    decoration.x = -1*decoration.x;
                }
                if(isRight(position, w_w, w_h, d_w, d_h)){
                    position.left = max_l;
                }
                if(isTop(position, w_w, w_h, d_w, d_h)||isBottom(position, w_w, w_h, d_w, d_h)){
                    decoration.y = -1*decoration.y;
                }
                if(isBottom(position, w_w, w_h, d_w, d_h)){
                    position.top = max_t;
                }
                //that.css({left:position.left, top:position.top});
                that.animate({left:position.left, top:position.top}, time);//改用jquery动画函数使其更加平滑
                mvtid = setTimeout(move, time);//递归调用，使飘窗连续运动
            }
            move();//触发动作
            that.on('mouseenter', function(){ clearTimeout(mvtid) });//添加鼠标事件
            that.on('mouseleave', function(){ move() });
        });
    }//end plugin definition
    }(jQuery);