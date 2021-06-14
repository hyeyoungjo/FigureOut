$(function () {
    //-----jquery start
    $.ajax({
        url: 'data/one.xml',
        type: 'GET',
        dataType: 'xml',
        beforeSend: function () {},
        complete: function () {},
        success: function (one) {

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
<<<<<<< Updated upstream
            var $cardPerPage = 10;
            
=======
            var $cardPerPage = 20;
            var $totalItem = 0;
>>>>>>> Stashed changes

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
                    var $thumbUrl = $storagePath + "" + $(this).find("url").eq(0).html();
                    $mainThumb = "<p class='img' style='background-image:url(" + $thumbUrl + ")'></p>";

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
            $("section#mainContainer div.tags i").html($totalItem);


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

<<<<<<< Updated upstream
                console.log(imgUrl);
                updateUserData( imgUrl );
=======
                $("div.back").delay(1300).animate({
                    top: 0
                },300)
>>>>>>> Stashed changes
            });

            $("section#detail div.back").on("click", function () {
                $("div.back").animate({
                    top: "-50vh"
                },300)

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


        },

        error: function () {
            alert('Fail');
        }
        //ajax end
    });

    //---jquery end
});


var uid = 100;
// uid = getParameterByName('uid');

// const userDb = firebase.database().ref('/users/' + uid);
var chart = 0;
var diagram = 0;
var formula = 0;
var graphic = 0;
var human = 0;
var picture = 0;
var table = 0;

getfirebase();

function updateUserData(key) { 
    var type = "";
    firebase.database().ref('/' + key.replace(/./gi, "`") + '/').once('value').then(function(snapshot){
        type = snapshot.val();
        chart = chart + 1 ;
        //if - - -- -
        updateData();
    });
}

function updateData() {
    firebase.database().ref('/users/' + uid + '/history/' ).set({
        // chart : userData[0].chart ,
        // diagram : userData[0].diagram  ,
        // formula : userData[0].formula ,
        // graphic : userData[0].graphic ,
        // human : userData[0].human ,
        // picture : userData[0].picture ,
        // table : userData[0].table
        chart : chart ,
        diagram : diagram  ,
        formula : formula ,
        graphic : graphic ,
        human : human ,
        picture : picture ,
        table : table
    });
}

function getfirebase() {
    firebase.database().ref('/users/' + uid + '/history/chart').on('value', function(x){
        // userData[0].chart = x.val();
        chart = x.val();
    });
    firebase.database().ref('/users/' + uid + '/history/diagram').on('value', function(x){
        // userData[0].diagram = x.val();
        diagram = x.val();
    });
    firebase.database().ref('/users/' + uid + '/history/formula').on('value', function(x){
        // userData[0].formula = x.val();
        formula = x.val();
    });
    firebase.database().ref('/users/' + uid + '/history/graphic').on('value', function(x){
        // userData[0].graphic = x.val();
        graphic = x.val();
    });
    firebase.database().ref('/users/' + uid + '/history/human').on('value', function(x){
        // userData[0].human = x.val();
        human = x.val();
    });
    firebase.database().ref('/users/' + uid + '/history/picture').on('value', function(x){
        // userData[0].picture = x.val();
        picture = x.val();
    });
    firebase.database().ref('/users/' + uid + '/history/table').on('value', function(x){
        // userData[0].table = x.val();
        table = x.val();
    }); 
}

//새로 load 할때 -> 목록에서 현재까지의 preference 반영


