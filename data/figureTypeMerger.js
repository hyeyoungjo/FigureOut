var metaData= 'data/figureType/'; 
var fs = require('fs');    

var figureTypes = new Object();

fs.readdir(metaData, (err, filelist) => { 
    filelist.forEach(file => {
        if(file.includes('.json')) {
            var obj = new Object();
            var filename = file;
            var data = fs.readFileSync('data/figureType/' + file, 'utf8');
            var jsonData = JSON.parse(data);
            // console.log(jsonData);

            for(var key in jsonData) {
                figureTypes[ (filename.replace("types.json","_crop_") + key + ".jpg").replace(/\./gi, "`") ] = jsonData[key].type; 
                console.log(jsonData[key].type);
            }
        }
    })

    fs.writeFile("data/profFigType.json",JSON.stringify(figureTypes), function(err) {
        if (err) {
            console.log(err);
        }
    });
})

