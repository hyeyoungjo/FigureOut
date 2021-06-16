var uid = "user:" + getParameterByName('uid');
console.log(uid);
// var uid = "100";
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


var typeList = ["chart", "diagram", "formula", "graphic", "human", "picture", "table"];
UserData = function() {
    this.map = new Array();
    this.firstV = 0;
    this.firstK = "";
    this.secondV = 0;
    this.secondK = "";
}
UserData.prototype = {
    put : function(key, val) {
        this.map[key] = val;

        if(val*1 >= this.firstV) {
            this.firstV = val;
            this.firstK = key;
        } else if (val*1 >= this.secondV) {
            this.secondV = val;
            this.secondK = key;
        }
    },
    get : function(key) {
        return this.map[key]+"";
    },
    increase : function(key) {
        this.map[key] ++;
    },
    getfirst : function() { 
        return this.firstK;
    },
    getsecond : function() { 
        return this.secondK;
    },
    getfirstR : function() {
        return (parseInt((this.firstV / (this.firstV + this.secondV) ) * 5));
    }
};
var data = new UserData();
getData();

function getData(){
    typeList.forEach( function(typeName) {
        firebase.database().ref('/users/' + uid + '/history/' + typeName).on('value', function (x) {
            var v = x.val();
            if(v == null) v=0;
            data.put(typeName, v);
            console.log(typeName + " score  : " + data.get(typeName));
        //     console.log("fk : " + data.getfirst() + "  sk: " + data.getsecond());
        });
    });
}

function getAllData() { 
    return data;
}

function getUserData(typeName) { 
    return data.get(typeName);
}



// const userDb = firebase.database().ref('/users/' + uid);
function updateUserData(imgUrl) {
    var type = getFigureType(imgUrl.replace(/\./gi, "~")+"");
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
}
