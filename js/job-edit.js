var jobId = localStorage.getItem("job-id");


function getJob() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", host + "/api/Job/" + jobId);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send();
    xhr.onreadystatechange = function() {
        if(this.readyState==4 && this.status==200){

            var obj = JSON.parse(this.responseText);
            var jobNo = document.getElementById('JobNo');
            var jobName = document.getElementById('JobName');

            jobNo.value = obj['jobNo'];
            jobName.value = obj['name'];
        }
    }
}


function updateJob() {
    Swal.fire({
        title: 'Confirm?',
        showDenyButton: true,
        confirmButtonText: 'Save',
        debyButtonText: 'Cancel'
        //showConfirmButton: false,
        //confirmButtonText: 'OK'
    }).then((result)=>{
        Swal.fire({
            title: 'Saving...',
            showConfirmButton: false
        });

        var jobNo = document.getElementById('JobNo');
        var jobName = document.getElementById('JobName');
    
        var obj = {
            id: jobId,
            name: jobName.value,
            jobNo: jobNo.value        
        };
    
        var objJson = JSON.stringify(obj);
        console.log('JSON:' + objJson);
    
        const xhr = new XMLHttpRequest();
        xhr.open("POST", host + "/api/Job/UpdateJob");
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(objJson);
        xhr.onreadystatechange = function() {
            if(this.readyState==4 && this.status==200){
                Swal.fire({
                    text: 'Submit Success.',
                    icon: 'success',
                    //confirmButtonText: 'OK',
                    showConfirmButton: false,
                    timer: 1000

                }).then((result) => {
                    window.location.href = './job.html';
                    if (result.isConfirmed) {
                    //window.location.href = './update.html';
                    }
                });
                
            } else {
                console.error('Fail response:' + this.status);
                Swal.fire({
                    text: 'Submit fail.' + this.status,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    });

}

getJob();