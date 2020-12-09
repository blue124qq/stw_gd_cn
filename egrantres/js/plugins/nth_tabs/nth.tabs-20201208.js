/**
 * nth-tabs
 * author:qiaohaihong
 * version:1.0
 * 功能：tab页签左右切换
*/
(function ($) {
	$.fn.nthTabs =  function(options){
		//插件中的40为默认左边距
		var nthTabs = this;
		var defaults = {
			rollWidth:nthTabs.width()-50 //可滚动的区域宽度，50即2个操作按钮的宽度
		};
		var settings = $.extend({},defaults,options);
		var template = '<a class="icon_arrowLeft" href="###"></a><a class="icon_arrowRight" href="###"></a>';
		//各种api
		var methods = {
			//初始化
			init:function () {
				if(nthTabs.find("ul li").length>1){
					//存在页签时绑定左右移动按钮以及对应的事件
					nthTabs.append(template);
					nthTabs.find('ul').attr('style','width:4000px;');
					if(nthTabs.attr("id")=='tabnav'){
						nthTabs.find("a[class='icon_arrowLeft'],a[class='icon_arrowRight']").css("background-color","#f9f9fb");
					}
					methods.listen();
				}
			},
			//事件监听
			listen:function(){
				event.onTabRollLeft().onTabRollRight();
			},
			//获取所有tab宽度
			getAllTabWidth:function(){
				var sum_width = 0;
				nthTabs.find('li').each(function(){
					sum_width+=parseFloat($(this).width());
				});
				return sum_width;
			},
			//获取左右滑动步值
			getMarginStep:function () {
				return nthTabs.width()-200;
			},
			//tab页父标签所站宽度
			getTabsWidth:function () {
				return nthTabs.width()-50;
			}
		};
		//事件处理
		var event = {
			//左滑选项卡
			onTabRollLeft:function () {
				nthTabs.on("click",'.icon_arrowLeft',function () {
					//如果ul目前的左偏移小于0 则移动
					var contentTab = $(this).parent().find('ul');
					var margin_left_origin =parseFloat(contentTab.css('marginLeft').replace('px',''));
					if(margin_left_origin>=0){
						return false;
					}else{
						margin_left_origin=margin_left_origin+methods.getMarginStep();
						if(margin_left_origin>=0){
							margin_left_origin=0;
						}
						contentTab.css("margin-left",margin_left_origin);
					}
				});
				return event;
			},
			//右滑选项卡
			onTabRollRight:function () {
				nthTabs.on("click",'.icon_arrowRight',function () {
					//所有tab宽度-左边的偏移量《=tab页父标签所占宽度时，不能右移；否则可右移
					var contentTab = $(this).parent().find('ul');
					var margin_left_origin = Math.abs(contentTab.css('marginLeft').replace('px',''));
					if((methods.getAllTabWidth()-margin_left_origin)<=methods.getTabsWidth()){
						return false;
					}else{
						var margin_left_origin = contentTab.css('marginLeft').replace('px','');
						var margin_left_total = parseFloat(margin_left_origin) - methods.getMarginStep();
						contentTab.css("margin-left",margin_left_total);
					}
				});
				return event;
			}
		};
		methods.init();
		return methods;
	}
})(jQuery);
