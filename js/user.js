function getDepartment(){
    var sel = document.getElementById('pDepartment');

    const xhttp = new XMLHttpRequest();    
    xhttp.open("GET", host + "/api/Departments");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4) {
            const getObj = JSON.parse(this.responseText);
            console.log('GET:' + getObj[0]);
            console.log('Recv:' + this.responseText);

            getObj.forEach((value, index, array) => {
                var option = document.createElement("option");
                option.text = value['name'];
                sel.add(option);
            })
        }
    }
}

function getUserLevel(){
    var sel = document.getElementById('pUserLevel');

    const xhttp = new XMLHttpRequest();    
    xhttp.open("GET", host + "/api/UserLevels");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4) {
            const getObj = JSON.parse(this.responseText);
            console.log('GET:' + getObj[0]);
            console.log('Recv:' + this.responseText);

            getObj.forEach((value, index, array) => {
                var option = document.createElement("option");
                option.text = value['name'];
                sel.add(option);
            })
        }
    }
}

function register(){
    Swal.fire({
        title: 'Confirm?',
        showDenyButton: true,
        confirmButtonText: 'Save',
        debyButtonText: 'Cancel'
        //showConfirmButton: false,
        //confirmButtonText: 'OK'
    }).then((result)=>{
        if(result.isConfirmed){
            Swal.fire({
                title: 'Saving...',
                showConfirmButton: false
            });

            var userObj = {
                Name: document.getElementById('pName').value,
                Surname: document.getElementById('pSurname').value,
                Nickname: document.getElementById('pNickname').value,
                Email: document.getElementById('pEmail').value,
                Department: document.getElementById('pDepartment').value,
                Userlevel: document.getElementById('pUserLevel').value
            }

            var obj = JSON.stringify(userObj);

            console.log('Obj:' + obj);

            const xhttp = new XMLHttpRequest();    
            xhttp.open("POST", host + "/api/UserApps/New");
            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhttp.send(obj);
            xhttp.onreadystatechange = function() {
                if(this.readyState == 4 && (this.status == 200 || this.status == 201)) {
                    const objects = JSON.parse(this.responseText);
                    console.log(objects);

                    Swal.fire({
                        text: 'Submit Success.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        timer: 1000
                    }).then((result) => {
                        if (result.isConfirmed) {
                        //window.location.href = './update.html';
                        }
                    });
                } else {
                    console.error('Fail response:' + this.status);
                    Swal.fire({
                        text: 'Submit fail.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        }
    })
}

getDepartment();
getUserLevel();