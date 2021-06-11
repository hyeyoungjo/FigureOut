$(function () {
    //-----jquery start------
   

    $(".figures img").on("mouseenter", function () {
        imgSrc = $(this).attr('src');
        imgIdx = $(this).index() + 1;
        $(this).parents("figure").find("p.img").css("background-image", "url('" + imgSrc + "')")
        $(this).parents("figure").find("p.fig_des span:nth-of-type(2)").html("Figure " + imgIdx + ". Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp")
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

    $("p.next").on("click", function () {
        if ($("article.all_figs div").position().left <= 0) {
            $("article.all_figs div").animate({
                left: "-=80vw"
            })
        } else {

        }
    })
    $("p.prev").on("click", function () {
        if ($("article.all_figs div").position().left == 0) {

        } else {
            $("article.all_figs div").animate({
                left: "+=80vw"
            })
        }
    })

    //-----jquery end--------
});