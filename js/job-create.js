function addJob() {
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
    
        var JobName = document.getElementById('JobName');
        var JobNo = document.getElementById('JobNo');
    
        let obj = {
            name: JobName.value,
            JobNo: JobNo.value,
            CreateUserId: localStorage.getItem("jwt"),
            createDate: DateNow()
        };
    
        let objJson = JSON.stringify(obj);
    
        const xhr = new XMLHttpRequest();
        xhr.open("POST", host + "/api/Job");
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(objJson);
        xhr.onreadystatechange = function() {
            if(this.readyState == 4 && (this.status == 200 || this.status == 201)) {

                console.log(this.responseText);
                let resJs = JSON.parse(this.responseText);                
                localStorage.setItem("job-create-id", resJs['id']);
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
    });


}