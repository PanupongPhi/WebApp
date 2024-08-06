const bt = document.getElementById("btn");

var jwt = localStorage.getItem("jwt");
var jwtUser = localStorage.getItem("jwtUser");
if (jwt == null) {
  window.location.href = './login.html'
  console.log("Get in!");
}
else{  
  const myJ = JSON.parse(jwtUser);
  console.log(myJ);
  //document.getElementById("jUser").innerHTML = myJ['user']['fname'];
  //document.getElementById("jEmail").innerHTML = myJ['user']['username'];
  
  var src = document.getElementById("jImage");
  src.src = myJ['user']['avatar'];
}



function logout() {
	localStorage.removeItem("jwt");
	window.location.href = './login.html'
	console.log("log out!");
  }