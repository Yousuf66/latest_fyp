function getProfiles(){
    const xhr = new XMLHttpRequest();

    xhr.open('GET','http://192.168.100.12:5000/suspect',true);

    xhr.onload = function(){
  if(this.status === 200){
      
      data = JSON.parse(this.responseText);
      data.forEach(function(user){
        output += `
        
        <div class="card mb-3" id = "${user.id}"">
          <img class="card-img-top" src="${user.image}.jpg"  alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${user.name}</h5>
            <p class="card-text">${user.message}</p>
            <p class="card-text">${user.id}</p>
            <button class="btn btn-primary" id="deletePost" onclick='deletePost(${user.id})' ">Delete</button>
            <button class="btn btn-primary" id="updatePost" onclick='updateProfile(${user.id})' ">updatepost</button>
          </div>
        </div>
        `;
      }
    );
      document.getElementById('output').innerHTML = output;
  }
  

}

xhr.send();
}

function deletePost(sus_id){
   
var url = "http://192.168.100.12:5000/suspect";
var xhr = new XMLHttpRequest();
xhr.open("DELETE", url+`/${sus_id}`, true);
xhr.onload = function () {
  var users = JSON.parse(JSON.stringify(xhr.responseText));
  if (xhr.readyState == 4 && xhr.status == "200") {
        console.log('users');
        document.getElementById(`${sus_id}`).remove();
        // const obj = document.querySelector('#deletePost');
        // obj.parentElement.parentElement.remove();
        // s = document.querySelector('#deletePost');
        // s.parentElement.parentElement.removeChild();
  } else {
    console.log(users);   
    document.getElementById(`"${sus_id}"`).remove();
    }
    
    // const obj = document.querySelector('#deletePost');
    // obj.parentElement.parentElement.remove();
//     s = document.querySelector('#deletePost');
// s.parentElement.parentElement.remove();
}
xhr.send(null);
// s = document.querySelector('#deletePost');
// s.parentElement.parentElement.remove();

}

function updateProfile(sus_id){
  const xhr = new XMLHttpRequest();

  xhr.open('GET','http://192.168.100.12:5000/suspect'+`/${sus_id}`,true);

  xhr.onload = function(){
if(this.status === 200){
    
    data = JSON.parse(this.responseText);

    data.forEach(function(user){
     output = `
      <form method="POST" action="http://192.168.100.12:5000/suspect/${sus_id}" enctype="multipart/form-data">
      <input type="text" id="defaultContactFormName" name="name" class="form-control mb-4" placeholder="${user.name}">
      <!-- Email -->
      <!-- Message -->
       <div class="form-group">
      <textarea class="form-control rounded-0" id="exampleFormControlTextarea2" name="message" rows="3" placeholder="${user.message}"></textarea>
      </div>
      <div class="custom-file">
      <input type="file" class="custom-file-input" id="inputGroupFile01" name="img" aria-describedby="inputGroupFileAddon01">
      <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
      <button class="btn btn-info btn-block" type="submit">Send</button>
      </div>
      </form>
        `;
    }
  );
    document.getElementById(`"${sus_id}"`).innerHTML = output;
}
}
xhr.send();
}
// function addUser(){
//   var url = "http://192.168.100.12:5000/suspect";

// var data = {};
// data.firstname = "John";
// data.lastname  = "Snow";
// var json = JSON.stringify(data);

// var xhr = new XMLHttpRequest();
// xhr.open("POST", url, true);
// xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
// xhr.onload = function () {
// 	var users = JSON.parse(xhr.responseText);
// 	if (xhr.readyState == 4 && xhr.status == "201") {
// 		console.table(users);
// 	} else {
// 		console.error(users);
// 	}
// }
// xhr.send(json);
// }
document.querySelector('body').addEventListener('DOMContentLoaded',getProfiles());