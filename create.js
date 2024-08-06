const { degrees, PDFDocument, rgb, StandardFonts } = PDFLib;
var pdfFileName;
let drawingNo_List = []


function genQr(drawingNo){
    //var drawingNo = document.getElementById('DrawingNo').value;
    var image = document.getElementById('QrImage');
    var btn = document.getElementById('btnQr');
    btn.innerHTML = 'Loading...';
    console.log('Get drawing no' + drawingNo);
    image.src=`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${drawingNo}`;
    image.onload = function(){
        btn.innerHTML = "Create QR";
    }
    
}

function addDrawing(){
    var jobList = document.getElementById('jobList');
    var moduleList = document.getElementById('moduleList');

    let jobId = jobList.value;
    let moduleId = moduleList.value;

    if(jobId == null || moduleId == null){
        return;
    }

    console.log("JobId:" + jobId);
    console.log("moduleId:" + moduleId);


    //var drawingNo = document.getElementById('DrawingNo').value.trim();
    //var url = document.getElementById('URL').value;

    //var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    //var now = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);

    //const now = new Date().toISOString();
    now = DateNow();
    console.log(now);

    //Add multiple drawing
    var inputValues = {};
    var inputs = document.querySelectorAll('#drawingName input[type="text"]'); 
    var inputsQty = document.querySelectorAll('#drawingName input[type="number"]');
    var isDuplicate = false;

    var data = [];
    for (var i = 0; i < inputs.length; i++) {
        if(inputs[i].type === 'text'){
            var inputValue = inputs[i].value.trim();
            var qty = inputsQty[i].value;
            if (inputValue !== '') {
                if (inputValues[inputValue]) {
                    alert('Duplicate value found: ' + inputValue);
                    isDuplicate = true;
                    break;
                }                
                inputValues[inputValue] = true;
                
                data.push({
                    //Name: inputs[i].value,
                    Name: inputValue,
                    CreateOn: now,
                    //Url: url,
                    moduleId: moduleId,
                    Qty: qty
                });
            }
        }        
    }

    const jData = JSON.stringify(data);

    console.log("POST JSON : " + jData);


    if (!isDuplicate){
        Swal.fire({
            title: 'Saving...',
            showConfirmButton: false
        });

        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", host + "/api/Drawings/Multiple");
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(jData);
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && (this.status == 200 || this.status == 201)){
                //const objects = JSON.parse(this.responseText);
                //console.log(objects);
                
                //const drawingNo = objects['name'];
                //console.log('drawing no.:' + drawingNo);            
    
                //genQr(drawingNo);
    
                
                Swal.fire({
                    text: 'Submit Success.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        clearLocalStorage();
                        window.location.href = './create.html';
                    }
                });
                  
            }
            else{
                Swal.fire({
                    text: 'Submit fail.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    }

}

function getDrawing(){
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", host + "t/api/Drawings/1");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send();

    xhttp.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
          console.log(xhttp.responseText);
          var obj = JSON.parse(this.responseText);
    
          //var y = document.getElementById("jTestApi");
          //y.value = obj['name'] + " " + obj['radian'];
        }
      }
}

function getJob() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", host + "/api/Job");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send();
    xhr.onreadystatechange = function() {
        if(this.readyState==4 && this.status==200){
            console.log(xhr.responseText);
            var obj = JSON.parse(this.responseText);

            var jobList = document.getElementById('jobList');

            obj.forEach(element => {
                var option = document.createElement("option");
                option.text = element.jobNo + " " + element.name;
                option.value = element.id;
                jobList.add(option);
            });

            let jobCreateId = localStorage.getItem("job-create-id");
            let createDrawingId = localStorage.getItem("create-drawing-jobid");
            if(jobCreateId != null){
                const $select = document.querySelector('#jobList');
                $select.value = jobCreateId;
                
            }
            if(createDrawingId != null){
                const $select = document.querySelector('#jobList');
                $select.value = createDrawingId
            }

            getModule();
        }
    }
}

function getModule() {
    var selectedJob = document.getElementById('jobList');
    let jobId = selectedJob.value;

    console.log("JobID:" + jobId);

    const xhr = new XMLHttpRequest();
    xhr.open("GET", host + "/api/DrawingModule/GetByJobId/" + jobId);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send();
    xhr.onreadystatechange = function() {
        if(this.readyState==4 && this.status == 200) {
            console.log(xhr.responseText);
            var obj = JSON.parse(this.responseText);

            var moduleList = document.getElementById('moduleList');

            var optionList = document.querySelectorAll('#moduleList option');
            optionList.forEach(o => o.remove());

            obj.forEach(element => {
                var option = document.createElement("option");
                option.text = element.name;
                option.value = element.id;
                moduleList.add(option);
            });

            let moduleCreateId = localStorage.getItem("module-create-id");
            if(moduleCreateId != null){
                const $select = document.querySelector('#moduleList');
                $select.value = moduleCreateId;
            }
        }
    }
}

