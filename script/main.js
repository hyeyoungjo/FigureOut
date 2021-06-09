$(function () {
    //-----jquery start------
    var imgSrc = "";
    var imgIdx = 0;
    $(".figures img").on("mouseenter", function () {
        imgSrc = $(this).attr('src');
        imgIdx = $(this).index() + 1;
        $(this).parents("figure").find("p.img").css("background-image", "url('" + imgSrc + "')")
        $(this).parents("figure").find("p.fig_des span:nth-of-type(2)").html("Figure " + imgIdx + ". Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp")
    })
    $(".list p.img").on("mouseenter", function () {
        $(this).siblings("figcaption").find("div.figures").animate({
            bottom: "12px"
        });
        $(this).siblings("figcaption").find("span.abstract").hide();
        $(this).siblings("figcaption").find("p.fig_des").delay(200).css("display", "flex");
    })
    $("figure").on("mouseleave", function () {
        $(this).find("div.figures").animate({
            bottom: "-100px"
        });
        $(this).find("span.abstract").delay(100).show();
        $(this).find("p.fig_des").hide();
    })
    $("aside span").on("click", function () {
        $(this).toggleClass("active");
    })
    $(".tags li").on("click", function () {
        $(this).toggleClass("active")
    })
    $(".results li").on("click", function () {
        $(this).addClass("active");
        $(".results li").not($(this)).removeClass("active")
    })

    $("p.prev").on("click", function () {
        if ($("article.all_figs div").position().left <= 0) {
            $("article.all_figs div").animate({
                left: "-=80vw"
            })
        } else {
        
        }
    })
    $("p.next").on("click", function () {
        if ($("article.all_figs div").position().left == 0) {
            
        } else {
            $("article.all_figs div").animate({
                left: "+=80vw"
            })
        }
    })

    //-----jquery end--------
});