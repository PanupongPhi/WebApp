function createList(){
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", host + "/api/location");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send();

    xhttp.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            console.log(xhttp.responseText);
            var objects = JSON.parse(this.responseText);  
            
            var x = document.getElementById("jGoto");
            for(i=0;i<objects.length;i++){
                var lc = new Option(objects[i]['name'],i);
                x.options.add(lc);
            }        

            var lcDefult = new Option("เลือกสถานที่", 0);
            x.options.add(lcDefult,0);
            x.options[0].disabled = true;
            x.selectedIndex = 0;

            console.log("Done!!!");
            locationColor();
        }
    }
}

function getLocation(){
    
    var x = document.getElementById("jLocation");
    for(i=0;i<locList.length;i++){
        var lc = new Option(locList[i]['name'],i);
        x.options.add(lc);
    }

    x.options[0].disabled = true;
}

function locationColor() {
    var x = document.getElementById("jGoto");
    var i = x.selectedIndex;
    if(i==0){
        x.style.color = "crimson";
    }
    else{
        x.style.color = "black";
    }    
  }
//getLocation();
createList();
//locationColor();