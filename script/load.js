// var $storagePath = "https://storage.cloud.google.com/staging.designproject1-f2b81.appspot.com/";
var $storagePath = "crops/";
var $articleIdx = 0;
var $figList = new Array();
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
    
}, 1200);

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
            
                $(one).find("article").each(function (index) {
                    $totalItem++;

                    var $secBar = "";
                    var $figItem = "";
                    $articleIdx = $(this).index();
                    $figCap = $(this).find("caption").html();

                    // Thumbnail
                    var $thumbN = 0;
                    var $maxScore = 0;
                    $(this).find("url").each(function (i) {
                        var $img = $(this).html() + "";
                        var $imgType = getFigureType($img.replace(/\./gi, "~"));
                        var $imgScore = getUserData($imgType);

                        if ($imgScore * 1 > $maxScore * 1) {
                            $thumbN = i;
                            // var $thumbUrl = $storagePath + "" + $(this).find("url").eq($thumbN).html();
                            // $mainThumb = "<p class='img' style='background-image:url(" + $thumbUrl + ")'>" + $(this).find("url").eq($thumbN).html() + "</p>";
                            $maxScore = $imgScore;
                        }
                    });

                    var $thumbUrl = $storagePath + "" + $(this).find("url").eq($thumbN).html();
                    $mainThumb = "<p class='img' style='background-image: url("+ '\"' + $thumbUrl +'\"' + ");'>" + $(this).find("url").eq($thumbN).html() + "</p>";
                    console.log("fig type:" + getFigureType(($(this).find("url").eq($thumbN).html()+"").replace(/\./gi, "~"))+ " ");

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
                        var sectionType = whatSectionType($secTitle+"");
                        $secBar += "<span id='" + $secTitle.replace(" ", "_") + "' class=" + sectionType + " style='width:" + $secLength + "'>" + $secTitle + "</span>"
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
                    $figList[parseInt(index/$cardPerPage)] += "<div class='card'><figure>" + $mainThumb + "<figcaption>" + $bar + $info + $caption + $fig + "</figcaption></figure>" + $aside + "</div>";
                    
                    return;
                    
                });
                var $pageGet= "<div class='page_move'><p class='1 active'>1</p><p class='2'>2</p><p class='3'>3</p><p class='4'>4</p><p class='5'>5</p><p class='6'>6</p><p class='7'>7</p><p class='8'>8</p><p class='9'>9</p><p class='10'>10</p></div>"
                $("section#mainContainer").append($figList[$pageN-1].replace("undefined", "")).append($pageGet);
                $("section#mainContainer div.tags i").html($totalItem - 1);

                //figures jquery

                addListener(1);
                function addListener(pN) {
                    $("div.page_move p." + pN).addClass("active");
                    $("div.page_move p").not($("div.page_move p." + pN)).removeClass("active");

                    $("div.page_move p").on("click", function(){
                        $pageN = $(this).attr("class")*1;
                        
                        $("section#mainContainer").html(containerBarF + (($pageN-1)*10 + 1) + "-" + ($pageN)*10 + containerBarE);
                        if($pageN*10 == 100)$("section#mainContainer").html(containerBarF + (($pageN-1)*10 + 1) + "-" + ($totalItem*1-1) + containerBarE);
                        $("section#mainContainer").append($figList[$pageN-1].replace("undefined", "")).append($pageGet);
                        $("section#mainContainer div.tags i").html($totalItem - 1);

                        $('html').animate({scrollTop: $("section#mainContainer").offset().top}, 600);
                        addListener($pageN);
                    });

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
                        var wallList = getFigureAIList();
                        for (var i in wallList) {
                            if (i % 2 == 0) {
                                $coverEven += "<img src='crops/" + wallList[i] + "'>"
                            } else {
                                $coverOdd += "<img src='crops/" + wallList[i] + "'>"
                            }
                        }
                        $("div.container.list_top").html($coverEven);
                        $("div.container.list_bottom").html($coverOdd);
                    }
                    callFigures("");
                    
                    $("div.classify span").on("click", function(){
                        var $coverEven = "";
                        var $coverOdd = "";
                        var wallList = getFigureTypeList( ($(this).attr("class")+"").replace(" active", "") );
                        for (var i in wallList) {
                            if (i % 2 == 0) {
                                $coverEven += "<img src='crops/" + wallList[i] + "'>"
                            } else {
                                $coverOdd += "<img src='crops/" + wallList[i] + "'>"
                            }
                        }
                        $("div.container.list_top").html($coverEven);
                        $("div.container.list_bottom").html($coverOdd);
                    
                        $(this).addClass("active");
                        $("div.classify span").not($(this)).removeClass("active");
                        addTCL();
                    })
                }
                
                addTCL();
                function addTCL(){
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
                        $("div.classify").animate({
                            bottom: Num
                        },time)
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

                        imgUrl = thisSrc.replace("crops/", "").replace(/\./gi, "~");
                        console.log(imgUrl); 
                        updateUserData(imgUrl);
                        
                    });
                    $("div.buttons li.back").on("click", function () {
                        coverClick("-110%", 200, 0)
                    });

                    //search---------


                    //transition---------------
                    var $scrollTop = 0;
                    $("div.card figure").on("click", function () {
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
                            top: "120px"
                        }, 300);

                        imgUrl = $(this).find("p.img").text();
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
                        var $year = $(this).find("span.conf").html();

                        function $getVenue(year) {
                            $("span#publication").html($year + ": Proceedings of the " + year + " CHI Conference on Human Factors in Computing Systems");
                            return;
                        }
                        if ($year == "CHI 17") {
                            $getVenue(2017)
                        } else if ($year == "CHI 18") {
                            $getVenue(2018)
                        } else if ($year == "CHI 19") {
                            $getVenue(2019)
                        } else {
                            $getVenue(2020)
                        }
                        var findXml = $(one).find("url:contains('" + imgUrl + "')");
                        var $doi = "https://doi.org/" + findXml.parents("article").find("doi").html();
                        $("div#doi").html("<a href='" + $doi + "'>" + $doi + "</a>");
                        $("div#figure_caption").html(findXml.siblings("caption").html());
                        findXml.parents("figures").find("figure").each(function () {
                            if ($(this).find("url").html() == imgUrl) {
                                detailFig += "<li id='list_selected'><img src='crops/" + $(this).find("url").html() + "'></li>"
                            } else {
                                detailFig += "<li><img src='crops/" + $(this).find("url").html() + "'></li>"
                            }
                        });

                        $("div#figure_list").html(detailFig);

                    });
                    //-----detail page img change------------------------

                    $("section#detail div.back").on("click", function () {
                        $("div.back").animate({
                            top: 0
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
                        }, 1000);
                    });
                }
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
    console.log(img.replace(/\./gi, "~"));
    var type = "";
    firebase.database().ref('/' + img.replace(/\./gi, "~") + '/').get().then(function (snapshot) {
        type = snapshot.val() + "";
        console.log(type);
    });
    return type;
}

