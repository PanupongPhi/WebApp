
var drawingId;
var drawingJobNo;
var drawingModuleNo;

var jwt = localStorage.getItem("jwt");
console.log('jwt:' + jwt);
if (jwt == null) {
    console.log("start");
    localStorage.setItem("fromPage", 'update'); 
    window.location.href = './login.html';
    console.log(jwt);
    console.log(localStorage.getItem('jwtUser'));
}

function onScanSuccess(decodedText, decodedResult) {
    // Handle on success condition with the decoded text or result.
    console.log(`Scan result: ${decodedText}`, decodedResult);

    document.getElementById('DrawingNo').value = decodedText;
    getDrawing(decodedText);

    html5QrcodeScanner.clear();
}

function onError(err){
  console.log(err);
}

const html5QrcodeScanner = new Html5QrcodeScanner("reader", { 
  fps: 20, qrbox: 250 
});
html5QrcodeScanner.render(onScanSuccess, onError);

function getDrawing(drawingNo){
    var btRetry = document.getElementById('btRetry');
    btRetry.style.display = "block";
    document.getElementById('DrawingQty').value = 'Loading...';
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", host + "/api/Drawings/GetArrayByName/" + drawingNo);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send();

    xhttp.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
          console.log(xhttp.responseText);
          var obj = JSON.parse(this.responseText);

          console.log(obj);

          console.log('Length ' + obj.length);
          if(obj.length > 1) {


            var jobPanel = document.getElementById('JobPanel');
            document.getElementById('JobSelect').appendChild(document.createElement("br"));

            obj.forEach(element => {
              console.log(element);
              const bt = document.createElement('button');
              bt.innerText = `${element['jobNo']} ${element['moduleNo']}`;
              bt.classList.add("w3-btn");
              bt.classList.add("w3-round-large");
              bt.classList.add("w3-teal");
              //bt.classList.add("w3-margin");
              bt.classList.add("w3-block");
              bt.setAttribute('onclick',`selectJob("${element['jobNo']}", "${element['moduleNo']}" , "${element['id']}")`);

              document.getElementById('JobSelect').appendChild(bt);
              document.getElementById('JobSelect').appendChild(document.createElement("br"));
            });

            jobPanel.style.display = "block";
            
          }

          if(obj.length == 1) {                              

            btRetry.style.display = "none";
              
            drawingId = obj[0]['id'];
            document.getElementById('DrawingQty').value = obj[0]['qty'];

            selectJob(obj[0]['jobNo'], obj[0]['moduleNo'], obj[0]['id']);
            
          }
        }
      }
}

function selectJob(jobNo, moduleNo, id) {
  console.log('Job selected ' + jobNo + ' ' + moduleNo);
  console.log('ID ' + id);

  drawingId = id;
  drawingJobNo = jobNo;
  drawingModuleNo = moduleNo;

  var job = document.getElementById('JobPanel');    
  job.style.display = "none";

  var btRetry = document.getElementById('btRetry');  
  btRetry.style.display = "none";

  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", host + "/api/Drawings/" + id);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send();

  xhttp.onreadystatechange=function() {
    if(this.readyState==4 && this.status==200) {

      console.log(xhttp.responseText);
      var obj = JSON.parse(this.responseText);

      console.log(obj);

      let qty = obj['qty'];

      document.getElementById('DrawingQty').value = qty;
      

      updateElement(obj['receiveQty'], null, 'cbReceive', 'lbReceive', 'lbReceiveRej', 'nbReceive', qty);

      updateElement(obj['subconQty'], obj['subconRejQty'], 'cbSubcon', 'lbSubcon', 'lbSubconRej', 'nbSubcon', qty);

      updateElement(obj['ordermattQty'], null, 'cbOrderMatt', 'lbOrderMatt', 'lbOrderMattRej', 'nbOrderMatt', qty);   

      updateElement(obj['cutmattQty'], obj['cutmattRejQty'], 'cbCutMatt', 'lbCutMatt', 'lbCutMattRej', 'nbCutMatt', qty);

      updateElement(obj['bankQty'], obj['bankRejQty'], 'cbBank', 'lbBank', 'lbBankRej', 'nbBank', qty);    

      updateElement(obj['millingQty'], obj['millingRejQty'], 'cbMilling', 'lbMilling', 'lbMillingRej', 'nbMilling', qty);

      updateElement(obj['latheQty'], obj['latheRejQty'], 'cbLathe', 'lbLathe', 'lbLatheRej', 'nbLathe', qty);

      updateElement(obj['cncMillingQty'], obj['cncMillingRejQty'], 'cbCncMilling', 'lbCncMilling', 'lbCncMillingRej', 'nbCncMilling', qty);  

      updateElement(obj['cncLatheQty'], obj['cncLatheRejQty'], 'cbCncLathe', 'lbCncLathe', 'lbCncLatheRej', 'nbCncLathe', qty);    

      updateElement(obj['tapsQty'], obj['tapsRejQty'], 'cbTaps', 'lbTaps', 'lbTapsRej', 'nbTaps', qty);

      updateElement(obj['qcQty'], obj['qcRejQty'], 'cbQc', 'lbQc', 'lbQcRej', 'nbQc', qty);

      updateElement(obj['platingQty'], obj['platingRejQty'], 'cbPlating', 'lbPlating', 'lbPlatingRej', 'nbPlating', qty);

      updateElement(obj['doneQty'], null, 'cbDone', 'lbDone', 'lbDoneRej', 'nbDone', qty);

      updateElement(obj['retriveQty'], null, 'cbRetrive', 'lbRetrive', 'lbRetriveRej', 'nbRetrive', qty);

      updateElement(obj['rejectQty'], null, 'cbReject', 'lbReject', 'lbRejectRej', 'nbReject', qty);

      updateElement(obj['grindingQty'], obj['grindingRejQty'], 'cbGrinding', 'lbGrinding', 'lbGrindingRej', 'nbGrinding', qty);

      updateElement(obj['laserQty'], obj['laserRejQty'], 'cbLaser', 'lbLaser', 'lbLaserRej', 'nbLaser', qty);

      updateElement(obj['receiveMattQty'], null, 'cbReceiveMatt', 'lbReceiveMatt', 'lbReceiveMattRej', 'nbReceiveMatt', qty);
      
      
      var panel = document.getElementById('StatusPanel');
      panel.style.display = "block";

    }
  }
              
}

