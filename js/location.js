var x = document.getElementById("jLocation");
x.value = "Start....";
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    x.value = "กำลังค้นหา....";    
  } else { 
    x.value = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
    console.log(position);
    console.log(position.coords.latitude);
  //x.innerHTML = "Latitude: " + position.coords.latitude + 
  //"<br>Longitude: " + position.coords.longitude;
    //x.value = "Latitude: " + position.coords.latitude;

    var lat1 = position.coords.latitude;
    var lon1 = position.coords.longitude;

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", host + "/api/location");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send();

    xhttp.onreadystatechange=function(){
      if(this.readyState==4 && this.status==200){
          console.log(xhttp.responseText);
          var obj = JSON.parse(this.responseText);  
                    
          var isFind = false;
          for(i=0;i<obj.length;i++){
            var dist = getDistance(lat1, lon1, obj[i]['latitude'], obj[i]['longtitude']);
            if(dist < obj[i]['radian']){
              x.value = obj[i]['name'] + " ระยะห่าง:" + dist.toFixed(0) + " m.";
              isFind = true;
            }          
          }
          if(isFind == false){
            x.value = "คุณอยู่ห่างสถานที่เกินไป!";
          }                  
      }

    }
}

function getDistance(lat1,lon1,lat2,lon2){
  const R = 6371e3;
  const d1 = lat1 * Math.PI/180;
  const d2 = lat2 * Math.PI/180;
  const bD = (lat2-lat1) * Math.PI/180;
  const bA = (lon2-lon1) * Math.PI/180;
  
  const a = (Math.sin(bD/2) * Math.sin(bD/2)) + (Math.cos(d1) * Math.cos(d2) * Math.sin(bA/2) * Math.sin(bA/2));   
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c;
  console.log("Distance cal:" + d);
  return d;
}

function getNameById(id){
  const paramsObj = {
    id:2
  };
  const target = new URL(host + '/api/location/' + id);
  //target.search = new URLSearchParams(paramsObj).toString();
  //console.log(target);

  const xhttp = new XMLHttpRequest();
  
  xhttp.open("GET", target);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send();

  xhttp.onreadystatechange=function(){
    if(this.readyState==4 && this.status==200){
      console.log(xhttp.responseText);
      var obj = JSON.parse(this.responseText);

      //var y = document.getElementById("jTestApi");
      //y.value = obj['name'] + " " + obj['radian'];
    }
  }
  
}



getLocation();
//getDistance(14.1785784, 100.845146, 13.993983, 100.6635085);
getNameById(4);
