var jwt = localStorage.getItem("jwt");
console.log('jwt:' + jwt);
if (jwt == null) {
    console.log("start");
    localStorage.setItem("fromPage", 'job'); 
    window.location.href = './login.html';
    console.log(jwt);
    console.log(localStorage.getItem('jwtUser'));
}

document.getElementById('usernameDisplay').innerHTML = localStorage.getItem("jwtUser");

function filTable(search){
    console.log('filtable by : ' + search)
    var table = document.getElementById('jobTable');

    let rowCount = table.rows.length;
    if(rowCount > 2){
        console.log('Clear rows : ' + rowCount);
        for (var i = rowCount - 1; i >= 2; i--) {
            table.deleteRow(i);
        }
    }

    let count = 10;
    if(search == null || search == "null" || search == ""){    
        search = null
    }
    console.log('filtable by : ' + search)
    const xhr = new XMLHttpRequest();
    xhr.open("GET", host + "/api/Job/Search?search=" + search);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send();
    xhr.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            
            const doneIcon = `<a href="#" class="nav-link link-active">
                <i class="material-icons" style="font-size: 22px">task_alt</i>
                </a>`;

            var obj = JSON.parse(this.responseText);
            console.log('Get DB:' + this.responseText);
            obj.forEach(element => {
                var row = table.insertRow(-1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                cell1.innerHTML = element['jobNo'];
                cell2.innerHTML = element['name'];

                cell3.style.backgroundColor = "#EAEEE9"
                cell4.style.backgroundColor = '#FFEFD5'
                cell5.style.backgroundColor = '#ECC5C0'

                if(element['dueDate1'] != null) {
                    let cDate1 = new Date(element['dueDate1']);
                    cell3.innerHTML = cDate1.toLocaleString("en-GB",{ month: 'short', day: '2-digit', year: 'numeric'});                    
                }

                if(element['dueDate2'] != null) {
                    let cDate2 = new Date(element['dueDate2']);
                    cell4.innerHTML = cDate2.toLocaleString("en-GB",{ month: 'short', day: '2-digit', year: 'numeric'});                    
                }

                if(element['dueDate3'] != null) {
                    let cDate3 = new Date(element['dueDate3']);
                    cell5.innerHTML = cDate3.toLocaleString("en-GB",{ month: 'short', day: '2-digit', year: 'numeric'});                    
                }

                //cell1.setAttribute('onclick', 'gotoEdit()');
                //row.setAttribute('onclick', `gotoEdit(${element['id']}, '${element['jobNo']}', '${element['name']}')`);                 
                
                cell1.setAttribute('onclick', `gotoEdit(${element['id']}, '${element['jobNo']}', '${element['name']}')`);
                cell2.setAttribute('onclick', `gotoEdit(${element['id']}, '${element['jobNo']}', '${element['name']}')`);               

                var userName = localStorage.getItem("jwtUser");

                var isAdmin = false; // Initialize a flag to indicate if the string is found in the array

                // Loop through the array and check if the single string is equal to any of the array elements
                for (var i = 0; i < userAdmin.length; i++) {
                    if (userName === userAdmin[i]) {
                        isAdmin = true;
                        break; // Exit the loop early if a match is found
                    }
                }

                if(isAdmin == true){
                    // Add onclick event handler                
                    cell3.onclick = function() {
                        gotoEditDue(element['id'], element['jobNo'], element['name'], 1);
                    };

                    cell4.onclick = function() {
                        gotoEditDue(element['id'], element['jobNo'], element['name'], 2);
                    };

                    cell5.onclick = function() {
                        gotoEditDue(element['id'], element['jobNo'], element['name'], 3);
                    };
                }                

            });
        }
    }

}

function gotoEdit(jobId, jobNo, jobName) {
    localStorage.setItem("job-id", jobId);
    localStorage.setItem("job-no", jobNo);
    localStorage.setItem("job-name", jobName);
    console.log("Job ID:" + jobId);
    console.log("Job No:" + jobNo);
    console.log("Job Name:" + jobName);
    window.location.href = './drawing-module.html';
}

function gotoEditDue(jobId, jobNo, jobName, dueTime) {
    localStorage.setItem("job-id", jobId);
    localStorage.setItem("job-no", jobNo);
    localStorage.setItem("job-name", jobName);
    localStorage.setItem("due-time", dueTime);
    window.location.href = './Edit-due.html';
}

function checkEnter(event) {
    if (event.keyCode === 13) {
        // Enter key was pressed
        var inputValue = document.getElementById("searchJob").value;
        filTable(inputValue);
        // You can add your custom logic here
    }
}

filTable(null);