function updateElement(data, dataRej, tb, lb, lbRej, nb, qty) {

  var tbx = document.getElementById(tb);
  var lbx = document.getElementById(lb);
  var nbx = document.getElementById(nb);
  var lbxRej = document.getElementById(lbRej);

  const doneColor = '#6CDCBB';
  const notDoneColor = '#F0F0F0';

  nbx.value = null;

  if(data == null) {
    
  } else {
    lbx.innerHTML = data;
    if(data < qty) {
        tbx.style.backgroundColor = notDoneColor;
    } else {
        tbx.style.backgroundColor = doneColor;
    }        
  }

  if(dataRej == null) {
    lbxRej.innerHTML = null;
  } else {
    lbxRej.innerHTML = dataRej;
  }
}

function updateSubcon_org(){
    var drawingNo = document.getElementById('DrawingNo');
    var cbSubcon = document.getElementById('cbSubcon');

    let now = new Date().toISOString();
    
    if(cbSubcon.checked == false){
        now = null;
    }    

    console.log('Stamp time:' + now);

    const obj = JSON.stringify({
      "Id" : drawingId,
      "Subcon" : now
    });
    
    const xhttp = new XMLHttpRequest();    
    xhttp.open("POST", host + "/api/Drawings/UpdateSubcon");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(obj);
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && (this.status == 200 || this.status == 201)){
            //const objects = JSON.parse(this.responseText);
            //console.log(objects);
            
            //const drawingNo = objects['name'];
            //console.log('drawing no.:' + drawingNo);                
            console.log('api response status : ' + this.status)        

            //genQr(drawingNo);

            
            Swal.fire({
                text: 'Submit Success.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                //window.location.href = './update.html';
                }
            });
              
        }
        else{
            console.error('Fail response:' + this.status);
            Swal.fire({
                text: 'Submit fail.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }
}

function isQC(){
  var qty = Number(document.getElementById('DrawingQty').value);
  var qcQty = Number(document.getElementById('lbQc').innerHTML);
  var qcRejQty = Number(document.getElementById('lbQcRej').innerHTML);
  

  if(qcQty < qty || qcRejQty > 0){
    return false;
  }else{
    return true;
  }
}

function isDone(){
  var qty = Number(document.getElementById('DrawingQty').value);
  var doneQty = Number(document.getElementById('lbDone').innerHTML);
  var doneRejQty = Number(document.getElementById('lbDoneRej').innerHTML);  

  if(doneQty < qty || doneRejQty > 0){
    return false;
  }else{
    return true;
  }
}

function updateProcess(cbHtml, lbHtml, lbReject){

  var drawingQty = Number(document.getElementById('DrawingQty').value);
  var lb = Number(document.getElementById(lbHtml).innerHTML);
  var lbRej = Number(document.getElementById(lbReject).innerHTML);

  if((lb >= drawingQty) && (lbRej == null || lbRej == 0)) {
    console.log("Full qty");
    return;
  }

  if(cbHtml == 'cbRetrive') {
    
    // var qcNotDone = isQC();    
    // if(qcNotDone == false) {

    //   Swal.fire({
    //     text: 'QC ไม่เรียบร้อย',
    //     //icon: 'error',
    //     confirmButtonText: 'Cancel'
    //   });

    //   return;
    // }

    var notDone = isDone();
    if(notDone == false) {

      Swal.fire({
        text: 'ผลิตยังไม่เสร็จ',
        //icon: 'error',
        confirmButtonText: 'Cancel'
      });

      return;      
    }
  }

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

      var drawingNo = document.getElementById('DrawingNo');
      var cb = document.getElementById(cbHtml);
    
      let now = DateNow(); //new Date().toISOString();
      let stampTime = now;
      
      if(cb.checked == false){
          now = null;
      }    
    
      console.log('Stamp time:' + now);
      
      let obj = {
        Id: drawingId,
        UserAppsId: userApps,
        StampTime: stampTime
      };
      let apiFunc;
    
      switch(cbHtml){
        case 'cbReceive':
          obj.function = 'Receive';
          break;
        case 'cbSubcon':
          //obj.Subcon = now;
          obj.function = 'Subcon';          
          break;
        case 'cbOrderMatt':
          //obj.Ordermatt = now;
          obj.function = 'Ordermatt';          
          break;
        case 'cbCutMatt':
          //obj.Cutmatt = now;
          obj.function = 'Cutmatt';
          break;
        case 'cbBank':
          //obj.Bank = now;
          obj.function = 'Bank';
          break;
        case 'cbMilling':
          //obj.Milling = now;
          obj.function = 'Milling';
          break;
        case 'cbLathe':
          //obj.Lathe = now;
          obj.function = 'Lathe';          
          break;
        case 'cbCncMilling':
          //obj.CncMilling = now;
          obj.function = 'CncMilling';
          break;      
        case 'cbCncLathe':
          //obj.CncLathe = now;
          obj.function = 'CncLathe';
          break;          
        case 'cbTaps':
          //obj.Taps = now;
          obj.function = 'Taps';
          break;  
        case 'cbQc':
          //obj.Qc = now;
          obj.function = 'Qc';
          break;
        case 'cbPlating':
          //obj.Plating = now;
          obj.function = 'Plating';
          break;
        case 'cbDone':
          //obj.Done = now;
          obj.function = 'Done';
          break;
        case 'cbRetrive':
          obj.function = 'Retrive';
          isCheck = true;
          break;
        case 'cbReject':
          obj.function = 'Reject';
          isCheck = true;
          break;
        case 'cbGrinding':
          obj.function = 'Grinding';
          isCheck = true;
          break;
        case 'cbLaser':
          obj.function = 'Laser';
          isCheck = true;
          break;
        case 'cbReceiveMatt':
          obj.function = 'ReceiveMatt';
          isCheck = true;
          break;     
      }
      
      console.log("obj : " + JSON.stringify(obj));
      const xhttp = new XMLHttpRequest();    
      xhttp.open("POST", host + "/api/Drawings/UpdateDone");
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhttp.send(JSON.stringify(obj));
      xhttp.onreadystatechange = function(){
          if(this.readyState == 4 && (this.status == 200 || this.status == 201)){
              //const objects = JSON.parse(this.responseText);
              //console.log(objects);
              
              //const drawingNo = objects['name'];
              //console.log('drawing no.:' + drawingNo);
              console.log('api response status : ' + this.status)
    
              //genQr(drawingNo);
                  
              console.log('---> Before selectjob');
              selectJob(drawingJobNo, drawingModuleNo, drawingId);
              console.log('<-- After select job');

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
      hidePanel();
      //getDrawing(document.getElementById('DrawingNo').value);
      selectJob(drawingJobNo, drawingModuleNo, drawingId);
    }    
  });


}

function updateQty(nbHtml, lbHtml, lbReject) {

  var drawingQty = Number(document.getElementById('DrawingQty').value);
  var lb = Number(document.getElementById(lbHtml).innerHTML);
  var lbRej = Number(document.getElementById(lbReject).innerHTML);
  var nbQty = Number(document.getElementById(nbHtml).value);
  var resultQty = lb + nbQty;

  // if((lb >= drawingQty) && (lbRej == null || lbRej == 0)) {
  //   console.log("Full qty");
  //   return;
  // }

  if(resultQty > drawingQty){
    console.log("Full qty");

    Swal.fire({
      text: 'จำนวนเกิน',
      //icon: 'error',
      confirmButtonText: 'Cancel'
    });

    selectJob(drawingJobNo, drawingModuleNo, drawingId);
    
    return;
  }

  if(nbHtml == 'nbRetrive') {      

    //var updateQty = Number(document.getElementById(nbHtml).value);
    if(nbQty > 0){


      // var qcNotDone = isQC();
      // if(qcNotDone == false) {

      //   Swal.fire({
      //     text: 'QC ไม่เรียบร้อย',
      //     //icon: 'error',
      //     confirmButtonText: 'Cancel'
      //   });
  
      //   selectJob(drawingJobNo, drawingModuleNo, drawingId);
      //   return;
      // }
  

      var notDone = isDone();
      if(notDone == false) {
  
        Swal.fire({
          text: 'ผลิตยังไม่เสร็จ',
          //icon: 'error',
          confirmButtonText: 'Cancel'
        });
  
        selectJob(drawingJobNo, drawingModuleNo, drawingId);
        return;      
      }
    }
  }

  Swal.fire({
    title: 'Confirm?',
    showDenyButton: true,
    confirmButtonText: 'Save',
    debyButtonText: 'Cancel'
    //showConfirmButton: false,
    //confirmButtonText: 'OK'
  }).then((result) => {
    if(result.isConfirmed) {

      var userApps = localStorage.getItem("jwt");

      Swal.fire({
        title: 'Saving...',
        showConfirmButton: false
      });

      var nb = document.getElementById(nbHtml);

      let now = DateNow(); //new Date().toISOString();
      let stampTime = now;

      let isCheck = false;

      let obj = {
        Id: drawingId,
        UserAppsId: userApps,
        StampTime: stampTime,
        updateQty: nb.value,
      };

      switch(nbHtml) {
        case 'nbReceive':
          obj.function = 'Receive';
          isCheck = true;
          break;
        case 'nbSubcon':
          obj.Subcon = now;
          obj.function = 'Subcon';
          isCheck = true;
          break;
        case 'nbOrderMatt':
          obj.Ordermatt = now;
          obj.function = 'Ordermatt';   
          isCheck = true;       
          break;
        case 'nbCutMatt':
          obj.Cutmatt = now;
          obj.function = 'Cutmatt';
          isCheck = true;
          break;
        case 'nbBank':
          obj.Bank = now;
          obj.function = 'Bank';
          isCheck = true;
          break;
        case 'nbMilling':
          obj.Milling = now;
          obj.function = 'Milling';
          isCheck = true;
          break;
        case 'nbLathe':
          obj.Lathe = now;
          obj.function = 'Lathe';   
          isCheck = true;       
          break;
        case 'nbCncMilling':
          obj.CncMilling = now;
          obj.function = 'CncMilling';
          isCheck = true;
          break;      
        case 'nbCncLathe':
          obj.CncLathe = now;
          obj.function = 'CncLathe';
          isCheck = true;
          break;          
        case 'nbTaps':
          obj.Taps = now;
          obj.function = 'Taps';
          isCheck = true;
          break;  
        case 'nbQc':
          obj.Qc = now;
          obj.function = 'Qc';
          isCheck = true;
          break;
        case 'nbPlating':
          obj.Plating = now;
          obj.function = 'Plating';
          isCheck = true;
          break;
        case 'nbDone':
          obj.Done = now;
          obj.function = 'Done';
          isCheck = true;
          break;
        case 'nbRetrive':
          obj.function = 'Retrive';
          isCheck = true;
          break;
        case 'nbReject':
          obj.function = 'Reject';
          isCheck = true;
          break;  
        case 'nbGrinding':
          obj.function = 'Grinding';
          isCheck = true;
          break;  
        case 'nbLaser':
          obj.function = 'Laser';
          isCheck = true;
          break;   
        case 'nbReceiveMatt':
          obj.function = 'ReceiveMatt';
          isCheck = true;
          break;                                             
      }

      console.log("obj : " + obj.function);

      if(isCheck == true) {
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", host + "/api/Drawings/UpdateProcess2");
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(JSON.stringify(obj));
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && (this.status == 200 || this.status == 201)){
                //const objects = JSON.parse(this.responseText);
                //console.log(objects);
                
                //const drawingNo = objects['name'];
                //console.log('drawing no.:' + drawingNo);
                console.log('api response status : ' + this.status)
      
                //genQr(drawingNo);
      
                
                console.log('Submit done');

                console.log('drawingId ' + drawingId + '; drawingJobNo ' + drawingJobNo + '; drawingModuleNo ' + drawingModuleNo);  
                
                selectJob(drawingJobNo, drawingModuleNo, drawingId);

                Swal.fire({
                    text: 'Submit Success.',
                    icon: 'success',
                    //confirmButtonText: 'OK',
                    showConfirmButton: false,
                    timer: 1000,
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
      }
    
    } else {
      console.log('Cancel');
      selectJob(drawingJobNo, drawingModuleNo, drawingId);
    }
  })
}

function reject(cbHtml, lbHtml){

  Swal.fire({
    title: 'Reject?',
    input: 'number',
    showDenyButton: true,
    confirmButtonText: 'Save',
    denyButtonText: 'No',
  }).then((result)=>{

    if(result.isConfirmed){

      Swal.fire({
        title: 'Saving...',
        showConfirmButton: false
      });

      var userApps = localStorage.getItem("jwt");

      let now = DateNow(); //new Date().toISOString();
      let stampTime = now;

      let obj = {
        Id: drawingId,
        UserAppsId: userApps,
        StampTime: stampTime,
        updateQty: result.value
      };

      switch(cbHtml){
        case 'cbSubcon':
          obj.function = 'Subcon reject';          
          break;
        case 'cbCutMatt':
          obj.function = 'Cutmat reject';
          break;
        case 'cbBank':
          obj.function = 'Bank reject';
          break;
        case 'cbMilling':
          obj.function = 'Milling reject';
          break;
        case 'cbLathe':
          obj.function = 'Lathe reject';          
          break;
        case 'cbCncMilling':
          obj.function = 'CncMilling reject';
          break;      
        case 'cbCncLathe':
          obj.function = 'CncLathe reject';
          break;          
        case 'cbTaps':
          obj.function = 'Taps reject';
          break;  
        case 'cbQc':
          obj.function = 'Qc reject';
          break;
        case 'cbPlating':
          obj.function = 'Plating reject';
          break;
        case 'cbGrinding':
          obj.function = 'Grinding reject';
          break;
        case 'cbLaser':
          obj.function = 'Laser reject';
          break;
   
      }

      console.log("Reject --> ");
      console.log(obj);

      const xhttp = new XMLHttpRequest();    
      xhttp.open("POST", host + "/api/Drawings/Reject");
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhttp.send(JSON.stringify(obj));
      xhttp.onreadystatechange = function(){
          if(this.readyState == 4 && (this.status == 200 || this.status == 201)){
              //const objects = JSON.parse(this.responseText);
              //console.log(objects);
              
              //const drawingNo = objects['name'];
              //console.log('drawing no.:' + drawingNo);
              console.log('api response status : ' + this.status)
    
              //genQr(drawingNo);
    
              selectJob(drawingJobNo, drawingModuleNo, drawingId);

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

      //--------Continue here for post Api----------//

    }else{
      hidePanel();
      //getDrawing(document.getElementById('DrawingNo').value);
      selectJob(drawingJobNo, drawingModuleNo, drawingId);
    }

  });
}

function saveUpdate(obj){
  console.log(JSON.stringify(obj));
  const xhr = new XMLHttpRequest();
  xhr.open("PUT", host + "/api/Drawings/" + obj['id']);// + drawingNo.value );
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(obj);

  xhr.onreadystatechange=function(){
    if(this.readyState==4 && this.status==200){
      console.log(xhr.responseText);
      console.log('res status:' + this.status);
    }
  }
}

function testPut(){
    var url = host + "/api/Drawings/PutForSubcon";

    var now = DateNow(); //new Date().toISOString();
    var data = {};
    data.Id = 14;
    data.Url = now;
    var json = JSON.stringify(data);
    console.log('JSON:' + json);

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", url+'/hhhhhhh/' + now, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
        
        //var users = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            console.log('Response:' + xhr.responseText);
            
        } else {
            console.error('xhr.statusText');
        }
    }
    xhr.send();
}

function urlGo(){
    var url = document.getElementById('URL').value;
    window.location = url;
}

function retry() {
  window.location.href = './update.html';  
}

function hidePanel(){
    var checkBox = document.getElementById('Panel');
    var job = document.getElementById('JobPanel');
    var btRetry = document.getElementById('btRetry');
    var panel = document.getElementById('StatusPanel');
    
    checkBox.style.display = "none";
    job.style.display = "none";
    btRetry.style.display = "none";
    panel.style.display = "none";
}


hidePanel();