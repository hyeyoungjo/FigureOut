$.ajax({
    url: 'data/list.xml',
    type: 'GET',
    dataType: 'xml',
    beforeSend: function () {},
    complete: function () {},
    success: function (list) {
        var $figureG;
        var $figure3;
        $(list).find("graphic").find("item").each(function () {
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

        $(".graphic_con section.thum_container>figure").on("click", function () {
            var fIdx = $(this).index() - 1;
            var link = $(list).find("graphic item").eq(fIdx).find("link").html();
            window.open(link);
        });
        $(".threeD_con section.thum_container>figure").on("click", function () {
            var fIdx = $(this).index() - 1;
            var link = $(list).find("threeD item").eq(fIdx).find("link").html();
            window.open(link);
        });

    },
    error: function () {
        alert('Fail');
    }
    //ajax end
});