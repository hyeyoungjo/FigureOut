$(function () {
    //-----jquery start
    $.ajax({
        url: 'data/one.xml',
        type: 'GET',
        dataType: 'xml',
        beforeSend: function () {},
        complete: function () {},
        success: function (one) {
            var $articleIdx = 0;
            var $figList="";
            var $info;
            var $caption;

            var $paperLength = 0;
            var $secLength = 0;

            var $bar;

            var $fig = "";

            var $mainThumb = "<p class='img'></p>";
            var $aside = "<aside><span class='thumb'></span><span class='cart'></span></aside>";

            $(one).find("article").each(function () {
                var $secBar = "";
                var $figItem = "";
                $articleIdx = $(this).index();
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
                var $figDes = "<p class='fig_des'><span>◄</span><span></span></p>";
                $caption = "<div class='caption'>" + $title + $authors + $abstract + $figDes + "</div>"

                // sections 
                // $(this).find("sections").find("section").each(function (i) {
                //     var $length = Number($(this).find("word_count").html());
                //     $paperLength += $length;
                // });

                $(this).find("sections").find("section").each(function (i) {

                    // $secLength = Math.ceil(Number($(this).find("word_count").html()) / $paperLength * 100) + "%";
                    var $secTitle = $(this).find("title").html();
                    $secBar += "<span id='" + $secTitle.replace(" ", "_") + "'>" + $secTitle + "</span>"
                });
                $bar = "<div class='bar'>" + $secBar + "</div>";

                // figures
                $(this).find("figure").each(function (i) {
                    $figId = $(this).find("id").html();
                    $figUrl = "'crops/" + $(this).find("url").html() + "'";
                    $figItem += "<img src=" + $figUrl + ">";
                });
                $fig = "<div class='figures'>" + $figItem + "</div>";

                // figure lists 
                $figList += "<div class='card'><figure>" + $mainThumb + "<figcaption>" + $bar + $info + $caption + $fig + "</figcaption></figure>" + $aside + "</div>";
            });

            $("section#mainContainer").append($figList);
            $("div.card").each(function () {
                var thisIdx=$(this).index();
                var mainImg = $(one).find("article").eq(thisIdx).find("url").html();
               $(this).find("p.img").css({
                   backgroundImage: "url('../crops/"+mainImg+"')"
               })
            });
            //figures jquery
            var imgSrc = "";
            var imgIdx = 0;
            $("p.img").on("mouseenter", function () {
                $(this).siblings("figcaption").find("div.figures").animate({
                    bottom: "12px"
                });
                $(this).siblings("figcaption").find("span.abstract").slideUp(150);
                $(this).siblings("figcaption").find("p.fig_des").delay(150).animate({
                    height: "30px"
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
        },

        error: function () {
            alert('Fail');
        }
        //ajax end
    });

    //---jquery end
});