function gotoCreateModule() {
    var jobList = document.getElementById('jobList');
    let jobId = jobList.value;
    console.log("JobID:" + jobId);

    if(jobId == null) {
        return;
    }

    let jobNo = jobList.options[jobList.selectedIndex].text;

    localStorage.setItem("create-drawing-jobid", jobId);
    localStorage.setItem("create-drawing-jobno", jobNo);

    console.log("JobNo:" + jobNo);
    window.location.href = "./module-create.html";
}

function cancel() {
    clearLocalStorage();
    window.location.href = "./job.html";
}

function clearLocalStorage() {
    localStorage.removeItem('job-create-id');
    localStorage.removeItem('module-create-id');
    localStorage.removeItem('create-drawing-jobid');
    localStorage.removeItem('create-drawing-jobno');
}

var inputCount = 0;

function addMoreDrawing() {
    
    var container = document.getElementById("drawingName");
    var total = document.getElementById("total");
   
    
    inputCount++;
	var input = document.createElement("input");
    input.type = "text";
    input.classList.add("w3-input");
    input.id = "DrawingNo" + inputCount;
    input.placeholder = "PDXX-XXXX-02010-0" + inputCount + "|PDXX-XXXX-02010-0" + inputCount;
    input.pattern = "[0-9,A-Z]{4}-[0-9,A-Z]{5}-[0-9]{5}-[0-9]{2}|[0-9,A-Z]{4}-[0-9,A-Z]{4}-[0-9]{5}-[0-9]{2}";
    input.required = true;
    input.setAttribute('style','display: inline-block; width: 75%');
    container.appendChild(input);

    var inputQty = document.createElement("input");
    inputQty.type = "number";
    inputQty.classList.add("w3-input");
    inputQty.classList.add("w3-margin-left");
    inputQty.id = "Qty" + inputCount;
    //inputQty.placeholder = "20";
    inputQty.required = true;
    inputQty.setAttribute('style','display: inline-block; width: 15%');
    container.appendChild(inputQty);

    //container.appendChild(document.createElement("br"));

    total.innerHTML = 'Total ' + inputCount;
    
}

function testGetDrawingName() {
    var jobList = document.getElementById('jobList');
    var moduleList = document.getElementById('moduleList');

    let jobId = jobList.value;
    let moduleId = moduleList.value;

    var inputValues = {};
    var inputs = document.querySelectorAll('#drawingName input[type="text"]'); 
    var isDuplicate = false;

    var data = [];
    for (var i = 0; i < inputs.length; i++) {
        if(inputs[i].type === 'text'){
            var inputValue = inputs[i].value.trim();
            if (inputValue !== '') {
                if (inputValues[inputValue]) {
                    alert('Duplicate value found: ' + inputValue);
                    isDuplicate = true;
                    break;
                }                
                inputValues[inputValue] = true;

                data.push({
                    name: inputs[i].value,
                    jobId: jobId,
                    moduleId: moduleId,
                });
            }
        }        
    }

    const jData = JSON.stringify(data);

    console.log(jData);
}

function clearDrawing() {

    var inputs = document.querySelectorAll('#drawingName input[type="text"]'); 
    var inputsQty = document.querySelectorAll('#drawingName input[type="number"]');

    for (var i = 0; i < inputs.length; i++) {

        inputs[i].remove();
        inputsQty[i].remove();       
    }

    inputCount = 0;

}

let pdf = document.getElementById('pdfFile')

var bufDrawingNo;

