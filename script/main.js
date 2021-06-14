$(function () {
    //-----jquery start------
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
// $("section#mainContainer").hide();
// $("section.cover").hide();

$("div.bar_container").width($("div.column").outerHeight()).height($("div.column").outerWidth());

$("section.main").css({
    top: $("section.cover").outerHeight()
});
    //-----jquery end--------
});