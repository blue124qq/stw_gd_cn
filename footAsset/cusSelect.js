(function(){
    $(".cusSelect").on("mouseenter",function(e){
        //  $(this).children(".cusOpSet").show();
         $(this).siblings().children(".cusOpSet").hide();
       
        var currentEle = $(this).find(".cusOpSet");
        var parentHeight = currentEle.parent().height();
        var eleHeight = currentEle.height();
        var eleOffestHeight = currentEle.parent().offset().top;
        var winHeight = $(window).height();
        var scrollHeight = $(document).scrollTop();
		if((eleOffestHeight+eleHeight+parentHeight)>0){
            currentEle.css("bottom",parentHeight+"px");
        }else{
            currentEle.css("bottom","unset");
        }
        var winWidth = $(window).width();
        var eleWidth = currentEle.width();
        var eleOffestLeft = currentEle.parent().offset().left;
        if((eleWidth+eleOffestLeft)>winWidth){
            currentEle.css("left","unset").css("right",0);            
        }else{
        	currentEle.css("left",0).css("right","unset");
        }
        currentEle.toggle();
        currentEle.scrollTop(0);
        currentEle.focus();
        e.stopPropagation();
    });
    $(".cusOpSet").on('mouseleave', function () {
        $(this).hide();
    })
    $(document).on("click",function(){
    	$(".cusOpSet").hide();
    })
})();