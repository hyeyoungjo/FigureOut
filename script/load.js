$(function () {
    //-----jquery start
    $.ajax({
        url: 'data/one.xml',
        type: 'GET',
        dataType: 'xml',
        beforeSend: function () {},
        complete: function () {},
        success: function (one) {
            var $storagePath = "https://storage.cloud.google.com/staging.designproject1-f2b81.appspot.com/";
            var $articleIdx = 0;
            var $figList = "";
            var $info;
            var $caption;

            var $bar;

            var $fig;
            var $figCap;

            var $mainThumb;
            var $aside = "<aside><span class='thumb'></span><span class='cart'></span></aside>";

            var $pageN = 1;
            var $cardN = 0;

            $(one).find("article").each(function (index) {
                if(index < $pageN * 20) {
                    return;
                } else {
                    return false;
                    console.log(index);
                }
                var $secBar = "";
                var $figItem = "";
                $articleIdx = $(this).index();
                $figCap = $(this).find("caption").html();

                // Thumbnail
                var $thumbUrl = $storagePath + "" + $(this).find("url").eq(0).html();
                $mainThumb = "<p class='img' style='background-image:url(" + $thumbUrl + ")'></p>";

                // info
                var $venue = "<span class='conf'>" + $(this).find("venue").html() + "</span>";
                var $cite = "<span class='cite'><span></span>" + Math.round(Math.random() * 100 + 1) + "</span>";
                var $down = "<span class='down'><span></span>" + Math.round(Math.random() * 100 + 1) + "</span>";
                $info = "<div class='info'>" + $venue + $cite + $down + "</div>"

                // doi
                var $doi = $(this).find("doi").html();

                // div.caption
                var $title = "<h3>" + $(this).find("data>title").html() + "</h3>";
                var $authors = "<ul class='authors'>" + $(this).find("authors").html() + "</ul>";
                var $abstract = "<span class='abstract'>" + $(this).find("abstract").html() + "</span>";
                var $figDes = "<p class='fig_des'><span>◄</span><span>" + $figCap + "</span></p>";
                $caption = "<div class='caption'>" + $title + $authors + $abstract + $figDes + "</div>"

                // sections 
                // $(this).find("sections").find("section").each(function (i) {
                //     var $length = Number($(this).find("word_count").html());
                //     $paperLength += $length;
                // });

                $(this).find("sections").find("section").each(function (i) {
                    var $paperLength = 0;
                    $(this).parents("sections").find("word_count").each(function () {
                        $paperLength += Number($(this).html());
                    });
                    var $secLength = Math.ceil(Number($(this).find("word_count").html()) / $paperLength * 100) + "%";
                    var $secTitle = $(this).find("title").html();
                    $secBar += "<span id='" + $secTitle.replace(" ", "_") + "' style='width:" + $secLength + "'>" + $secTitle + "</span>"
                });
                $bar = "<div class='bar'>" + $secBar + "</div>";

                // figures 
                $(this).find("figure").each(function (i) {
                    $figId = $(this).find("id").html();
                    $figUrl = $storagePath + $(this).find("url").html() + "'";
                    $figItem += "<img src=" + $figUrl + ">";
                });
                $fig = "<div class='figures'>" + $figItem + "</div>";

                // figure lists 
                $figList += "<div class='card'><figure>" + $mainThumb + "<figcaption>" + $bar + $info + $caption + $fig + "</figcaption></figure>" + $aside + "</div>";
            });
            $("section#mainContainer").append($figList);

            //figures jquery

            $("p.img").on("mouseenter", function () {
                $(this).siblings("figcaption").find("div.figures").animate({
                    bottom: "12px"
                });
                $(this).siblings("figcaption").find("span.abstract").slideUp(150);
                $(this).siblings("figcaption").find("p.fig_des").delay(150).animate({
                    height: "62px"
                }, 150);
            });

            $("figure").on("mouseleave", function () {
                $(this).find("div.figures").animate({
                    bottom: "-100px"
                });
                $(this).find("span.abstract").slideDown(150);
                $(this).find("p.fig_des").css({
                    height: 0
                });
            });

            var imgSrc = "";
            var imgUrl = "";
            var figCap = "";

            $(".figures img").on("mouseenter", function () {
                imgSrc = $(this).attr('src');
                imgUrl = imgSrc.replace("crops/", "");
                figCap = $(one).find("url:contains(" + imgUrl + ")").siblings("caption").html();
                $(this).parents("figure").find("p.img").css("background-image", "url('" + imgSrc + "')");
                $(this).parents("figure").find("p.fig_des span:nth-of-type(2)").html(figCap);
            })


            //transition---------------
            var $scrollTop = 0;
            $("div.card").on("click", function () {
                $scrollTop = $(window).scrollTop();

                $("section.cover, section.main").delay(200).animate({
                    left: "-100%"
                }, 300);

                $("nav").animate({
                    top: "-100%"
                }, 300).delay(600).animate({
                    top: 0
                }, 300);

                $("section#detail").delay(600).animate({
                    left: "50%"
                }, 300);
            });

            $("section#detail div.back").on("click", function () {
                $("section#detail").delay(200).animate({
                    left: "150%"
                }, 300);

                $("nav").animate({
                    top: "-100%"
                }, 300).delay(600).animate({
                    top: 0
                }, 300);
               
                $("section.cover, section.main").delay(600).animate({
                    left: 0
                }, 300);
                setTimeout(function(){
                    $("html, body").animate({
                        scrollTop: $scrollTop
                    },300);
                },1000)
                
            });


        },

        error: function () {
            alert('Fail');
        }
        //ajax end
    });

    //---jquery end
});