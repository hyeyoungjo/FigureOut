var metaData= './json/metadata/'; 
const { O_NONBLOCK } = require('constants');
var fs = require('fs');    

var metadataJson = new Array();

fs.readdir(metaData, (err, filelist) => { 
    filelist.forEach(file => {
        if(file.includes('.json')) {
            var obj = new Object();
            obj.filename = file.split('_')[0];

            var data = fs.readFileSync('./json/metadata/' + file, 'utf8');
            var jsonData=JSON.parse(data);
            
            var sectionlist = new Array();
            for (var s in jsonData.sections) {
                //  console.log(s.word_count);
                var sec = jsonData.sections[s];
                var newsection = new Object();
                newsection.section = sec;                    
                sectionlist.push(newsection);
            }
            delete jsonData.sections;
            jsonData.sections = new Array(sectionlist);

            var keywordlist = new Array();
            jsonData.keywords.forEach(k => {
                var listComp = new Object();
                listComp.li = k;
                keywordlist.push(listComp);
            });
            delete jsonData.keywords;
            jsonData.keywords = new Array(keywordlist);

            var authorlist = new Array();
            // var temp = (jsonData.authors + '').toString().split(",");
            // console.log(temp);

            (jsonData.authors + '').toString().split(",").forEach(a => {
                var listComp = new Object();
                listComp.li = a;
                authorlist.push(listComp);
            });
            delete jsonData.authors;
            jsonData.authors = new Array(authorlist);

            obj.data = jsonData;

            var jsonFig = null;
            try {
                var fig = fs.readFileSync('./json/figures/' + file.split('_')[0] + '_figures.json', 'utf8');
                jsonFig=JSON.parse(fig);

                var figlist = new Array();
                for (var key in jsonFig.captions) {
                    // console.log(key + ": " + jsonFig.captions[key]); 
                    var newfigure = new Object();
                    newfigure.id = key;
                    newfigure.url = obj.filename + "_crop_"+key+".png";
                    newfigure.caption = '' + jsonFig.captions[key]['caption'];
                    newfigure.page = '' + jsonFig.captions[key]['page'];
                    figlist.push(newfigure);
                } 
                var temp = new Object();
                temp.figure = figlist;
                obj.figures=temp;

            } catch (error) {
            }
            
            var paper = new Object();
            paper.article = obj;

            metadataJson.push(paper);
        }
    })
    
    // console.log( JSON.stringify(metadataJson) );

    var output = eval("OBJtoXML("+JSON.stringify(metadataJson)+");")
    fs.writeFile("one.xml", output, function(err) {
        if (err) {
            console.log(err);
        }
    });

    // fs.writeFile("one.json",JSON.stringify(metadataJson), function(err) {
    //     if (err) {
    //         console.log(err);
    //     }
    // });
})

function OBJtoXML(obj) {
    var xml = '';
    for (var prop in obj) {
        if(prop == 'crops' || prop == 'bbox' || prop == 'fullpath' 
            || prop == 'paragraph_containing_keyword' 
            || prop == 'paragraph_after_keyword'
            || prop == 'publication'
            || prop == 'version'
        ) continue;
        xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";
        if (obj[prop] instanceof Array) {
            for (var array in obj[prop]) {
                xml += "<" + prop + ">";
                xml += OBJtoXML(new Object(obj[prop][array]));
                xml += "</" + prop + ">";
            }
        } else if (typeof obj[prop] == "object") {
            xml += OBJtoXML(new Object(obj[prop]));
        } else {
            if(prop == 'venue') {
                xml += venueUniformization(obj[prop]);
            } else { 
                xml += obj[prop];
            }
        }
        xml += obj[prop] instanceof Array ? '' : "</" + prop + ">";
    }
    var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
    return xml
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
