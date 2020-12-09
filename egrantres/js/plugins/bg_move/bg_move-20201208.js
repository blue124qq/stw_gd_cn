(function(){
	function b(t,s){
		this.t = t;
		this.c = t.find(s.move).first();
		this.cs = t.find(s.closed).first();
		this.m = false;
		this.s = false;
		this.hide = 5;
		this.size_bg = s.size;
		this.init();
		this.callBackFn=s.callBackFn;
		this.tbWII=s.tbWII;
	}
	b.prototype = {
		init:function(){
			try {
				var t = this;
				t.box_sizing = t.t.css('box-sizing');
				t.top = t.t.offset().top - $(window).scrollTop();
				t.left = t.t.offset().left - $(window).scrollLeft();

				t.height = t.t.outerHeight();
				t.width = t.t.outerWidth();
				t.w_width = $(window).width();
				t.w_height = $(window).height();
				if(t.box_sizing != 'border-box'){
					t.c_width = t.width - t.t.width();
					t.c_height = t.height - t.t.height();
				}else{
					t.c_width = 0;
					t.c_height = 0;
				}
				t.t.css({'max-height':t.w_height-t.c_height,'max-width':t.w_width-t.c_width,'position':'fixed'});
				/*$(window).resize(function(){
					t.w_width = $(window).width();
					t.w_height = $(window).height();
					if(t.box_sizing != 'border-box'){
						t.c_width = t.width - t.t.width();
						t.c_height = t.height - t.t.height();
					}else{
						t.c_width = 0;
						t.c_height = 0;
					}
					if(t.t.width() > t.w_width-t.c_width){
						t.t.width(t.w_width-t.c_width);
					}
					if(t.t.height() > t.w_height-t.c_height){
						t.t.height(t.w_height-t.c_height);
					}
					t.t.css({'max-height':t.w_height-t.c_height,'max-width':t.w_width-t.c_width});
					t.height = t.t.outerHeight();
					t.width = t.t.outerWidth();
					if(t.width + t.left >= t.w_width){
						t.left = t.w_width - t.width;
						if(parseInt(t.t.css('left'))<0){
							t.t.css('left',-t.width+t.hide);
						}else if(parseInt(t.t.css('left'))>t.w_width-t.width){
							t.t.css('left',t.w_width-t.hide);
						}else{
							t.t.css('left',t.left);
						}
					}
					if(t.height + t.top >= t.w_height){
						t.top = t.w_height - t.height;
						if(parseInt(t.t.css('top'))<0){
							t.t.css('top',-t.height+t.hide);
						}else{
							t.t.css('top',t.top);
						}
					}
				});*/
				t.move();
				t.size();
			} catch (e) {
			}
		},
		move:function(){
			try {
				var t = this;
				t.c.addClass("bg_move_drag_");
				t.cs.on('mousedown',function(){
					t.top = 0;
					t.left = 0;
					t.t.animate({top:0,left:0},300,function(){
						t.top_animate();
					});
					return false;
				});
				t.c.on('mousedown',function(e){
					t.m = true;
					t.x = e.pageX;
					t.y = e.pageY;
					t.height = t.t.outerHeight();
					t.width = t.t.outerWidth();
					t.c.on('mousemove',function(e){
						t.left2 = t.left+e.pageX-t.x;
						t.top2 = t.top+e.pageY-t.y;
						if(t.left2 <=0){
							t.left2 = 0;
						}else if(t.left2 >= t.w_width-t.width){
							t.left2 = t.w_width-t.width;
						}
						if(t.top2 <=0){
							t.top2 = 0;
						}else if(t.top2 >= t.w_height-t.height){
							t.top2 = t.w_height-t.height;
						}
						t.t.css({'top':t.top2,'left':t.left2});
						return false;
					});
					t.c.on('mouseup',function(e){
						t.top = t.t.offset().top - $(window).scrollTop();
						t.left = t.t.offset().left - $(window).scrollLeft();
						if(t.top == 0 && t.leave(e.pageX,e.pageY)){
							//t.top_animate();
						}else if(t.left == 0 && t.leave(e.pageX,e.pageY)){
							//t.left_animate();
						}else if(t.left == t.w_width-t.width && t.leave(e.pageX,e.pageY)){
							//t.right_animate();
						}
						t.c.off('mousemove');
						t.c.off('mouseup');
						t.m = false;
					});
					t.c.on('mouseout',function(){
						if(!t.t.is(":animated") && !t.m && !t.s){
							if(t.top == 0){
								//t.top_animate();
							}else if(t.left == 0){
								//t.left_animate();
							}else if(t.left == t.w_width-t.width){
								//t.right_animate();
							}
						}
						t.c.off('mousemove');
						t.c.off('mouseup');
						t.m = false;
					});
					return false;
				});
			} catch (e) {
			}
		},
		size:function(){
			try {
				var t= this;
				var changeSizeSpan='<span class="bg_change_size"><span class="bg_chage_size_icon"></span></span>';
				var len=t.t.find("span.bg_change_size").length;
				if(len==0){
					t.t.append(changeSizeSpan);
				}
				t.sz = t.t.find('.bg_change_size').first();
				t.sz.css({'position':'absolute','right':0,'bottom':0,'display':'block','width':t.size_bg+'px','height':t.size_bg+'px','cursor':'nw-resize'});
				t.sz.on('mousedown',function(e){
					t.s = true;
					t.old_width = t.t.width();
					t.old_height = t.t.height();
					t.old_size_x = e.pageX;
					t.old_size_y = e.pageY;
					t.sz.on('mousemove',function(e){
						t.new_width = e.pageX - t.old_size_x + t.old_width;
						t.new_height = e.pageY - t.old_size_y + t.old_height;
						t.t.width(t.new_width);
						t.t.height(t.new_height);
						if(t.t.outerHeight() + t.top >= t.w_height){
							t.t.height(t.w_height - t.top - t.c_height);
						}
						if(t.t.outerWidth() + t.left >= t.w_width){
							t.t.width(t.w_width - t.left - t.c_width);
						}
						
						//增加回调函数
						if(t.callBackFn!='' && t.callBackFn!='undefined' && typeof(t.callBackFn) !=undefined){
							eval(t.callBackFn+"('"+t.tbWII+"')");
						}
						return false;
					});
					t.sz.on('mouseup',function(){
						t.height = t.t.outerHeight();
						t.width = t.t.outerWidth();
						t.s = false;
						t.sz.off('mousemove');
						t.sz.off('mouseup');
					});
					t.sz.on('mouseout',function(){
						t.height = t.t.outerHeight();
						t.width = t.t.outerWidth();
						t.s = false;
						t.sz.off('mousemove');
						t.sz.off('mouseup');
					});
					return false;
				});
			} catch (e) {
			}
		},
		leave:function(xx,yy){
			try {
				var t = this;
				if(xx >= t.t.offset().left && xx <= t.t.offset().left+t.width && yy >= t.t.offset().top && yy <= t.t.offset().top+t.height){
					return false;
				}else{
					return true;
				}
			} catch (e) {
			}
		},
		top_animate:function(){
			var t = this;
			t.t.animate({top:(-t.height+t.hide)},300,function(){
				t.t.one('mouseenter',function(){
					t.t.stop(true);
					//t.t.stop(true).animate({top:0},300);
				});
			});
		},
		left_animate:function(){
			var t = this;
			t.t.animate({left:(-t.width+t.hide)},300,function(){
				t.t.one('mouseenter',function(){
					t.t.stop(true);
					//t.t.stop(true).animate({left:0},300);
				});
			});
		},
		right_animate:function(){
			var t = this;
			t.t.animate({left:(t.w_width-t.hide)},300,function(){
				t.t.one('mouseenter',function(){
					t.t.stop(true);
					//t.t.stop(true).animate({left:t.w_width-t.width},300);
				});
			});
		}
	};
	var y = {
		move : '.title',
		closed : '.close',
		size : 0,
		callBackFn : '',
		tbWII:''
	};
	$.fn.bg_move = function(bg){
		$.extend(y,bg);
		$(this).each(function(){
			new b($(this),y);
		});
	}
})(jQuery);