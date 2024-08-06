const JobId = localStorage.getItem("job-id");
const JobNo = localStorage.getItem("job-no");
const JobName = localStorage.getItem("job-name");
const DueTime = localStorage.getItem("due-time");
document.getElementById('JobDescription').innerHTML = JobNo + " " + JobName;
document.getElementById('DueTime').innerHTML = "Change due date " + DueTime;

function cancel() {
    clearLocalStorage();
    window.location.href = "./job.html";
}

function clearLocalStorage() {
    localStorage.removeItem('job-id');
    localStorage.removeItem('job-no');
    localStorage.removeItem('job-name');
    localStorage.removeItem('due-time');
}

function updateDueTime() {

    var htmlDate = document.getElementById('jDate');

    if(htmlDate.value == "") {
        return;
    }

    var data = {
        jobId: JobId,
        userId: 1,
        dueDate: htmlDate.value,
        dueTime: DueTime,
        stampTime: DateNow(),
    };    

    const jData = JSON.stringify(data);

    console.log("POST JSON : " + jData);

    Swal.fire({
        title: 'Saving...',
        showConfirmButton: false
    });

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", host + "/api/Job/ChangeDueDate");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(jData);
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && (this.status == 200 || this.status == 201)){
            
            Swal.fire({
                text: 'Submit Success.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    clearLocalStorage();
                    window.location.href = './job.html';
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