

function logout(){
    console.log('logout');
    localStorage.removeItem("jwt");
    console.log(localStorage.getItem("jwt"));
    window.location.href = './login.html';
}


    
var jwt = localStorage.getItem("jwt");
console.log('jwt:' + jwt);
if (jwt == null) {
    console.log("start");
    localStorage.setItem("fromPage", 'index'); 
    window.location.href = './login.html';
    console.log(jwt);
    console.log(localStorage.getItem('jwtUser'));
}


