var metaData= './json/metadata/'; 
const { O_NONBLOCK } = require('constants');
var fs = require('fs');    

var metadataJson = new Array();
var imgList = new Array();
var checkList = new Array();
var okcnt = 0;
var oopscnt = 0;
var cnt = 0;

setList(checkData);

function setList(check) {
    const dir = './img/crops/';

    fs.readdir(dir, (err, filelist)=>{
        for( var i in filelist ) {
            var temp = filelist[i]+'';
            imgList.push(temp);
            checkList.push(false);
            cnt ++;
        }    
        check();    
    });
}

function checkData(){

    fs.readdir(metaData, (err, filelist) => { 

        filelist.forEach(file => {
            if(file.includes('.json')) {
                var obj = new Object();
                obj.filename = file.split('_')[0];

                var data = fs.readFileSync('./json/metadata/' + file, 'utf8');
                var jsonData=JSON.parse(data);
                
                delete jsonData.fullpath;
                delete jsonData.paragraph_containing_keyword;
                delete jsonData.paragraph_after_keyword;
                delete jsonData.sections;
                delete jsonData.authors;
                delete jsonData.abstract;
                delete jsonData.publication;
                delete jsonData.version;
                delete jsonData.keywords;
                delete jsonData.venue;
                delete jsonData.paper_id;
                
                obj.data = jsonData;

                var jsonFig = null;
                var figflag = false;
                try {
                    var fig = fs.readFileSync('./json/figures/' + file.split('_')[0] + '_figures.json', 'utf8');
                    jsonFig=JSON.parse(fig);

                    var figlist = new Array();
                    for (var key in jsonFig.captions) {
                        var newfigure = new Object();
                        newfigure.url = obj.filename + "_crop_"+key+".png";
                        // newfigure.page = '' + jsonFig.captions[key]['page'];

                        // console.log( obj.filename + "_crop_"+key+".png");

                        var flag = 0;
                        for( var i in imgList ) {
                            if(imgList[i].includes( ""+obj.filename + "_crop_" + key + '.' )){
                                flag = 1;
                                checkList[i]=true;
                                break;
                            }
                        }
                        if(flag == 1) {
                            newfigure.check = "ok";
                            okcnt++;
                        } else if(flag == 0){
                            newfigure.check = key+"";
                            figlist.push(newfigure);
                            oopscnt++;
                            figflag = true;
                        }
                        

                    } 
                    var temp = new Object();
                    temp.figure = figlist;
                    obj.figures=temp;
                } 
                catch (error) {
                }
                
                var paper = new Object();
                paper.article = obj;
                if(figflag){
                    metadataJson.push(paper);
                }
            }  
        })
        
        // console.log( JSON.stringify(metadataJson) );


        fs.writeFile("figurecheck.json",JSON.stringify(metadataJson), function(err) {
            // console.log(okcnt);
            // console.log(oopscnt);
            // console.log(cnt);
            var tt =0;
            for(var i in imgList) {
                if(checkList[i]==false) {
                    // console.log(imgList[i]);
                    tt++;
                }
            }
            // console.log(tt);
            if (err) {
                // console.log(err);
            }
        });
    })
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




// fs.readdir('./img/training/table', (err, filelist)=>{
//     console.log("@table@:[");
//     for( var i in filelist ) {
//         console.log("@"+filelist[i]+"@,");
//     }   
//     console.log("]")
// });