var metaData= './x/json/metadata/'; 
var figData= './x/json/figures/'; 
const { O_NONBLOCK } = require('constants');
var fs = require('fs');

var figureListJson = new Array();

var randType = ["chart", "diagram", "formula", "graphic", "human", "picture", "table"];

fs.readdir(metaData, (err, filelist) => { 
    console.log(filelist);

    filelist.forEach(file => {
        if(file.includes('.json')) {
            var obj = new Object();
            obj.filename = file.split('_')[0];

            var data = fs.readFileSync( '' + metaData + file, 'utf8');
            var jsonData=JSON.parse(data);
            
            obj.data = jsonData;

            var jsonFig = null;
            try {
                var fig = fs.readFileSync('' + figData + file.split('_')[0] + '_figures.json', 'utf8');
                jsonFig=JSON.parse(fig);

                var figlist = new Array();
                for (var key in jsonFig.captions) {
                    // console.log(key + ": " + jsonFig.captions[key]); 
                    var newfigure = new Object();
                    newfigure.url = obj.filename + "_crop_"+key+".jpg";
                    newfigure.type = randType[ Math.floor( Math.random() * 7 ) ];
                    figlist.push(newfigure);
                } 
                var temp = new Object();
                temp.file = obj.filename;
                temp.figure = figlist;
                figureListJson.push(temp);
            } 
            catch (error) {
            }            
        }
    });

    fs.writeFile("./data/figureType.json",JSON.stringify(figureListJson), function(err) {
        if (err) {
            console.log(err);
        }
    });
})
