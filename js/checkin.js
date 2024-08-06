var jwt = localStorage.getItem("jwt");
var jwtUser = localStorage.getItem("jwtUser");
if (jwt == null) {
  window.location.href = './login.html'
  console.log("Get in!");
}
else{  
  const myJ = JSON.parse(jwtUser);
  console.log(myJ);
  //sdocument.getElementById("jUser").innerHTML = myJ['user']['fname'];
  //document.getElementById("jEmail").innerHTML = myJ['user']['username'];
  
  //var src = document.getElementById("jImage");
  //src.src = myJ['user']['avatar'];

  var today = new Date();
  var date = today.getFullYear()+'-'+today.getMonth()+'-'+today.getDate();
  var time = today.getHours().toString().replace(/^(\d)$/, '0$1') + ":" + today.getMinutes().toString().replace(/^(\d)$/, '0$1'); // + ":" + today.getSeconds();
  var dateTime = date+'T'+time;
   
  console.log(dateTime)
  document.getElementById("jDate").value = dateTime;
}