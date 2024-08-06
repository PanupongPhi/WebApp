let jobId = localStorage.getItem('create-drawing-jobid');
let jobNo = localStorage.getItem('create-drawing-jobno');

function getJobSelected() {

    console.log("JobId:" + jobId);
    console.log("JobNo:" + jobNo);

    var jobDetail = document.getElementById('JobNo');
    jobDetail.value = jobNo;
}

function addModule() {
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

        var moduleNo = document.getElementById('moduleNo');

        if(moduleNo == null || jobId == null){ 
            console.log("Incorrect data.!");
            return;
        }

        let obj = {
            name: moduleNo.value,
            jobId: jobId
        };

        let objJson = JSON.stringify(obj);
        console.log("JSON:" + objJson);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", host + "/api/DrawingModule");
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(objJson);
        xhr.onreadystatechange = function() {
            if(this.readyState == 4 && (this.status == 200 || this.status == 201)) {
                console.log(this.responseText);
                let resJs = JSON.parse(this.responseText);
                localStorage.setItem("module-create-id", resJs['id']);

                Swal.fire({
                    text: 'Submit Success.',
                    icon: 'success',
                    //confirmButtonText: 'OK',
                    showConfirmButton: false,
                    timer: 1000

                }).then((result) => {
                    window.location.href = './create.html';
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

getJobSelected();

