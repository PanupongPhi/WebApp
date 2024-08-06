var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://script.google.com/macros/s/AKfycbw-RqZm9FEFH2iD4NMKYgd3yQKTVQ2NFTfQEhvAv-wxS5gL9_bWG2oDz7JJPYgOouemqg/exec', true);
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var response = JSON.parse(xhr.responseText);    
    console.log(response);

    document.getElementById('id').innerHTML = response[0].id;
    document.getElementById('name').innerHTML = response[0].name;
  }
};
xhr.send();
