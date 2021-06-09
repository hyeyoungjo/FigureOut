$.ajax({
    url: 'data/list.xml',
    type: 'GET',
    dataType: 'xml',
    beforeSend: function () {},
    complete: function () {},
    success: function (list) {
        
        var $aside = "<aside><span class='thumb'></span><span class='cart'></span></aside>";

        $(list).find("items").find("article").each(function(){
            var $title=$(this).find("title").html();
            var $venue=$(this).find("venue").html();
            var $paperLength=$(this).find("paperlength").html();
            var $secLength=$(this).
            $figures
        });
        $(list).find("items").find("item").each(function () {
            var imgSrc = $(this).find("thumb").html();
            var title = $(this).find("title").html();
            var year = $(this).find("year").html();
            $figureG += "<figure><p><img src='" + imgSrc + "'></p><figcaption><h4>" + title + "</h4></figcaption><small>" + year + "</small></figure>"
        });

        $(list).find("threeD").find("item").each(function () {
            var imgSrc = $(this).find("thumb").html();
            var title = $(this).find("title").html();
            var year = $(this).find("year").html();

            $figure3 += "<figure><p><img src='" + imgSrc + "'></p><figcaption><h4>" + title + "</h4></figcaption><small>" + year + "</small></figure>"
        });

        $(".graphic_con section.thum_container").append($figureG);
        $(".threeD_con section.thum_container").append($figure3);

    },
    error: function () {
        alert('Fail');
    }
    //ajax end
});