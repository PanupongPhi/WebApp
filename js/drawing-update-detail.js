const DrawingId = localStorage.getItem('drawing-id');
const DrawingNo = localStorage.getItem('drwaing-no');

function fillTable() {

    console.log("Start");
    var drawingName = document.getElementById('drawingNo');
    drawingName.innerHTML = `${DrawingNo}`;

    var table = document.getElementById('drawingTable');

    //let count = 10;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", host + "/api/DrawingLogs/GetByDrawingId/" + DrawingId);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send();
    xhr.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200) {

            var obj = JSON.parse(this.responseText);
            console.log('Get DB:' + this.responseText);

            obj.forEach(element => {
                var row = table.insertRow(-1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                var cell6 = row.insertCell(5);

                cell1.innerHTML = element['user'];
                cell2.innerHTML = element['drawingCode'];
                cell3.innerHTML = element['action'];
                let cDate = new Date(element['stampTime']);
                cell4.innerHTML = cDate.toLocaleString("en-GB",{ month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'});
                cell5.innerHTML = element['qty'];
                cell6.innerHTML = element['remark'];
            });
        }
    }
}

fillTable();