var containerBarF = '<div class="tags mt_80"><ul>'+
'<b>Total <i>100</i> Results for : </b>'+
'<li class="active"><span>+</span>VR</li>'+
'<li class=""><span>+</span>AR</li>'+
'<li class=""><span>+</span>XR</li>'+
'<li class=""><span>+</span>system</li>'+
'<li class=""><span>+</span>technology</li>'+
'<li class=""><span>+</span>playing</li>'+
'<li class=""><span>+</span>AI</li>'+
'<li class=""><span>+</span>ML</li>'+
'</ul></div><div class="results">'+
'<span>Search Results: <i>';

var containerBarE = '</i> </span>'+
'<ul>Per Page :'+
'<li class="active">10</li>'+
'<li class="">20</li>'+
'<li class="">30</li>'+
'</ul> </div>';

function whatSectionType(title) {
    var t = title.toLowerCase();
    if(t.includes("intro")) {
        return "introduction";
    }else if(t.includes("background") || t.includes("related")) {
        return "relatedWorks";
    }else if(t.includes("thod")) {
        return "method";
    }else if(t.includes("study")) {
        return "study";
    }else if(t.includes("result")) {
        return "result";
    }else if(t.includes("discuss")) {
        return "discussion";
    }else if(t.includes("conclu")) {
        return "conclusion";
    }else if(t.includes("referen")) {
        return "reference";
    }
    return "else";

}