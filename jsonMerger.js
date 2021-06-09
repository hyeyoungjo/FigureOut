var metaData= './json/metadata/'; 
var fs = require('fs');    

var metadataJson = new Array();

fs.readdir(metaData, (err, filelist) => { 
    filelist.forEach(file => {
        if(file.includes('.json')) {
            // console.log(file);   
            var obj = new Object();
            obj.filename = file.split('_')[0];

            var data = fs.readFileSync('./json/metadata/' + file, 'utf8');
            var jsonData=JSON.parse(data);
            // const sections = jsonData.sections;
            // sections.forEach(section => {
            //     console.log(section.word_count);
            // });
            obj.data = jsonData;

            try {
                var fig = fs.readFileSync('./json/figures/' + file.split('_')[0] + '_figures.json', 'utf8');
                var jsonFig=JSON.parse(fig);
                obj.fig = jsonFig;
            } catch (error) {
                obj.fig = null;
            }
            metadataJson.push(obj);
        }
    })
    
    // console.log( JSON.stringify(metadataJson) );
    fs.writeFile("one.json",JSON.stringify(metadataJson), function(err) {
        if (err) {
            console.log(err);
        }
    });
})



