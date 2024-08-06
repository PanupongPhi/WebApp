const JobID = localStorage.getItem('job-id');
const JobNo = localStorage.getItem('job-no');
const JobName = localStorage.getItem('job-name');

function getModule() {
    var jobDetail = document.getElementById('jobDetail');
    jobDetail.innerHTML = `${JobNo} ${JobName}`;

    let htmlCode = ``;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", host + "/api/DrawingModule/GetByJobId/" + JobID);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send();
    xhr.onreadystatechange = function() {
        if(this.readyState==4 && this.status==200){
            var obj = JSON.parse(this.responseText);

            obj.forEach(element => {
                htmlCode = htmlCode + 
                `
                <p>
                    <div class="w3-card-2 w3-padding w3-round-large w3-hover-light-gray" onclick="gotoDrawingList(${element.id},'${element.name}')">
                        <p>${element.name}</p>
                    </div>
                </p>
                `
            });

            console.log("htmlCode:" + htmlCode);

            var divModule = document.getElementById('divModule');
            divModule.innerHTML = htmlCode;
        }
    }
}

function gotoDrawingList(moduleId, moduleNo) {
    console.log("module-id:" + moduleId);
    localStorage.setItem("module-id", moduleId);
    localStorage.setItem("module-name", moduleNo);
    window.location.href = "./drawing-list.html";

}

getModule();