const JobID = localStorage.getItem('job-id');
const JobNo = localStorage.getItem('job-no');
const JobName = localStorage.getItem('job-name');
const ModuleId = localStorage.getItem('module-id');
const ModuleNo = localStorage.getItem('module-name');


function filTable(){
    var jobDetail = document.getElementById('jobDetail');
    jobDetail.innerHTML = `${JobNo} ${JobName} ${ModuleNo}`;
    

    var table = document.getElementById('drawingTable');
    let rowCount = table.rows.length;
    if(rowCount > 2){
        console.log('Clear rows : ' + rowCount);
        for (var i = rowCount - 1; i >= 2; i--) {
            table.deleteRow(i);
        }
    }
    console.log('Row count : ' + rowCount);

    //let count = 10;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", host + "/api/Drawings/GetByModuleId/" + ModuleId);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send();
    xhr.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            
            const doneIcon = //`<a href="#" class="nav-link link-active">
                `<i class="material-icons" style="font-size: 22px; color: #009688;">task_alt</i>`
                //</a>`;

            const doneColor = '#82DAC1'
            const rejectColor = '#FF6262'


            var obj = JSON.parse(this.responseText);
            console.log('Get DB:' + this.responseText);
            obj.forEach(element => {
                var row = table.insertRow(-1);
                var cName = row.insertCell(0);
                var cQty = row.insertCell(1);
                var cReceive = row.insertCell(2);
                var cSubcon = row.insertCell(3);
                var cOrderMat = row.insertCell(4);
                var cCutMat = row.insertCell(5);
                var cReceiveMat = row.insertCell(6);
                var cBank = row.insertCell(7);
                var cMilling = row.insertCell(8);
                var cLathe = row.insertCell(9);
                var cCncMilling = row.insertCell(10);
                var cCncLathe = row.insertCell(11);
                var cTaps = row.insertCell(12);
                var cQc = row.insertCell(13);
                var cPlating = row.insertCell(14);
                var cDone = row.insertCell(15);
                var cRetrive = row.insertCell(16);
                //var cModify = row.insertCell(17);
                var cReject = row.insertCell(17);
                var cGrinding = row.insertCell(18);
                var cLaser = row.insertCell(19);

                //row.setAttribute('onclick',`gotoDrawingUpdateDetail(${element['id']}, "${element['name']}")`);
                cName.innerHTML = element['name'];

                let cDate = new Date(element['createOn']);
                //cell2.innerHTML = cDate.toLocaleString("en-GB",{ month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'});
                
                
                let qty = element['qty']

                cQty.innerHTML = qty

                cReceive.innerHTML = element['receiveQty']
                if(element['receiveQty'] >= qty) {
                    cReceive.style.backgroundColor = doneColor
                }

                cSubcon.innerHTML = element['subconQty']
                if(element['subconQty'] >= qty) {
                    cSubcon.style.backgroundColor = doneColor
                }
                if(element['subconRejQty'] != null) {
                    cSubcon.style.backgroundColor = rejectColor                    
                }
                
                cOrderMat.innerHTML = element['ordermattQty']
                if(element['ordermattQty'] >= qty){
                    cOrderMat.style.backgroundColor = doneColor
                }
                
                cCutMat.innerHTML = element['cutmattQty']
                if(element['cutmattQty'] >= qty) {
                    cCutMat.style.backgroundColor = doneColor
                }
                if(element['cutmattRejQty'] != null) {
                    cCutMat.style.backgroundColor = rejectColor
                }

                cReceiveMat.innerHTML = element['receiveMattQty']
                if(element['receiveMattQty'] >= qty) {
                    cReceiveMat.style.backgroundColor = doneColor
                }

                cBank.innerHTML = element['bankQty']
                if(element['bankQty'] >= qty) {
                    cBank.style.backgroundColor = doneColor                    
                }
                if(element['bankRejQty'] != null) {
                    cBank.style.backgroundColor = rejectColor
                }

                cMilling.innerHTML = element['millingQty']
                if(element['millingQty'] >= qty) {
                    cMilling.style.backgroundColor = doneColor
                }
                if(element['millingRejQty'] != null) {
                    cMilling.style.backgroundColor = rejectColor
                }

                cLathe.innerHTML = element['latheQty']
                if(element['latheQty'] >= qty) {
                    cLathe.style.backgroundColor = doneColor
                }
                if(element['latheRejQty'] != null) {
                    cLathe.style.backgroundColor = rejectColor
                }

                cCncMilling.innerHTML = element['cncMillingQty']
                if(element['cncMillingQty'] >= qty) {
                    cCncMilling.style.backgroundColor = doneColor
                }
                if(element['cncMillingRejQty'] != null) {
                    cCncMilling.style.backgroundColor = rejectColor
                }

                cCncLathe.innerHTML = element['cncLatheQty']
                if(element['cncLatheQty'] >= qty) {
                    cCncLathe.style.backgroundColor = doneColor
                }
                if(element['cncLatheRejQty'] != null) {
                    cCncLathe.style.backgroundColor = rejectColor
                }

                cTaps.innerHTML = element['tapsQty']
                if(element['tapsQty'] >= qty) {
                    cTaps.style.backgroundColor = doneColor
                }
                if(element['tapsRejQty'] != null) {
                    cTaps.style.backgroundColor = rejectColor
                }

                cQc.innerHTML = element['qcQty']
                if(element['qcQty'] >=  qty) {
                    cQc.style.backgroundColor = doneColor
                }
                if(element['qcRejQty'] != null) {
                    cQc.style.backgroundColor = rejectColor
                }

                cPlating.innerHTML = element['platingQty']
                if(element['platingQty'] >= qty) {
                    cPlating.style.backgroundColor = doneColor
                }
                if(element['platingRejQty'] != null) {
                    cPlating.style.backgroundColor = rejectColor
                }

                cDone.innerHTML = element['doneQty']
                if(element['doneQty'] >= qty) {
                    cDone.style.backgroundColor = doneColor
                }

                cRetrive.innerHTML = element['retriveQty']
                if(element['retriveQty'] >= qty) {
                    cRetrive.style.backgroundColor = doneColor
                }

                /* cModify.innerHTML = element['modifyQty']
                if(element['modifyQty'] >= qty) {
                    cModify.style.backgroundColor = doneColor
                } */

                cReject.innerHTML = element['rejectQty']
                if(element['rejectQty'] >= qty) {
                    cReject.style.backgroundColor = doneColor
                }

                cGrinding.innerHTML = element['grindingQty']
                if(element['grindingQty'] >= qty) {
                    cGrinding.style.backgroundColor = doneColor
                }
                if(element['grindingRejQty'] != null) {
                    cGrinding.style.backgroundColor = rejectColor
                }

                cLaser.innerHTML = element['laserQty']
                if(element['laserQty'] >= qty) {
                    cLaser.style.backgroundColor = doneColor
                }
                if(element['laserRejQty'] != null) {
                    cLaser.style.backgroundColor = rejectColor
                }

                var userName = localStorage.getItem("jwtUser");      
                
                if(userName === 'Chainarong' || userName === 'User1'){
                    cName.onclick = function() { gotoDrawingUpdateDetail(element['id'],element['name'])}
                    cReceive.onclick = function() { setDone(element['id'], 'Receive') }
                    cSubcon.onclick = function() { setDone(element['id'], 'Subcon') }
                    cOrderMat.onclick = function() { setDone(element['id'], 'Ordermatt') }
                    cCutMat.onclick = function() { setDone(element['id'], 'Cutmatt') }
                    cReceiveMat.onclick = function() { setDone(element['id'], 'ReceiveMatt') }
                    cBank.onclick = function() { setDone(element['id'], 'Bank') }
                    cMilling.onclick = function() { setDone(element['id'], 'Milling') }
                    cLathe.onclick = function() { setDone(element['id'], 'Lathe') }
                    cCncMilling.onclick = function() { setDone(element['id'], 'CncMilling') }
                    cCncLathe.onclick = function() { setDone(element['id'], 'CncLathe') }
                    cTaps.onclick = function() { setDone(element['id'], 'Taps') }
                    cQc.onclick = function() { setDone(element['id'], 'Qc') }
                    cPlating.onclick = function() { setDone(element['id'], 'Plating') }
                    cDone.onclick = function() { setDone(element['id'], 'Done') }
                    cRetrive.onclick = function() { setDone(element['id'], 'Retrive') }
                    //cModify.onclick = function() { setDone(element['id'], 'Modify') }
                    cReject.onclick = function() { setDone(element['id'], 'Reject') }
                    cGrinding.onclick = function() { setDone(element['id'], 'Grinding') }
                    cLaser.onclick = function() { setDone(element['id'], 'Laser') }
                }else{
                    row.setAttribute('onclick',`gotoDrawingUpdateDetail(${element['id']}, "${element['name']}")`);
                }
                
                
            });
        }
    }

}

