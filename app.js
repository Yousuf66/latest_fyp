
const ip = 'http://192.168.100.9:5000'
function getProfiles(){
    const xhr = new XMLHttpRequest();

    xhr.open('GET',ip+'/suspect',true);

    xhr.onload = function(){
  if(this.status === 200){
    
      data = JSON.parse(this.responseText);
      // localStorage.setItem(this.responseText);
      getSuspect(data)
      data.forEach(function(user){
        output += `
        
        <div class="card mb-3" id = "${user.id}">
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
   
// var url = "http://192.168.100.9:5000/suspect";
var xhr = new XMLHttpRequest();
xhr.open("DELETE", ip+'/suspect'+`/${sus_id}`, true);
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

  xhr.open('GET',ip+'/suspect'+`/${sus_id}`,true);

  xhr.onload = function(){
if(this.status === 200){
    
    data = JSON.parse(this.responseText);

    // pass the response ojects to getSuspect()

    data.forEach(function(user){
     output = `
      <form method="POST" action="http://192.168.100.9:5000/suspect/${sus_id}" enctype="multipart/form-data">
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
    document.getElementById(`${sus_id}`).innerHTML = output;
}
}
xhr.send();
}

function getSuspect(){
  var id = document.querySelector("#sus_id").value;
    const xhr = new XMLHttpRequest();
  xhr.open('GET',ip+'/suspect/'+id,true);

  xhr.onload = function(){
  if(this.status === 200){
    document.getElementById('output').innerHTML = ' ';  
      data = JSON.parse(this.responseText);
      console.log(data);
      data.forEach(function(user){
      output = `
      
      <div class="card mb-3" id = "${user.id}">
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

// document.querySelector('body').addEventListener('DOMContentLoaded',getProfiles()); 
