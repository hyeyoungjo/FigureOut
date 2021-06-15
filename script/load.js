// var $storagePath = "https://storage.cloud.google.com/staging.designproject1-f2b81.appspot.com/";
var $storagePath = "crops/";
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
var $cardPerPage = 10;
var $totalItem = 0;

setTimeout(function() {
    cardMaker();
    
}, 1000);

function cardMaker() {
    $(function () {
        //-----jquery start
        $.ajax({
            url: 'data/one.xml',
            type: 'GET',
            dataType: 'xml',
            beforeSend: function () {},
            complete: function () {},
            success: function (one) {
                //list articles
                $(one).find("article").each(function () {
                    $totalItem++;
                });
                $(one).find("article").each(function (index) {
                    if (index < ($pageN - 1) * $cardPerPage) {
                        return;
                    } else if (index < $pageN * $cardPerPage) {
                        var $secBar = "";
                        var $figItem = "";
                        $articleIdx = $(this).index();
                        $figCap = $(this).find("caption").html();

                        // Thumbnail
                        var $thumbN = 0;
                        var $maxScore = 0;
                        $(this).find("url").each(function (i) {
                            var $img = $(this).html() + "";
                            var $imgType = getFigureType($img.replace(/\./gi, "`"));
                            var $imgScore = getUserData($imgType);

                            if ($imgScore * 1 > $maxScore * 1) {
                                $thumbN = i;
                                console.log($imgScore + "is lager than " + $maxScore);
                                var $thumbUrl = $storagePath + "" + $(this).find("url").eq($thumbN).html();
                                $mainThumb = "<p class='img' style='background-image:url(" + $thumbUrl + ")'>" + $(this).find("url").eq($thumbN).html() + "</p>";
                                $maxScore = $imgScore;
                            }
                        });

                        var $thumbUrl = $storagePath + "" + $(this).find("url").eq($thumbN).html();
                        $mainThumb = "<p class='img' style='background-image:url(" + $thumbUrl + ")'>" + $(this).find("url").eq($thumbN).html() + "</p>";

                        // info
                        var $venue = "<span class='conf'>" + $(this).find("venue").html() + "</span>";
                        var $cite = "<span class='cite'><span></span>" + Math.round(Math.random() * 100 + 1) + "</span>";
                        var $down = "<span class='down'><span></span>" + Math.round(Math.random() * 100 + 1) + "</span>";
                        $info = "<div class='info'>" + $venue + $cite + $down + "</div>"

                        // div.caption
                        var $title = "<h3>" + $(this).find("data>title").html() + "</h3>";
                        var $authors = "<ul class='authors'>" + $(this).find("authors").html() + "</ul>";
                        var $abstract = "<span class='abstract'>" + $(this).find("abstract").html() + "</span>";
                        var $figDes = "<p class='fig_des'><span>◄</span><span>" + $figCap + "</span></p>";
                        $caption = "<div class='caption'>" + $title + $authors + $abstract + $figDes + "</div>";

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
                            $figUrl = "'" + $storagePath + $(this).find("url").html() + "'";
                            $figItem += "<img src=" + $figUrl + ">";
                        });
                        $fig = "<div class='figures'>" + $figItem + "</div>";

                        // figure lists 
                        $figList += "<div class='card'><figure>" + $mainThumb + "<figcaption>" + $bar + $info + $caption + $fig + "</figcaption></figure>" + $aside + "</div>";
                        return;
                    } else {
                        return false;
                        console.log(index);
                    }
                });

                $("section#mainContainer").append($figList);
                $("section#mainContainer div.tags i").html($totalItem - 1);

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
                    $(this).parents("figure").find("p.img").html(imgUrl);
                    $(this).parents("figure").find("p.fig_des span:nth-of-type(2)").html(figCap);
                });
                //load figures----------------------
                var $coverEven = "";
                var $coverOdd = "";
                var $coverUrl = "";

                function callFigures(keyword) {
                    $(one).find("article:contains(" + keyword + ")").find("url").each(function (i) {
                        $coverUrl = $(this).html();
                        if (i % 2 == 0) {
                            $coverEven += "<img src='crops/" + $coverUrl + "'>"
                        } else {
                            $coverOdd += "<img src='crops/" + $coverUrl + "'>"
                        }
                    });
                    $("div.container.list_top").html($coverEven);
                    $("div.container.list_bottom").html($coverOdd);
                }
                callFigures("");
                //img Click---------
                var $this;

                function coverClick(coverTop, time, Num) {
                    $("article.selected_fig").delay(100).animate({
                        top: coverTop
                    }, time);
                    $("article.all_figs>p").each(function (i) {
                        $this = $(this);
                        if (i == 0) {
                            $this.animate({
                                left: Num
                            }, time)
                        } else {
                            $this.animate({
                                right: Num
                            }, time)
                        }
                    });
                }
                $("div.container>img").on("click", function () {
                    var thisSrc = $(this).attr("src");
                    var findItem = $(one).find("article:contains('" + thisSrc.replace("crops/", "") + "')");
                    var findCaption = $(one).find("url:contains('" + thisSrc.replace("crops/", "") + "')").siblings("caption").html();
                    $("div.img").html("<img src='" + thisSrc + "'>");
                    coverClick(0, 200, "-100%");
                    $("div.description_area h3").html(findItem.find("data>title").html());
                    $("div.description_area ul.authors").html(findItem.find("data>authors").html());
                    $("div.description_area span.conf").html(findItem.find("data>venue").html());
                    $("p.des").html(findCaption);

                    imgUrl = thisSrc.replace("crops/", "").replace(/\./gi, "`");
                    console.log(imgUrl); 
                    updateUserData(imgUrl);
                });
                $("div.buttons li.back").on("click", function () {
                    coverClick("-110%", 200, 0)
                });

                //search---------


                //transition---------------
                var $scrollTop = 0;
                $("div.card").on("click", function () {
                    $scrollTop = $(window).scrollTop();
                    $(this).addClass("active");
                    $("div.card").not($(this)).removeClass("active");

                    $("nav").animate({
                        top: "-100%"
                    }, 300).delay(400).animate({
                        top: 0
                    }, 300);

                    $("section.cover, section.main").delay(200).animate({
                        left: "-100%"
                    }, 300);

                    $("section#detail").delay(1000).animate({
                        left: "50%"
                    }, 300);

                    $("div.back").delay(1200).animate({
                        top: 0
                    }, 300);

                    imgUrl = $(this).find("figure").find("p.img").text();
                    console.log(imgUrl);
                    updateUserData(imgUrl);

                    //detail infochange------
                    function infoChange($to, $text, $item) {
                        $($to).html($text + $this.find($item).html())
                        return;
                    }
                    $this = $(this);
                    infoChange("div#title h3", "", "h3");
                    infoChange("div.bar_container", "", "div.bar");
                    infoChange("ul#authors", "Authors:", "ul.authors");
                    infoChange("div#icon", "", "div.info");
                    $("div#figure_selected img").attr("src", "crops/" + imgUrl); 
                    var detailFig = "";
                    var findXml = $("div#figure_caption").html($(one).find("url:contains('" + imgUrl + "')")); 
                    
                    // findXml.siblings("caption").html());

                    findXml.parents("figure").each(function () {
                        detailFig += "<li><img src='crops/" + $(this).find("url").html() + "'></li>"
                        // if ($(this).find("url").html() == imgUrl) {
                        //     detailFig += "<li id='list_selected'><img src='crops/" + $(this).find("url").html() + "'></li>"
                        // } else {
                            
                        // }

                    });

                    $("div#figure_list").html(detailFig);

                });
                //-----detail page img change------------------------

                $("section#detail div.back").on("click", function () {
                    $("div.back").animate({
                        top: "-50vh"
                    }, 300)

                    $("section#detail").delay(200).animate({
                        left: "150%"
                    }, 300);

                    $("nav").delay(200).animate({
                        top: "-100%"
                    }, 300).delay(400).animate({
                        top: 0
                    }, 300);

                    $("section.cover, section.main").delay(600).animate({
                        left: 0
                    }, 300);

                    setTimeout(function () {
                        $("html, body").animate({
                            scrollTop: $scrollTop
                        }, 300);

                        setTimeout(function () {
                            $("html, body").animate({
                                scrollTop: $scrollTop
                            }, 300);
                        }, 1000);
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
}

function getImgType(img) {
    console.log(img.replace(/\./gi, "`"));
    var type = "";
    firebase.database().ref('/' + img.replace(/\./gi, "`") + '/').get().then(function (snapshot) {
        type = snapshot.val() + "";
        console.log(type);
    });
    return type;
}