function setDone(drawingId, process){
    console.log('---> SetDone drawingId:' + drawingId + ' |process:' + process)

    Swal.fire({
        title: 'Confirm?',
        showDenyButton: true,
        confirmButtonText: 'Save',
        debyButtonText: 'Cancel'
        //showConfirmButton: false,
        //confirmButtonText: 'OK'
    }).then((result)=>{
      if(result.isConfirmed){
  
        var userApps = localStorage.getItem("jwt");
  
        Swal.fire({
          title: 'Saving...',
          showConfirmButton: false
        });
      
        let stampTime = DateNow(); //new Date().toISOString();
        
        console.log('Stamp time:' + stampTime);
        
        let obj = {
            Id: drawingId,
            UserAppsId: userApps,
            StampTime: stampTime,
            function: process
          };
        
        console.log("obj : " + JSON.stringify(obj));
        const xhttp = new XMLHttpRequest();    
        xhttp.open("POST", host + "/api/Drawings/UpdateDone");
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(JSON.stringify(obj));
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && (this.status == 200 || this.status == 201)){

                console.log('api response status : ' + this.status)
                    
                console.log('---> Before fillTable');
                filTable();
                console.log('<-- After fillTable');
  
                Swal.fire({
                    text: 'Submit Success.',
                    icon: 'success',
                    //confirmButtonText: 'OK',
                    showConfirmButton: false,
                    timer: 1000
                }).then((result) => {
                    if (result.isConfirmed) {
                    //window.location.href = './update.html';
                    }
                });                                  
            }
            else{
                console.error('Fail response:' + this.status);
                Swal.fire({
                    text: 'Submit fail.' + this.status,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } 
      }else{
        //selectJob(drawingJobNo, drawingModuleNo, drawingId);
      }    
    });
}
function getData(){
    let count = 10;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", host + "/api/Drawings/GetLength/" + count);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send();
    xhr.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            console.log('Get DB:' + this.responseText);

            var obj = JSON.parse(this.responseText);


        }
    }
}

