window.onload = function() {
    
    var db = firebase.database().ref('/');

    db.get().then((snapshot) => {
        snapshot.forEach(element => {
            var id = element.key;
            var title = element.child("data").child("title").val();
            var venue = venueUniformization(element.child("data").child('venue').val());
            var abstract = element.child("data").child("abstract").val();
            var authors = element.child("data").child("authors").val();

            // Todo
            // figure list
            // figure picker
            // authors
            // proportion bar

            var thumbnailN = 1;
            var thumbnailSrc = 'img/crops/' + element.child("filename").val() + '_crop_'+ thumbnailN + '.png';
            // var thumbnailSrc = 'img/crops/' + '2662155.2662246_crop_4' + '.png';

            const card = document.createElement("div");
            card.className = "card";
                const card_figure = document.createElement("figure");
                    const card_img = document.createElement("p");
                    card_img.className = "img";
                    card_img.style.background = 'url(' + thumbnailSrc + ') center no-repeat';
                    card_img.style.backgroundPosition = 'left 30%';
                    card_img.style.backgroundSize = 'cover'; // contain
                    
                    const card_figcaption = document.createElement("figcaption");
                    card_figcaption.innerHTML = '<div class="bar"> <span id="background" style="width:15%">background</span> <span id="method" style="width:15%">method</span> <span id="result" style="width:30%">result</span> <span id="discussion" style="width:35%">discussion</span> <span id="conclusion" style="width:10%">conclusion</span> </div>'
                    + '<div class="info"> <span class="conf">' +  venue
                    + '</span> <span class="cite"><span></span>' + id + '</span> <span class="down"><span></span>122</span> <span class="graph"><span></span>graph</span> <span class="figure"><span></span>figure</span> </div>'
                    + '<div class="caption"> <h3>' 
                    + title
                    + '</h2> <ul class="authors"> <li>author1,</li> <li>author2,</li> <li>author3,</li> </ul>'
                    + '<span class="abstract">' + abstract 
                    + '</span> <p class="fig_des"> <span>◄</span> <span>'
                    + 'Figure 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut'
                    + '</span> </p> </div> <div class="figures">'
                    + '<img src="'
                    + thumbnailSrc
                    + '" alt="figure 1">'
                    + '<img src="img/1_2.png" alt="figure 2">'
                    + '<img src="img/1_3.jpeg" alt="figure 3">'
                    + '<img src="img/1_4.png" alt="figure 4">'
                    + '<img src="img/1_5.png" alt="figure 5">'
                    + '</div>';
                
                const card_aside = document.createElement("aside");
                card_aside.innerHTML = '<span class="thumb"></span> <span class="cart"></span>'; 
 
            card_figure.appendChild(card_img);           
            card_figure.appendChild(card_figcaption);
            card.appendChild(card_figure);
            card.appendChild(card_aside);
            document.getElementById("mainContainer").appendChild(card);
        });
    });
}

function venueUniformization(str) {
    if ( str.includes('17') ) { 
        return "CHI 17";
    } else if ( str.includes('18') ) { 
        return "CHI 18";
    } else if ( str.includes('19') ) {
        return "CHI 19";
    } else {
        return "CHI 20";
    }
}



