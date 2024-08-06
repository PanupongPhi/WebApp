

var config = {
    apiKey: "AIzaSyBv2LDIpzE7FaLz1uOEWpP085uIQ8es_Q4",
    authDomain: "phi-web-app-bca2a.firebaseapp.com",
    databaseURL: "https://phi-web-app-bca2a-default-rtdb.firebaseio.com",
    projectId: "phi-web-app-bca2a",
    storageBucket: "phi-web-app-bca2a.appspot.com",
    messagingSenderId: "26155400478"
  };

  var thumbnail;
 
    firebase.initializeApp(config);
    var database = firebase.database();

    var fileButton = document.getElementById("fileButton");
        fileButton.addEventListener('change', function(e){
        var file = e.target.files[0];
        var storageRef = firebase.storage().ref(file.name);
        storageRef.put(file);
        thumbnail = "https://firebasestorage.googleapis.com/v0/b/"+config["storageBucket"]+"/o/"+file.name+"?alt=media";
    }); 
    document.getElementById("add-data").onclick = function(e) {
        
        var title = document.getElementById('title').value;
        var content = document.getElementById('content').value;
        var rootRef = firebase.database().ref();
        var storesRef = rootRef.child('app/data/');
        var newStoreRef = storesRef.push();
                newStoreRef.set({
                title: title,
                content: content,
                thumbnail : thumbnail
            });
        alert("Success");
    }  