pdf.onchange = function(event) {

    clearDrawing();
    drawingNo_List.length = 0;

    var file = event.target.files[0]
    pdfFileName = file.name;

    console.log(file)


    //file reader api

    var filereader = new FileReader()

    filereader.onload = function(){

        var typedarray = new Uint8Array(this.result)

        var task = pdfjsLib.getDocument(typedarray);

        task.promise.then(async function(pdf){
            
            const numPage = pdf.numPages;
            console.log('No. of page ' + numPage);

            for(let i=1; i<=numPage; i++){

                const page = await pdf.getPage(i);
  
                //const content = page.getTextContent();
                //console.log(content);
  
                const content = await page.getTextContent();
  
                console.log(content);
  
  
                const drawNo = content.items.filter((x) => x.transform[4] >= 624.00 && x.transform[4] <= 624.99 && x.transform[5] >= 37.00 && x.transform[5] <= 47.99);
                const qty = content.items.filter((x) => x.transform[4] >= 605.00 && x.transform[4] <= 608.99 && x.transform[5] >= 82.00 && x.transform[5] <= 82.99 && x.width > 0);
          
                console.log('Page ' + i);
                console.log(drawNo);
                console.log(qty);
          
                if(drawNo.length > 0 && qty.length > 0 && drawNo[0].str != bufDrawingNo) {  
                    
                    bufDrawingNo = drawNo[0].str;
                            
                    console.log('Drawing No. ' + drawNo[0].str);
                    console.log("Q'ty " + qty[0].str);
    
                    //var text = document.createElement('p');
                    //text.innerHTML = drawNo[0].str + "  Q'ty " + qty[0].str;
                    //document.getElementById('panel').appendChild(text);

                    addMoreDrawing();

                    document.getElementById('DrawingNo' + inputCount).value = drawNo[0].str;
                    document.getElementById('Qty' + inputCount).value = qty[0].str;

                    drawingNo_List.push(drawNo[0].str);
  
                } else {
                    drawingNo_List.push(null);
                }                
  
            }            
            
        })

    }
    filereader.readAsArrayBuffer(file)

    console.log('drawingNo_List --> ');
    console.log(drawingNo_List);
}

let qrPdf = document.getElementById('qrPdf');
qrPdf.onchange = function(event){

    var file = event.target.files[0]
    if(file.name != pdfFileName) {
        Swal.fire({
            text: 'ไฟล์ไม่ตรงกัน',
            //icon: 'error',
            confirmButtonText: 'Cancel'
        });        
        return;
    }
    var filereader = new FileReader()

    filereader.onload = function() {

        InsertQr(this.result)

    }

    filereader.readAsArrayBuffer(file)

}
async function InsertQr(arrayBuffer) {
    try{
        // console.log('pdf length:' + pdf.files.length);
        // if(pdf.files.length <= 0) {
        //     return;
        // }
        // console.log('pdf file:' + pdf.files[0].name);
        //const url = 'MP01-ATBK-80000-01 Assy SP Drive Interrroll RD.pdf';
        //const response = await fetch(url);
        //const existingPdfBytes = await response.arrayBuffer();
        const existingPdfBytes = await arrayBuffer;

        pdfDoc = await PDFDocument.load(existingPdfBytes);
        //const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);


        const qrCodeDims = { width: 60, height: 60 };            

        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const { width, height } = firstPage.getSize();

        for (let i = 0; i < pages.length; i++) {
            if (drawingNo_List[i] !== null) {                
                console.log(drawingNo_List[i]);
                
                // Gen QR by drawing
                var qrcode = new QRCode("qr_code", {
                    text: drawingNo_List[i],
                    width: 128,
                    height: 128,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H
                }); 

                await delay(100);

                // convert QR to png
                
                const base64Image = $('#qr_code img').attr('src');
                console.log(base64Image);
                const pngImage = await pdfDoc.embedPng(base64Image);//PDFLib.PDFImage.createPNG(base64Image);

                //Drawing QR to PDF
                await pages[i].drawImage(pngImage,{
                    x: 285,
                    //y: height - qrCodeDims.height - 10,
                    y: 20,
                    width: qrCodeDims.width,
                    height: qrCodeDims.height,
                });           
                
                // Clear the content of the 'qr_code' div
                $('#qr_code').empty();
                     
            } 
        }

        const modifiedPdfBytes = await pdfDoc.save();

        // Create a Blob from the modified PDF bytes
        const modifiedPdfBlob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });

        // Create a download link
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(modifiedPdfBlob);
        downloadLink.download = 'modified.pdf';

        // Append the link to the body and trigger a click event to start the download
        document.body.appendChild(downloadLink);
        downloadLink.click();

        // Remove the link from the DOM after a delay
        setTimeout(() => {
            document.body.removeChild(downloadLink);
            console.log('Save done!');
        }, 1000); // 1000 milliseconds (1 second) delay 

    } catch (error) {
        console.error('Error modifying PDF:', error);
    }

};

function delay(ms) {
    return new Promise(resolve => {
    setTimeout(resolve, ms);
    });
}

getJob();

//addMoreDrawing();

