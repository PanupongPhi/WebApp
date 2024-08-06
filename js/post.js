function addLocation(){
    var xName = document.getElementById("jName").value;
    var xLat = document.getElementById("jLat").value;
    var xLon = document.getElementById("jLon").value;
    var xDist = document.getElementById("jDist").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", host + "/api/location");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "Name": xName,
        "Latitude": xLat,
        "Longtitude": xLon,
        "Radian": xDist
    }));
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4){
            const objects = JSON.parse(this.responseText);
            console.log(objects);
        }
    }
}