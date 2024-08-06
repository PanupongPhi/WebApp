const inputs = document.querySelectorAll(".input");

function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

var jwt = localStorage.getItem("jwt");
if (jwt != null) {
  //window.location.href = './index.html'
  console.log(jwt);
  console.log(localStorage.getItem('jwtUser'));
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  console.log('username:' + username);
  console.log('password:' + password);

  const json = JSON.stringify({
    "username": username,
    "password": password
  });

  console.log(json);

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", host + "/api/UserApps/login");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(json);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      console.log(objects);
      localStorage.setItem("jwt", objects['id']);
      localStorage.setItem("jwtUser", objects['name']);
      Swal.fire({
        text: objects['name'],
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          var fromPage = localStorage.getItem('fromPage');
          switch(fromPage){
            case "index":
              window.location.href = './index.html';
              break;
            case "update":
              window.location.href = './update.html';
              break;
            case "job":
              window.location.href = './job.html';
              break;

          }
          
        }
      });      
    }else{
      Swal.fire({
        text: 'Login-fail.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };
  return false;
}