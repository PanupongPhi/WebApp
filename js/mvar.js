//const host = 'https://panupong.bsite.net';
const host = 'https://phiautomation-app.com';
//const host = 'https://localhost:7258';
const userAdmin = ['Panupong', 'User1','Chainarong','Ratchanon','Siriwat','Santhiti']

function DateNow(){
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    var now = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    return now;
}

console.log("job-create-id:" + localStorage.getItem("job-create-id"));
console.log("module-create-id:" + localStorage.getItem("module-create-id"));

console.log("create-drawing-jobid:" + localStorage.getItem("create-drawing-jobid"));
console.log("create-drawing-jobno:" + localStorage.getItem("create-drawing-jobno"));
