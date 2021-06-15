// var uid = "user:" + getParameterByName('uid');
var uid = "100";

var typeList = ["chart", "diagram", "formula", "graphic", "human", "picture", "table"];
UserData = function() {
    this.map = new Array();
}
UserData.prototype = {
    put : function(key, val) {
        this.map[key] = val;
    },
    get : function(key) {
        return this.map[key]+"";
    },
    increase : function(key) {
        this.map[key] ++;
    }
};
var data = new UserData();
getData();

function getData(){
    typeList.forEach( function(typeName) {
        firebase.database().ref('/users/' + uid + '/history/' + typeName).on('value', function (x) {
            data.put(typeName, x.val());
            console.log(data.get(typeName));
        });
    });
}

function getUserData(typeName) { 
    console.log(" ty:" + typeName+ " " + data.get(typeName));
    return data.get(typeName);
}



// const userDb = firebase.database().ref('/users/' + uid);
function updateUserData(imgUrl) {
    var type = "";
    firebase.database().ref('/' + imgUrl.replace(/\./gi, "`") + '/').once('value').then(function (snapshot) {
        type = snapshot.val()+"";
        data.increase(type);
        console.log(type + ": " + data.get(type));

        firebase.database().ref('/users/' + uid + '/history/').set({
            chart: data.get("chart"),
            diagram: data.get("diagram"),
            formula: data.get("formula"),
            graphic: data.get("graphic"),
            human: data.get("human"),
            picture: data.get("picture"),
            table: data.get("table")
        });
    });
}
