// 友情链接切换
(function () {
    var swiper2 = new Swiper('.swiper-container2', {
        slidesPerView: 3,
        loop: true
    });
    $('.friend .arrow-left').on('click', function (e) {
        e.preventDefault();
        swiper2.swipePrev()
    })
    $('.friend .arrow-right').on('click', function (e) {
        e.preventDefault();
        swiper2.swipeNext()
    })
})();
// 其他友情链接
(function () {
    $(".cusSelect").on("click", function (e) {
        $(this).siblings().children(".cusOpSet").hide();
        var currentEle = $(this).find(".cusOpSet");
        var parentHeight = currentEle.parent().height();
        var eleHeight = currentEle.height();
        var eleOffestHeight = currentEle.parent().offset().top;
        var winHeight = $(window).height();
        var scrollHeight = $(document).scrollTop();
        //if((eleOffestHeight+eleHeight+parentHeight)>(scrollHeight+winHeight)){
        if ((eleOffestHeight + eleHeight + parentHeight) > 0) {
            currentEle.css("bottom", parentHeight + "px");
        } else {
            currentEle.css("bottom", "unset");
        }
        var winWidth = $(window).width();
        var eleWidth = currentEle.width();
        var eleOffestLeft = currentEle.parent().offset().left;
        if ((eleWidth + eleOffestLeft) > winWidth) {
            currentEle.css("left", "unset").css("right", 0);
        } else {
            currentEle.css("left", 0).css("right", "unset");
        }
        currentEle.toggle();
        currentEle.scrollTop(0);
        currentEle.focus();
        e.stopPropagation();
    });

    $(document).on("click", function () {
        $(".cusOpSet").hide();
    })
})();