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
        return this.map[key];
    },
    increase : function(key) {
        this.map[key] ++;
    }
};
var data = new UserData();
typeList.forEach(function(typeName) {
    firebase.database().ref('/users/' + uid + '/history/' + typeName).on('value', function (x) {
        data.put(typeName, x.val());
        updateFigureSelector(typeName, x.val());
    });
});
function getUserData(typeName) { 
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


// getfirebase();

function getfirebase() {
    firebase.database().ref('/users/' + uid + '/history/chart').on('value', function (x) {
        // userData[0].chart = x.val();
        chart = x.val();
    });
    firebase.database().ref('/users/' + uid + '/history/diagram').on('value', function (x) {
        // userData[0].diagram = x.val();
        diagram = x.val();
    });
    firebase.database().ref('/users/' + uid + '/history/formula').on('value', function (x) {
        // userData[0].formula = x.val();
        formula = x.val();
    });
    firebase.database().ref('/users/' + uid + '/history/graphic').on('value', function (x) {
        // userData[0].graphic = x.val();
        graphic = x.val();
    });
    firebase.database().ref('/users/' + uid + '/history/human').on('value', function (x) {
        // userData[0].human = x.val();
        human = x.val();
    });
    firebase.database().ref('/users/' + uid + '/history/picture').on('value', function (x) {
        // userData[0].picture = x.val();
        picture = x.val();
    });
    firebase.database().ref('/users/' + uid + '/history/table').on('value', function (x) {
        // userData[0].table = x.val();
        table = x.val();
    });
}

//새로 load 할때 -> 목록에서 현재까지의 preference 반영