function gotoDrawingUpdateDetail(drawingId, drawingNo) {

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
    
        Swal.fire({
            title: 'Please select',
            showDenyButton: true,
            confirmButtonText: 'Show',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            showDenyButton: true,
            denyButtonText: 'Delete'
            //showConfirmButton: false,
            //confirmButtonText: 'OK'
        }).then((result)=>{
            if (result.isConfirmed) {
                // Handle Show button click
                console.log('Drawing id : ' + drawingId);
                localStorage.setItem('drawing-id', drawingId);
                localStorage.setItem('drwaing-no', drawingNo);
                window.location.href = './drawing-update-detail.html';

            } else if (result.isDenied) {
                // Handle Delete button click
                console.log('Drawing id : ' + drawingId);

                Swal.fire({
                    title: 'Saving...',
                    showConfirmButton: false
                });

                const xhr = new XMLHttpRequest();
                xhr.open("DELETE", host + "/api/Drawings/" + drawingId);
                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xhr.send();
                xhr.onreadystatechange = function(){
                    if(this.readyState===4){
                        if(this.status===204){
                            console.log('Get DB:' + this.responseText);
                
                            //var obj = JSON.parse(this.responseText);
                
                            Swal.fire({
                                text: 'Delete Success.',
                                icon: 'success',
                                //confirmButtonText: 'OK',
                                showConfirmButton: false,
                                timer: 1000
                            });

                            filTable();
                            
                        } else {
    
                            console.error('Fail response:' + this.status);
                            Swal.fire({
                                text: 'Delete fail.' + this.status,
                                icon: 'error',
                                confirmButtonText: 'OK'
                            });
    
                        } 
                    }                    
                }

                //xhr.send();
            } else {
                // Handle Cancel button click or close button click
                //Swal.fire('Dialog closed or Cancel clicked');
            }
        });

    } else {

        console.log('Drawing id : ' + drawingId);        
        localStorage.setItem('drawing-id', drawingId);
        localStorage.setItem('drwaing-no', drawingNo);
        window.location.href = './drawing-update-detail.html';

    }


}

filTable();